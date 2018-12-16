import {
    UnionQuery,
    LimitData,
    IQuery,
    QueryData,
} from "../query";
import {ExprUtil} from "../../expr";
import {JoinArrayUtil} from "../../join-array";
import {SelectItemArrayUtil} from "../../select-item-array";
import {IJoin} from "../../join";
import {SelectItem} from "../../select-item";
import {IAliasedTable} from "../../aliased-table";
import {isObjectWithKeys} from "../../type";
import {ColumnIdentifierUtil} from "../../column-identifier";
import {OrderUtil} from "../../order";

export function isUnionQuery (raw : any) : raw is UnionQuery {
    return (
        raw != undefined &&
        (raw instanceof Object) &&
        ("distinct" in raw) &&
        ("query" in raw) &&
        (typeof raw.distinct == "boolean") &&
        isQuery(raw.query)
    );
}
export function isUnionQueryArray (raw : any) : raw is UnionQuery[] {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!isUnionQuery(item)) {
            return false;
        }
    }
    return true;
}
export function isLimitData (raw : any) : raw is LimitData {
    return (
        raw != undefined &&
        (raw instanceof Object) &&
        ("maxRowCount" in raw) &&
        ("offset" in raw) &&
        (typeof raw.maxRowCount == "number") &&
        (typeof raw.offset == "number")
    );
}
export function isQuery (raw : any) : raw is IQuery {
    if (!isObjectWithKeys<IQuery>(raw, [
        "_distinct",
        "_sqlCalcFoundRows",
        "_joins",
        "_parentJoins",
        "_selects",
        "_where",
        "_grouped",
        "_having",
        "_orders",
        "_limit",
        "_unions",
        "_unionOrders",
        "_unionLimit",
        "_mapDelegate"
    ])) {
        return false;
    }
    return (
        (typeof raw._distinct == "boolean") &&
        (typeof raw._sqlCalcFoundRows == "boolean") &&
        (
            raw._joins == undefined ||
            JoinArrayUtil.isJoinArray(raw._joins)
        ) &&
        (
            raw._parentJoins == undefined ||
            JoinArrayUtil.isJoinArray(raw._parentJoins)
        ) &&
        (
            raw._selects == undefined ||
            SelectItemArrayUtil.isSelectItemArray(raw._selects)
        ) &&
        (
            //TODO Check if boolean expr
            raw._where == undefined ||
            ExprUtil.isExpr(raw._where)
        ) &&
        (
            raw._grouped == undefined ||
            ColumnIdentifierUtil.Array.isColumnIdentifierArray(raw._grouped)
        ) &&
        (
            //TODO Check if boolean expr
            raw._having == undefined ||
            ExprUtil.isExpr(raw._having)
        ) &&
        (
            raw._orders == undefined ||
            OrderUtil.Array.isOrderArray(raw._orders)
        ) &&
        (
            raw._limit == undefined ||
            isLimitData(raw._limit)
        ) &&
        (
            raw._unions == undefined ||
            isUnionQueryArray(raw._unions)
        ) &&
        (
            raw._unionOrders == undefined ||
            OrderUtil.Array.isOrderArray(raw._unionOrders)
        ) &&
        (
            raw._unionLimit == undefined ||
            isLimitData(raw._unionLimit)
        ) &&
        (
            raw._mapDelegate == undefined ||
            (typeof raw._mapDelegate == "function")
        )
    )
}

export type BeforeFromClause = IQuery<QueryData & { _joins : undefined }>;
export type AfterFromClause = IQuery<QueryData & { _joins : IJoin[] }>;
export type BeforeUnionClause = IQuery<QueryData & { _unions : undefined }>;
export type AfterUnionClause = IQuery<QueryData & { _unions : UnionQuery[] }>;
export type BeforeSelectClause = IQuery<QueryData & { _selects : undefined }>;
export type AfterSelectClause = IQuery<QueryData & { _selects : SelectItem[] }>;
export type OneRowQuery = (
    BeforeFromClause &
    BeforeUnionClause
);
export type ZeroOrOneRowUnionQuery = (
    AfterUnionClause &
    { _unionLimit : { maxRowCount : 0|1 } }
);
export type ZeroOrOneRowFromQuery = (
    AfterFromClause &
    BeforeUnionClause &
    (
        { _limit : { maxRowCount : 0|1 } } |
        { _unionLimit : { maxRowCount : 0|1 } }
    )
);
export type ZeroOrOneRowQuery = (
    OneRowQuery |
    ZeroOrOneRowUnionQuery |
    ZeroOrOneRowFromQuery
);

