import {ILog, Log} from "../../log";
import {ITable} from "../../../table";
import {NonEmptyTuple} from "../../../tuple";
import {ColumnUtil} from "../../../column";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";
import {ColumnMapUtil} from "../../../column-map";

export type LogMustSetEntityIdentifier = (
    ILog<{
        readonly table : ITable;
        readonly entityIdentifier : undefined;
        readonly latestOrder : undefined;
        readonly tracked : undefined;
        readonly doNotCopy : undefined;
        readonly copy : string[];
        readonly staticDefaultValue : undefined;
        readonly dynamicDefaultValueDelegate : undefined;
    }>
);
export type SetEntityIdentifierDelegate<
    LogT extends LogMustSetEntityIdentifier
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
export type SetEntityIdentifier<
    LogT extends LogMustSetEntityIdentifier,
    DelegateT extends SetEntityIdentifierDelegate<LogT>
> = (
    Log<{
        readonly table : LogT["table"];
        readonly entityIdentifier : ReturnType<DelegateT>[number]["name"][];
        readonly latestOrder : undefined;
        readonly tracked : undefined;
        readonly doNotCopy : undefined;
        readonly copy : Exclude<
            LogT["copy"][number],
            ReturnType<DelegateT>[number]["name"]
        >[];
        readonly staticDefaultValue : undefined;
        readonly dynamicDefaultValueDelegate : undefined;
    }>
);
export function setEntityIdentifier<
    LogT extends LogMustSetEntityIdentifier,
    DelegateT extends SetEntityIdentifierDelegate<LogT>
> (
    log : LogT,
    delegate : DelegateT
) : (
    SetEntityIdentifier<
        LogT,
        DelegateT
    >
) {
    const columns = ColumnMapUtil.pick(
        log.table.columns,
        log.copy
    );
    const entityIdentifier = delegate(columns);
    ColumnIdentifierMapUtil.assertHasColumnIdentifiers(
        columns,
        entityIdentifier
    );
    const {
        table,
        latestOrder,
        tracked,
        doNotCopy,
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
            return !entityIdentifier.some(
                c => c.name == columnName
            )
        });
    return new Log({
        table,
        entityIdentifier : entityIdentifier.map(c => c.name),
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        staticDefaultValue,
        dynamicDefaultValueDelegate,
    });
}