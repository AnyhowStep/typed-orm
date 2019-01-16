import {ILog, Log, EntityIdentifier} from "../../log";
import {ITable, TableUtil} from "../../../table";
import {IColumn} from "../../../column";
import {SortDirection} from "../../../order";
import {IConnection} from "../../../execution";
import {entityIdentifierAssertDelegate} from "./entity-identifier-assert-delegate";
import {IJoinDeclaration} from "../../../join-declaration";

export type LogMustSetCopyDefaultsDelegate = (
    ILog<{
        readonly table : ITable;
        readonly entity : ITable;
        readonly entityIdentifier : string[];
        readonly joinDeclaration : IJoinDeclaration<{
            //From `table`
            readonly fromTable : ITable,
            //To `entity`
            readonly toTable : ITable,
            readonly nullable : false,
        }>;
        readonly latestOrder : [IColumn, SortDirection];
        readonly tracked : string[];
        readonly doNotCopy : string[];
        readonly copy : string[];
        readonly copyDefaultsDelegate : undefined;
        readonly trackedDefaults : undefined;
    }>
);
export type CopyDefaultsDelegate<
    LogT extends LogMustSetCopyDefaultsDelegate
> = (
    (
        args : {
            entityIdentifier : EntityIdentifier<LogT>,
            connection : IConnection,
        }
    ) => Promise<(
        {
            readonly [columnName in Extract<
                TableUtil.RequiredColumnNames<LogT["table"]>,
                LogT["copy"][number]
            >] : (
                ReturnType<
                    LogT["table"]["columns"][columnName]["assertDelegate"]
                >
            )
        } &
        {
            readonly [columnName in Extract<
                TableUtil.OptionalColumnNames<LogT["table"]>,
                LogT["copy"][number]
            >]? : (
                ReturnType<
                    LogT["table"]["columns"][columnName]["assertDelegate"]
                >
            )
        }
    )>
);
export type SetCopyDefaultsDelegate<
    LogT extends LogMustSetCopyDefaultsDelegate
> = (
    Log<{
        readonly table : LogT["table"];
        readonly entity : LogT["entity"];
        readonly entityIdentifier : LogT["entityIdentifier"];
        readonly joinDeclaration : LogT["joinDeclaration"];
        readonly latestOrder : LogT["latestOrder"];
        readonly tracked : LogT["tracked"];
        readonly doNotCopy : LogT["doNotCopy"];
        readonly copy : LogT["copy"];
        readonly copyDefaultsDelegate : CopyDefaultsDelegate<LogT>;
        readonly trackedDefaults : undefined;
    }>
);
export function setCopyDefaultsDelegate<
    LogT extends LogMustSetCopyDefaultsDelegate
> (
    log : LogT,
    rawCopyDefaultsDelegate : CopyDefaultsDelegate<LogT>
) : (
    SetCopyDefaultsDelegate<
        LogT
    >
) {
    const requiredColumnNames = TableUtil.requiredColumnNames(log.table)
        .filter(columnName => (
            log.copy.indexOf(columnName) >= 0
        ));
    const optionalColumnNames = TableUtil.optionalColumnNames(log.table)
        .filter(columnName => (
            log.copy.indexOf(columnName) >= 0
        ));
    const copyDefaultsDelegate : CopyDefaultsDelegate<LogT> = async (args) => {
        const assertDelegate = entityIdentifierAssertDelegate(log);
        args.entityIdentifier = assertDelegate(
            `${log.table.alias}.entityIdentifier`,
            args.entityIdentifier
        );
        const rawResult = await rawCopyDefaultsDelegate(args);
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
        entity,
        entityIdentifier,
        joinDeclaration,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        trackedDefaults,
    } = log;
    return new Log({
        table,
        entity,
        entityIdentifier,
        joinDeclaration,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        copyDefaultsDelegate,
        trackedDefaults,
    });
}