export function isBeforeFromClause (query : IQuery) : query is BeforeFromClause {
    return query._joins == undefined;
}
export function isAfterFromClause (query : IQuery) : query is AfterFromClause {
    return query._joins != undefined;
}
export function isBeforeUnionClause (query : IQuery) : query is BeforeUnionClause {
    return query._unions == undefined;
}
export function isAfterUnionClause (query : IQuery) : query is AfterUnionClause {
    return query._unions != undefined;
}
export function isBeforeSelectClause (query : IQuery) : query is BeforeSelectClause {
    return query._selects == undefined;
}
export function isAfterSelectClause (query : IQuery) : query is AfterSelectClause {
    return query._selects != undefined;
}
export function isOneRowQuery (query : IQuery) : query is OneRowQuery {
    return isBeforeFromClause(query) && isBeforeUnionClause(query);
}
export function isZeroOrOneRowUnionQuery (query : IQuery) : query is ZeroOrOneRowUnionQuery {
    return (
        isAfterUnionClause(query) &&
        query._unionLimit != undefined &&
        (
            query._unionLimit.maxRowCount == 0 ||
            query._unionLimit.maxRowCount == 1
        )
    )
}
export function isZeroOrOneRowFromQuery (query : IQuery) : query is ZeroOrOneRowFromQuery {
    return (
        isAfterFromClause(query) &&
        isBeforeUnionClause(query) &&
        (
            (
                query._limit != undefined &&
                (
                    query._limit.maxRowCount == 0 ||
                    query._limit.maxRowCount == 1
                )
            ) ||
            (
                query._unionLimit != undefined &&
                (
                    query._unionLimit.maxRowCount == 0 ||
                    query._unionLimit.maxRowCount == 1
                )
            )
        )
    );
}
export function isZeroOrOneRowQuery (query : IQuery) : query is ZeroOrOneRowQuery {
    return (
        isOneRowQuery(query) ||
        isZeroOrOneRowUnionQuery(query) ||
        isZeroOrOneRowFromQuery(query)
    );
}

//TODO Better naming?
//AliasedTableT["alias"] must not already be in
//QueryT["joins"] or
//QueryT["parentJoins"]
export type AssertUniqueJoinTarget<
    QueryT extends IQuery<QueryData>,
    AliasedTableT extends IAliasedTable
> = (
    AliasedTableT &
    (
        QueryT["_joins"] extends IJoin[] ?
        (
            AliasedTableT["alias"] extends JoinArrayUtil.ToTableAliasUnion<QueryT["_joins"]> ?
            [
                "Alias",
                AliasedTableT["alias"],
                "already used in previous JOINs",
                JoinArrayUtil.ToTableAliasUnion<QueryT["_joins"]>
            ]|void :
            unknown
        ) :
        unknown
    ) &
    (
        QueryT["_parentJoins"] extends IJoin[] ?
        (
            AliasedTableT["alias"] extends JoinArrayUtil.ToTableAliasUnion<QueryT["_parentJoins"]> ?
            [
                "Alias",
                AliasedTableT["alias"],
                "already used in parent JOINs",
                JoinArrayUtil.ToTableAliasUnion<QueryT["_parentJoins"]>
            ]|void :
            unknown
        ) :
        unknown
    )
);
export function assertUniqueJoinTarget (
    query : IQuery,
    aliasedTable : IAliasedTable
) {
    if (query._joins != undefined) {
        if (query._joins.some(j => j.aliasedTable.alias == aliasedTable.alias)) {
            throw new Error(`Alias ${aliasedTable.alias} already used in previous JOINs`);
        }
    }
    if (query._parentJoins != undefined) {
        if (query._parentJoins.some(j => j.aliasedTable.alias == aliasedTable.alias)) {
            throw new Error(`Alias ${aliasedTable.alias} already used in parent JOINs`);
        }
    }
}