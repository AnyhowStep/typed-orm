import {ILog, Log} from "../../log";
import {ITable} from "../../../table";
import {ColumnUtil, IColumn} from "../../../column";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";
import {SortDirection} from "../../../order";
import {ColumnMapUtil} from "../../../column-map";

export type LogMustSetDoNotCopy = (
    ILog<{
        readonly table : ITable;
        readonly entityIdentifier : string[];
        readonly latestOrder : [IColumn, SortDirection];
        readonly tracked : string[];
        readonly doNotCopy : undefined;
        readonly copy : string[];
        readonly staticDefaultValue : undefined;
        readonly dynamicDefaultValueDelegate : undefined;
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
        readonly entityIdentifier : LogT["entityIdentifier"];
        readonly latestOrder : LogT["latestOrder"];
        readonly tracked : LogT["tracked"];
        readonly doNotCopy : ReturnType<DelegateT>[number]["name"][];
        readonly copy : Exclude<
            LogT["copy"][number],
            ReturnType<DelegateT>[number]["name"]
        >[];
        readonly staticDefaultValue : undefined;
        readonly dynamicDefaultValueDelegate : undefined;
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
    const columns = ColumnMapUtil.pick<
        LogT["table"]["columns"],
        (
            LogT["copy"][number]
        )[]
    >(
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
        entityIdentifier,
        latestOrder,
        tracked,
        staticDefaultValue,
        dynamicDefaultValueDelegate,
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
        entityIdentifier,
        latestOrder,
        tracked,
        doNotCopy : doNotCopy.map(c => c.name),
        copy,
        staticDefaultValue,
        dynamicDefaultValueDelegate,
    });
}