import {ILog, Log} from "../../log";
import {ITable} from "../../../table";
import {ColumnUtil} from "../../../column";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";
import {SortDirection} from "../../../order";
import {ColumnMapUtil} from "../../../column-map";
import {CandidateKeyArrayUtil} from "../../../candidate-key-array";
import {IJoinDeclaration} from "../../../join-declaration";

export type LogMustSetLatestOrder = (
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
        readonly latestOrder : undefined;
        readonly tracked : undefined;
        readonly doNotCopy : undefined;
        readonly copy : string[];
        readonly copyDefaultsDelegate : undefined;
        readonly trackedDefaults : undefined;
    }>
);
export type SetLatestOrderDelegate<
    LogT extends LogMustSetLatestOrder
> = (
    (
        columns : Pick<
            LogT["table"]["columns"],
            LogT["copy"][number]
        >,
    ) => [
        ColumnUtil.FromColumnMap<
            Pick<
                LogT["table"]["columns"],
                LogT["copy"][number]
            >
        >,
        SortDirection
    ]
);
export type AssertValidSetOrderDelegateImpl<
    LogT extends LogMustSetLatestOrder,
    DelegateT extends SetLatestOrderDelegate<LogT>
> = (
    CandidateKeyArrayUtil.HasKey<
        LogT["table"]["candidateKeys"],
        (
            LogT["entityIdentifier"][number] |
            ReturnType<DelegateT>[0]["name"]
        )[]
    > extends true ?
    unknown :
    [
        (
            LogT["entityIdentifier"][number] |
            ReturnType<DelegateT>[0]["name"]
        )[],
        "must be a candidate key of",
        LogT["table"]["alias"]
    ]
);
//https://github.com/Microsoft/TypeScript/issues/29133
export type AssertValidSetLatestOrderDelegate_Hack<
    LogT extends LogMustSetLatestOrder,
    DelegateT extends SetLatestOrderDelegate<LogT>,
    ResultT
> = (
    CandidateKeyArrayUtil.HasKey<
        LogT["table"]["candidateKeys"],
        (
            LogT["entityIdentifier"][number] |
            ReturnType<DelegateT>[0]["name"]
        )[]
    > extends true ?
    ResultT :
    [
        (
            LogT["entityIdentifier"][number] |
            ReturnType<DelegateT>[0]["name"]
        )[],
        "must be a candidate key of",
        LogT["table"]["alias"]
    ]|void
);
export type SetLatestOrder<
    LogT extends LogMustSetLatestOrder,
    DelegateT extends SetLatestOrderDelegate<LogT>
> = (
    Log<{
        readonly table : LogT["table"];
        readonly entity : LogT["entity"];
        readonly entityIdentifier : LogT["entityIdentifier"];
        readonly joinDeclaration : LogT["joinDeclaration"];
        readonly latestOrder : ReturnType<DelegateT>;
        readonly tracked : undefined;
        readonly doNotCopy : undefined;
        readonly copy : Exclude<
            LogT["copy"][number],
            ReturnType<DelegateT>[0]["name"]
        >[];
        readonly copyDefaultsDelegate : undefined;
        readonly trackedDefaults : undefined;
    }>
);
export function setLatestOrder<
    LogT extends LogMustSetLatestOrder,
    DelegateT extends SetLatestOrderDelegate<LogT>
> (
    log : LogT,
    delegate : DelegateT
) : (
    AssertValidSetLatestOrderDelegate_Hack<
        LogT,
        DelegateT,
        SetLatestOrder<
            LogT,
            DelegateT
        >
    >
) {
    const columns = ColumnMapUtil.pick(
        log.table.columns,
        log.copy
    );
    const latestOrder : ReturnType<DelegateT> = delegate(columns) as any;
    ColumnIdentifierMapUtil.assertHasColumnIdentifier(
        columns,
        latestOrder[0]
    );
    const logCk = [...log.entityIdentifier, latestOrder[0].name];
    if (!CandidateKeyArrayUtil.hasKey(
        log.entity.candidateKeys,
        logCk
    )) {
        throw new Error(`${logCk.join("|")} must be a candidate key of ${log.table.alias}`);
    }

    const {
        table,
        entity,
        entityIdentifier,
        joinDeclaration,
        tracked,
        doNotCopy,
        copyDefaultsDelegate,
        trackedDefaults,
    } = log;
    const copy = log.copy
        .filter((columnName) : columnName is (
            Exclude<
                LogT["copy"][number],
                ReturnType<DelegateT>[0]["name"]
            >
        ) => {
            return columnName != latestOrder[0].name;
        });
    const result : SetLatestOrder<
        LogT,
        DelegateT
    > = new Log({
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
    return result as any;
}
/*
import * as o from "../../../index";
import {log} from "../constructor";
import { setEntityIdentifier } from "./set-entity-identifier";
const table = o.table("table", {
    x : o.bigint(),
    y : o.dateTime(),
    v : o.bigint()
}).addCandidateKey(c => [c.x, c.y]);
const l = log(table);
const l2 = setEntityIdentifier(l, c => [c.x]);
const l3 = setLatestOrder(l2, c => c.y.desc())
*/