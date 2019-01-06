import {ILog, Log} from "../../log";
import {ITable} from "../../../table";
import {NonEmptyTuple} from "../../../tuple";
import {ColumnUtil, IColumn} from "../../../column";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";
import {SortDirection} from "../../../order";
import {ColumnMapUtil} from "../../../column-map";
import {IJoinDeclaration} from "../../../join-declaration";

export type LogMustSetTracked = (
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
        readonly tracked : undefined;
        readonly doNotCopy : undefined;
        readonly copy : string[];
        readonly copyDefaultsDelegate : undefined;
        readonly trackedDefaults : undefined;
    }>
);
export type SetTrackedDelegate<
    LogT extends LogMustSetTracked
> = (
    (
        columns : Pick<
            LogT["table"]["columns"],
            LogT["copy"][number]
        >
    ) => NonEmptyTuple<ColumnUtil.FromColumnMap<
        Pick<
            LogT["table"]["columns"],
            LogT["copy"][number]
        >
    >>
);
export type SetTracked<
    LogT extends LogMustSetTracked,
    DelegateT extends SetTrackedDelegate<LogT>
> = (
    Log<{
        readonly table : LogT["table"];
        readonly entity : LogT["entity"];
        readonly entityIdentifier : LogT["entityIdentifier"];
        readonly joinDeclaration : LogT["joinDeclaration"];
        readonly latestOrder : LogT["latestOrder"];
        readonly tracked : ReturnType<DelegateT>[number]["name"][];
        readonly doNotCopy : undefined;
        readonly copy : Exclude<
            LogT["copy"][number],
            ReturnType<DelegateT>[number]["name"]
        >[];
        readonly copyDefaultsDelegate : undefined;
        readonly trackedDefaults : undefined;
    }>
);
export function setTracked<
    LogT extends LogMustSetTracked,
    DelegateT extends SetTrackedDelegate<LogT>
> (
    log : LogT,
    delegate : DelegateT
) : (
    SetTracked<
        LogT,
        DelegateT
    >
) {
    const columns = ColumnMapUtil.pick(
        log.table.columns,
        log.copy
    );
    const tracked = delegate(columns);
    ColumnIdentifierMapUtil.assertHasColumnIdentifiers(
        columns,
        tracked
    );
    const {
        table,
        entity,
        entityIdentifier,
        joinDeclaration,
        latestOrder,
        doNotCopy,
        copyDefaultsDelegate,
        trackedDefaults,
    } = log;
    const copy = log.copy
        .filter((columnName) : columnName is (
            Exclude<
                LogT["copy"][number],
                ReturnType<DelegateT>[number]["name"]
            >
        ) => {
            return !tracked.some(
                c => c.name == columnName
            )
        });
    return new Log({
        table,
        entity,
        entityIdentifier,
        joinDeclaration,
        latestOrder,
        tracked : tracked.map(c => c.name),
        doNotCopy,
        copy,
        copyDefaultsDelegate,
        trackedDefaults,
    });
}