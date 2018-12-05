import {
    UnionQuery,
    Limit,
    ExtraQueryData,
    IQuery,
    QueryData,
} from "../query";
import {Expr} from "../../expr";
import {JoinArrayUtil} from "../../join-array";
import {SelectItemArrayUtil} from "../../select-item-array";
import {IJoin} from "../../join";
import {SelectItem} from "../../select-item";
import {IAliasedTable} from "../../aliased-table";

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
export function isLimit (raw : any) : raw is Limit {
    return (
        raw != undefined &&
        (raw instanceof Object) &&
        ("rowCount" in raw) &&
        ("offset" in raw) &&
        (typeof raw.rowCount == "number") &&
        (typeof raw.offset == "number")
    );
}
export function isExtraQueryData (raw : any) : raw is ExtraQueryData {
    return (
        raw != undefined &&
        (raw instanceof Object) &&
        ("where" in raw) &&
        (
            raw.where == undefined ||
            Expr.isExpr(raw.where)
        )
    );
}
export function isQuery (raw : any) : raw is IQuery {
    return (
        raw != undefined &&
        (raw instanceof Object) &&
        ("joins" in raw) &&
        ("parentJoins" in raw) &&
        ("unions" in raw) &&
        ("selects" in raw) &&
        ("limit" in raw) &&
        ("unionLimit" in raw) &&
        ("extraData" in raw) &&
        (
            raw.joins == undefined ||
            JoinArrayUtil.isJoinArray(raw.joins)
        ) &&
        (
            raw.parentJoins == undefined ||
            JoinArrayUtil.isJoinArray(raw.parentJoins)
        ) &&
        (
            raw.unions == undefined ||
            isUnionQueryArray(raw.unions)
        ) &&
        (
            raw.selects == undefined ||
            SelectItemArrayUtil.isSelectItemArray(raw.selects)
        ) &&
        (
            raw.limit == undefined ||
            isLimit(raw.limit)
        ) &&
        (
            raw.unionLimit == undefined ||
            isLimit(raw.unionLimit)
        ) &&
        isExtraQueryData(raw.extraData)
    );
}

export type BeforeFromClause = IQuery<QueryData & { joins : undefined }>;
export type AfterFromClause = IQuery<QueryData & { joins : IJoin[] }>;
export type BeforeUnionClause = IQuery<QueryData & { unions : undefined }>;
export type AfterUnionClause = IQuery<QueryData & { unions : UnionQuery[] }>;
export type BeforeSelectClause = IQuery<QueryData & { selects : undefined }>;
export type AfterSelectClause = IQuery<QueryData & { selects : SelectItem[] }>;
export type OneRowQuery = (
    BeforeFromClause &
    BeforeUnionClause
);
export type ZeroOrOneRowUnionQuery = (
    AfterUnionClause &
    { unionLimit : { rowCount : 0|1 } }
);
export type ZeroOrOneRowFromQuery = (
    AfterFromClause &
    BeforeUnionClause &
    (
        { limit : { rowCount : 0|1 } } |
        { unionLimit : { rowCount : 0|1 } }
    )
);
export type ZeroOrOneRowQuery = (
    OneRowQuery |
    ZeroOrOneRowUnionQuery |
    ZeroOrOneRowFromQuery
);

export function isBeforeFromClause (query : IQuery) : query is BeforeFromClause {
    return query.joins == undefined;
}
export function isAfterFromClause (query : IQuery) : query is AfterFromClause {
    return query.joins != undefined;
}
export function isBeforeUnionClause (query : IQuery) : query is BeforeUnionClause {
    return query.unions == undefined;
}
export function isAfterUnionClause (query : IQuery) : query is AfterUnionClause {
    return query.unions != undefined;
}
export function isBeforeSelectClause (query : IQuery) : query is BeforeSelectClause {
    return query.selects == undefined;
}
export function isAfterSelectClause (query : IQuery) : query is AfterSelectClause {
    return query.selects != undefined;
}
export function isOneRowQuery (query : IQuery) : query is OneRowQuery {
    return isBeforeFromClause(query) && isBeforeUnionClause(query);
}
export function isZeroOrOneRowUnionQuery (query : IQuery) : query is ZeroOrOneRowUnionQuery {
    return (
        isAfterUnionClause(query) &&
        query.unionLimit != undefined &&
        (
            query.unionLimit.rowCount == 0 ||
            query.unionLimit.rowCount == 1
        )
    )
}
export function isZeroOrOneRowFromQuery (query : IQuery) : query is ZeroOrOneRowFromQuery {
    return (
        isAfterFromClause(query) &&
        isBeforeUnionClause(query) &&
        (
            (
                query.limit != undefined &&
                (
                    query.limit.rowCount == 0 ||
                    query.limit.rowCount == 1
                )
            ) ||
            (
                query.unionLimit != undefined &&
                (
                    query.unionLimit.rowCount == 0 ||
                    query.unionLimit.rowCount == 1
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
        QueryT["joins"] extends IJoin[] ?
        (
            AliasedTableT["alias"] extends JoinArrayUtil.ToTableAliasUnion<QueryT["joins"]> ?
            [
                "Alias",
                AliasedTableT["alias"],
                "already used in previous JOINs",
                JoinArrayUtil.ToTableAliasUnion<QueryT["joins"]>
            ]|void :
            unknown
        ) :
        unknown
    ) &
    (
        QueryT["parentJoins"] extends IJoin[] ?
        (
            AliasedTableT["alias"] extends JoinArrayUtil.ToTableAliasUnion<QueryT["parentJoins"]> ?
            [
                "Alias",
                AliasedTableT["alias"],
                "already used in parent JOINs",
                JoinArrayUtil.ToTableAliasUnion<QueryT["parentJoins"]>
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
    if (query.joins != undefined) {
        if (query.joins.some(j => j.aliasedTable.alias == aliasedTable.alias)) {
            throw new Error(`Alias ${aliasedTable.alias} already used in previous JOINs`);
        }
    }
    if (query.parentJoins != undefined) {
        if (query.parentJoins.some(j => j.aliasedTable.alias == aliasedTable.alias)) {
            throw new Error(`Alias ${aliasedTable.alias} already used in parent JOINs`);
        }
    }
}