import {ILog, Log} from "../../log";
import {ITable} from "../../../table";
import {NonEmptyTuple} from "../../../tuple";
import {ColumnUtil} from "../../../column";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";
import {ColumnMapUtil} from "../../../column-map";
import {JoinDeclaration, innerJoinCkUsing} from "../../../join-declaration";
import {KeyUtil} from "../../../key";

export type LogMustSetEntityIdentifier = (
    ILog<{
        readonly table : ITable;
        readonly entity : ITable;
        readonly entityIdentifier : undefined;
        readonly joinDeclaration : undefined;
        readonly latestOrder : undefined;
        readonly tracked : undefined;
        readonly doNotCopy : undefined;
        readonly copy : string[];
        readonly copyDefaultsDelegate : undefined;
        readonly trackedDefaults : undefined;
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
        readonly entity : LogT["entity"];
        readonly entityIdentifier : ReturnType<DelegateT>[number]["name"][];
        readonly joinDeclaration : JoinDeclaration<{
            fromTable : LogT["table"],
            toTable : LogT["entity"],
            nullable : false,
        }>;
        readonly latestOrder : undefined;
        readonly tracked : undefined;
        readonly doNotCopy : undefined;
        readonly copy : Exclude<
            LogT["copy"][number],
            ReturnType<DelegateT>[number]["name"]
        >[];
        readonly copyDefaultsDelegate : undefined;
        readonly trackedDefaults : undefined;
    }>
);
//https://github.com/Microsoft/TypeScript/issues/29133
export type AssertValidSetEntityIdentifierDelegate_Hack<
    LogT extends LogMustSetEntityIdentifier,
    DelegateT extends SetEntityIdentifierDelegate<LogT>,
    ResultT
> = (
    KeyUtil.Array.HasKey<
        LogT["entity"]["candidateKeys"],
        (
            ReturnType<DelegateT>[number]["name"]
        )[]
    > extends true ?
    ResultT :
    [
        (
            ReturnType<DelegateT>[number]["name"]
        )[],
        "must be a candidate key of",
        LogT["entity"]["alias"]
    ]|void
);
export function setEntityIdentifier<
    LogT extends LogMustSetEntityIdentifier,
    DelegateT extends SetEntityIdentifierDelegate<LogT>
> (
    log : LogT,
    delegate : DelegateT
) : (
    AssertValidSetEntityIdentifierDelegate_Hack<
        LogT,
        DelegateT,
        SetEntityIdentifier<
            LogT,
            DelegateT
        >
    >
) {
    const columns = ColumnMapUtil.pick(
        log.table.columns,
        log.copy
    );
    const rawEntityIdentifier = delegate(columns);
    ColumnIdentifierMapUtil.assertHasColumnIdentifiers(
        columns,
        rawEntityIdentifier
    );
    const entityIdentifier = rawEntityIdentifier.map(c => c.name);
    if (!KeyUtil.Array.hasKey(
        log.entity.candidateKeys,
        entityIdentifier
    )) {
        throw new Error(`${entityIdentifier.join("|")} must be a candidate key of ${log.entity.alias}`);
    }

    const {
        table,
        entity,
        latestOrder,
        tracked,
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
            return entityIdentifier.indexOf(columnName) < 0;
        });
    const result : SetEntityIdentifier<
        LogT,
        DelegateT
    > = new Log({
        table,
        entity,
        entityIdentifier,
        joinDeclaration : innerJoinCkUsing(
            log.table as any,
            log.entity as any,
            () => rawEntityIdentifier as any
        ) as any,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        copyDefaultsDelegate,
        trackedDefaults,
    });
    return result as any;
}
