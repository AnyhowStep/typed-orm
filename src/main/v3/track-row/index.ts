import {LogNoTrackedDefaults, PreviousRow} from "../log";
import {InsertRowLiteral} from "../insert";
import {TableUtil} from "../table";
import {PrimitiveExprUtil} from "../primitive-expr";

export type TrackRow<LogT extends LogNoTrackedDefaults> = (
    {
        //All `tracked` columns may have values set or unset.
        //If unset, they use previous values, if any.
        //Otherwise, they use the defaults.
        //Else, an error is thrown.
        readonly [columnName in LogT["tracked"][number]]? : (
            ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>
        )
    } &
    {
        //All required `doNotCopy` columns must have values set.
        readonly [columnName in Extract<
            LogT["doNotCopy"][number],
            TableUtil.RequiredColumnNames<LogT["table"]>>
        ] : (
            ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>
        )
    } &
    {
        //All optional `doNotCopy` columns may have values set or unset.
        //If unset, they use the default values declared on the database.
        readonly [columnName in Extract<
            LogT["doNotCopy"][number],
            TableUtil.OptionalColumnNames<LogT["table"]>>
        ]? : (
            ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>
        )
    }
);
export namespace TrackRowUtil {
    export function toInsertRowLiteral<LogT extends LogNoTrackedDefaults> (
        log : LogT,
        newRow : TrackRow<LogT>,
        prvRow : PreviousRow<LogT>
    ) : {
        changed : boolean,
        insertRow : InsertRowLiteral<LogT["table"]>
    } {
        //We do not provide a value for `latestOrder`.
        //It should be generated or have an explicit default value
        //set on the database.
        const insertRow : any = {};
        //Copy the previous row's `entityIdentifier`
        for (let columnName of log.entityIdentifier) {
            insertRow[columnName] = (prvRow as any)[columnName];
        }
        //Copy the previous row's `tracked` if we do not provide a value
        let changed = false;
        for (let columnName of log.tracked) {
            const rawNewTrackedValue = (newRow as any)[columnName];
            if (rawNewTrackedValue === undefined) {
                insertRow[columnName] = (prvRow as any)[columnName];
            } else {
                const newTrackedValue = log.table.columns[columnName].assertDelegate(
                    `${log.table.alias}.${columnName}`,
                    rawNewTrackedValue
                );
                insertRow[columnName] = newTrackedValue;
                if (!PrimitiveExprUtil.isEqual(newTrackedValue, (prvRow as any)[columnName])) {
                    changed = true;
                }
            }
        }
        //We expect new values for all required `doNotCopy` columns
        for (let columnName of log.doNotCopy) {
            const newDoNotCopyValue = (newRow as any)[columnName];
            if (newDoNotCopyValue === undefined) {
                if (TableUtil.isRequired(log.table, columnName)) {
                    throw new Error(`Expected a value for ${log.table.alias}.${columnName}`);
                } else {
                    continue;
                }
            }

            insertRow[columnName] = log.table.columns[columnName].assertDelegate(
                `${log.table.alias}.${columnName}`,
                newDoNotCopyValue
            );
        }
        //Copy the previous row's `copy`
        for (let columnName of log.copy) {
            insertRow[columnName] = (prvRow as any)[columnName];
        }
        return {
            changed,
            insertRow,
        };
    }
}