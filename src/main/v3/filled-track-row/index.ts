import {LogNoTrackedDefaults, EntityIdentifier} from "../log";
import {TableUtil} from "../table";
import {TrackRow} from "../track-row";
import {IConnection} from "../execution";
import {InsertRowLiteral} from "../insert";

//Like TrackedRow but all `tracked` is set
export type FilledTrackRow<LogT extends LogNoTrackedDefaults> = (
    {
        readonly [columnName in LogT["tracked"][number]] : (
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
export namespace FilledTrackRowUtil {
    export function isFilledTrackRow<LogT extends LogNoTrackedDefaults> (
        log : LogT,
        newRow : TrackRow<LogT>,
    ) : newRow is FilledTrackRow<LogT> {
        for (let columnName of log.tracked) {
            if ((newRow as any)[columnName] === undefined) {
                return false;
            }
        }
        return true;
    }
    export function assertFilledTrackRow<LogT extends LogNoTrackedDefaults> (
        log : LogT,
        newRow : TrackRow<LogT>,
    ) : FilledTrackRow<LogT> {
        for (let columnName of log.tracked) {
            if ((newRow as any)[columnName] === undefined) {
                throw new Error(`Expected a value for ${log.table.alias}.${columnName}`);
            }
        }
        return newRow;
    }
    export async function toInsertLiteralRow<LogT extends LogNoTrackedDefaults> (
        log : LogT,
        entityIdentifier : EntityIdentifier<LogT>,
        newRow : FilledTrackRow<LogT>,
        connection : IConnection
    ) : Promise<InsertRowLiteral<LogT["table"]>> {
        const copyDefaults = await log.copyDefaultsDelegate({
            entityIdentifier,
            connection,
        });
        const insertRow : any = {};

        for (let columnName of log.entityIdentifier) {
            insertRow[columnName] = (entityIdentifier as any)[columnName];
        }
        for (let columnName of log.tracked) {
            insertRow[columnName] = (newRow as any)[columnName];
        }
        for (let columnName of log.doNotCopy) {
            insertRow[columnName] = (newRow as any)[columnName];
        }
        for (let columnName of log.copy) {
            insertRow[columnName] = (copyDefaults as any)[columnName];
        }
        return insertRow;
    }
}