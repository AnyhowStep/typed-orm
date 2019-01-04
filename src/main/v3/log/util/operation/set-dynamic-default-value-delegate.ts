import {ILog, Log} from "../../log";
import {ITable, TableUtil} from "../../../table";
import {IColumn} from "../../../column";
import {SortDirection} from "../../../order";
import {IConnection} from "../../../execution";
import {entityIdentifierAssertDelegate} from "./entity-identifier-assert-delegate";

export type LogMustSetDynamicDefaultValueDelegate = (
    ILog<{
        readonly table : ITable;
        readonly entityIdentifier : string[];
        readonly latestOrder : [IColumn, SortDirection];
        readonly tracked : string[];
        readonly doNotCopy : string[];
        readonly copy : string[];
        readonly staticDefaultValue : {
            readonly [columnName : string] : any;
        };
        readonly dynamicDefaultValueDelegate : undefined;
    }>
);
export type DynamicDefaultValueDelegate<
    LogT extends LogMustSetDynamicDefaultValueDelegate
> = (
    (
        entityIdentifier : {
            readonly [columnName in LogT["entityIdentifier"][number]] : (
                ReturnType<
                    LogT["table"]["columns"][columnName]["assertDelegate"]
                >
            )
        },
        connection : IConnection
    ) => Promise<(
        {
            readonly [columnName in Exclude<
                Extract<
                    TableUtil.RequiredColumnNames<LogT["table"]>,
                    (
                        LogT["tracked"][number] |
                        LogT["copy"][number]
                    )
                >,
                keyof LogT["staticDefaultValue"]
            >] : (
                ReturnType<
                    LogT["table"]["columns"][columnName]["assertDelegate"]
                >
            )
        } &
        {
            readonly [columnName in Exclude<
                Extract<
                    TableUtil.OptionalColumnNames<LogT["table"]>,
                    (
                        LogT["tracked"][number] |
                        LogT["copy"][number]
                    )
                >,
                keyof LogT["staticDefaultValue"]
            >]? : (
                ReturnType<
                    LogT["table"]["columns"][columnName]["assertDelegate"]
                >
            )
        }
    )>
);
export type SetDynamicDefaultValueDelegate<
    LogT extends LogMustSetDynamicDefaultValueDelegate
> = (
    Log<{
        readonly table : LogT["table"];
        readonly entityIdentifier : LogT["entityIdentifier"];
        readonly latestOrder : LogT["latestOrder"];
        readonly tracked : LogT["tracked"];
        readonly doNotCopy : LogT["doNotCopy"];
        readonly copy : LogT["copy"];
        readonly staticDefaultValue : LogT["staticDefaultValue"];
        readonly dynamicDefaultValueDelegate : DynamicDefaultValueDelegate<LogT>;
    }>
);
export function setDynamicDefaultValueDelegate<
    LogT extends LogMustSetDynamicDefaultValueDelegate
> (
    log : LogT,
    dynamicDefaultValueDelegate : DynamicDefaultValueDelegate<LogT>
) : (
    SetDynamicDefaultValueDelegate<
        LogT
    >
) {
    const requiredColumnNames = TableUtil.requiredColumnNames(log.table)
        .filter(columnName => (
            (
                log.tracked.indexOf(columnName) >= 0 ||
                log.copy.indexOf(columnName) >= 0
            ) &&
            (log.staticDefaultValue[columnName] === undefined)
        ));
    const optionalColumnNames = TableUtil.optionalColumnNames(log.table)
        .filter(columnName => (
            (
                log.tracked.indexOf(columnName) >= 0 ||
                log.copy.indexOf(columnName) >= 0
            ) &&
            (log.staticDefaultValue[columnName] === undefined)
        ));
    const wrappedDynamicDefaultValueDelegate : DynamicDefaultValueDelegate<LogT> = (entityIdentifier, connection) => {
        const assertDelegate = entityIdentifierAssertDelegate(log);
        entityIdentifier = assertDelegate(
            `${log.table.alias}.entityIdentifier`,
            entityIdentifier
        );
        const rawResult = dynamicDefaultValueDelegate(entityIdentifier, connection);
        const result : any = {};
        for (let columnName of requiredColumnNames) {
            const rawValue = rawResult[columnName];
            if (rawValue === undefined) {
                throw new Error(`Expected a value for ${log.table.alias}.${columnName}`);
            }
            result[columnName] = log.table.columns[columnName].assertDelegate(
                `${log.table.alias}.${columnName}`,
                rawValue
            );
        }
        for (let columnName of optionalColumnNames) {
            const rawValue = rawResult[columnName];
            if (rawValue === undefined) {
                continue;
            }
            result[columnName] = log.table.columns[columnName].assertDelegate(
                `${log.table.alias}.${columnName}`,
                rawValue
            );
        }
        return result;
    };
    const {
        table,
        entityIdentifier,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        staticDefaultValue,
    } = log;
    return new Log({
        table,
        entityIdentifier,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        staticDefaultValue,
        dynamicDefaultValueDelegate : wrappedDynamicDefaultValueDelegate,
    });
}