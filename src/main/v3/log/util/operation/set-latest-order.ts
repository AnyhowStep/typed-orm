import {ILog, Log} from "../../log";
import {ITable} from "../../../table";
import {ColumnUtil} from "../../../column";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";
import {SortDirection} from "../../../order";
import {Omit} from "../../../type";
import {ColumnMapUtil} from "../../../column-map";
import {CandidateKeyArrayUtil} from "../../../candidate-key-array";

export type LogMustSetLatestOrder = (
    ILog<{
        readonly table : ITable;
        readonly entityIdentifier : string[];
        readonly latestOrder : undefined;
        readonly tracked : undefined;
        readonly doNotCopy : undefined;
        readonly copy : string[];
        readonly staticDefaultValue : undefined;
        readonly dynamicDefaultValueDelegate : undefined;
    }>
);
export type SetLatestOrderDelegate<
    LogT extends LogMustSetLatestOrder
> = (
    (
        columns : Omit<
            LogT["table"]["columns"],
            LogT["entityIdentifier"][number]
        >,
    ) => [
        ColumnUtil.FromColumnMap<
            Omit<
                LogT["table"]["columns"],
                LogT["entityIdentifier"][number]
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
export type AssertValidSetOrderDelegate_Hack<
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
    ]
);
export type SetLatestOrder<
    LogT extends LogMustSetLatestOrder,
    DelegateT extends SetLatestOrderDelegate<LogT>
> = (
    Log<{
        readonly table : LogT["table"];
        readonly entityIdentifier : LogT["entityIdentifier"];
        readonly latestOrder : ReturnType<DelegateT>;
        readonly tracked : undefined;
        readonly doNotCopy : undefined;
        readonly copy : Exclude<
            LogT["copy"][number],
            ReturnType<DelegateT>[0]["name"]
        >[];
        readonly staticDefaultValue : undefined;
        readonly dynamicDefaultValueDelegate : undefined;
    }>
);
export function setLatestOrder<
    LogT extends LogMustSetLatestOrder,
    DelegateT extends SetLatestOrderDelegate<LogT>
> (
    log : LogT,
    delegate : DelegateT
) : (
    AssertValidSetOrderDelegate_Hack<
        LogT,
        DelegateT,
        SetLatestOrder<
            LogT,
            DelegateT
        >
    >
) {
    const columns = ColumnMapUtil.omit<
        LogT["table"]["columns"],
        LogT["entityIdentifier"]
    >(log.table.columns, log.entityIdentifier);
    const latestOrder : ReturnType<DelegateT> = delegate(columns) as any;
    ColumnIdentifierMapUtil.assertHasColumnIdentifiers(
        columns,
        latestOrder[0] as any
    );
    const {
        table,
        entityIdentifier,
        tracked,
        doNotCopy,
        staticDefaultValue,
        dynamicDefaultValueDelegate,
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
    return new Log({
        table,
        entityIdentifier,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        staticDefaultValue,
        dynamicDefaultValueDelegate,
    }) as SetLatestOrder<
        LogT,
        DelegateT
    > as any;
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