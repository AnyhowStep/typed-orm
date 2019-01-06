import {ILog, Log, EntityIdentifier} from "../../log";
import {ITable} from "../../../table";
import {ColumnUtil, IColumn} from "../../../column";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";
import {SortDirection} from "../../../order";
import {ColumnMapUtil} from "../../../column-map";
import {IJoinDeclaration} from "../../../join-declaration";
import {IConnection} from "../../../execution";

export type LogMustSetDoNotCopy = (
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
        readonly doNotCopy : undefined;
        readonly copy : string[];
        readonly copyDefaultsDelegate : undefined;
        readonly trackedDefaults : undefined;
    }>
);
export type SetDoNotCopyDelegate<
    LogT extends LogMustSetDoNotCopy
> = (
    (
        columns : Pick<
            LogT["table"]["columns"],
            LogT["copy"][number]
        >
    ) => ColumnUtil.FromColumnMap<
        Pick<
            LogT["table"]["columns"],
            LogT["copy"][number]
        >
    >[]
);
export type SetDoNotCopy<
    LogT extends LogMustSetDoNotCopy,
    DelegateT extends SetDoNotCopyDelegate<LogT>
> = (
    Log<{
        readonly table : LogT["table"];
        readonly entity : LogT["entity"];
        readonly entityIdentifier : LogT["entityIdentifier"];
        readonly joinDeclaration : LogT["joinDeclaration"];
        readonly latestOrder : LogT["latestOrder"];
        readonly tracked : LogT["tracked"];
        readonly doNotCopy : ReturnType<DelegateT>[number]["name"][];
        readonly copy : Exclude<
            LogT["copy"][number],
            ReturnType<DelegateT>[number]["name"]
        >[];
        readonly copyDefaultsDelegate : (
            Exclude<
                LogT["copy"][number],
                ReturnType<DelegateT>[number]["name"]
            > extends never ?
            (
                args : {
                    entityIdentifier : EntityIdentifier<LogT>,
                    connection : IConnection,
                }
            ) => Promise<{}> :
            undefined
        );
        readonly trackedDefaults : undefined;
    }>
);
export function setDoNotCopy<
    LogT extends LogMustSetDoNotCopy,
    DelegateT extends SetDoNotCopyDelegate<LogT>
> (
    log : LogT,
    delegate : DelegateT
) : (
    SetDoNotCopy<
        LogT,
        DelegateT
    >
) {
    const columns = ColumnMapUtil.pick(
        log.table.columns,
        log.copy
    );
    const doNotCopy = delegate(columns);
    ColumnIdentifierMapUtil.assertHasColumnIdentifiers(
        columns,
        doNotCopy
    );
    const {
        table,
        entity,
        entityIdentifier,
        joinDeclaration,
        latestOrder,
        tracked,
        trackedDefaults,
    } = log;
    const copy = log.copy
        .filter((columnName) : columnName is (
            Exclude<
                LogT["copy"][number],
                ReturnType<DelegateT>[number]["name"]
            >
        ) => {
            return !doNotCopy.some(
                c => c.name == columnName
            )
        });
    return new Log({
        table,
        entity,
        entityIdentifier,
        joinDeclaration,
        latestOrder,
        tracked,
        doNotCopy : doNotCopy.map(c => c.name),
        copy,
        copyDefaultsDelegate : (
            (copy.length == 0) ?
            (() => Promise.resolve({})) :
            undefined
        ) as any,
        trackedDefaults,
    });
}