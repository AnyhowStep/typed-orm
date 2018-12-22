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
import {SelectItem, AnonymousTypedSingleValueSelectItem, SelectItemUtil} from "../../select-item";
import {IAliasedTable} from "../../aliased-table";
import {isObjectWithKeys} from "../../type";
import {ColumnIdentifierUtil} from "../../column-identifier";
import {OrderUtil} from "../../order";
import { ColumnUtil } from "../../column";
import { ColumnIdentifierRefUtil } from "../../column-identifier-ref";

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
export type OneSelectItemQuery<TypeT> = (
    QueryData &
    { _selects : [AnonymousTypedSingleValueSelectItem<TypeT>] }
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

export function isOneSelectItemQuery (query : IQuery) : query is OneSelectItemQuery<any> {
    return (
        isAfterSelectClause(query) &&
        query._selects.length == 1 &&
        SelectItemUtil.isSingleValueSelectItem(query._selects[0])
    );
}
export type AssertValidJoinTargetImpl<
    QueryT extends IQuery,
    AliasedTableT extends IAliasedTable
> = (
    (
        QueryT["_joins"] extends IJoin[] ?
        (
            Extract<
                AliasedTableT["alias"],
                JoinArrayUtil.ToTableAliasUnion<QueryT["_joins"]>
            > extends never ?
            unknown :
            //TODO remove the |void?
            [
                "Alias",
                Extract<
                    AliasedTableT["alias"],
                    JoinArrayUtil.ToTableAliasUnion<QueryT["_joins"]>
                >,
                "already used in previous JOINs",
                JoinArrayUtil.ToTableAliasUnion<QueryT["_joins"]>
            ]|void
        ) :
        unknown
    ) &
    (
        QueryT["_parentJoins"] extends IJoin[] ?
        (
            Extract<
                AliasedTableT["alias"],
                JoinArrayUtil.ToTableAliasUnion<QueryT["_parentJoins"]>
            > extends never ?
            unknown :
            //TODO remove the |void?
            [
                "Alias",
                Extract<
                    AliasedTableT["alias"],
                    JoinArrayUtil.ToTableAliasUnion<QueryT["_parentJoins"]>
                >,
                "already used in parent JOINs",
                JoinArrayUtil.ToTableAliasUnion<QueryT["_parentJoins"]>
            ]|void
        ) :
        unknown
    ) &
    //AliasedTableT["usedRef"] must be compatible with QueryT["_parentJoins"]
    (
        Extract<keyof AliasedTableT["usedRef"], string> extends never ?
        //The easy case, AliasedTableT has no usedRef
        unknown :
        (
            QueryT["_parentJoins"] extends IJoin[] ?
            (
                Exclude<
                    ColumnUtil.FromColumnRef<AliasedTableT["usedRef"]>,
                    ColumnUtil.FromJoinArray<QueryT["_parentJoins"]>
                > extends never ?
                //All of usedRef exist in parentJoins
                unknown :
                [
                    "Incompatible usedRef",
                    Exclude<
                        ColumnUtil.FromColumnRef<AliasedTableT["usedRef"]>,
                        ColumnUtil.FromJoinArray<QueryT["_parentJoins"]>
                    >
                ]
            ) :
            //You can't have any usedRef if there are no parentJoins
            [
                "Incompatible usedRef",
                //All columns in the usedRef are incompatible
                ColumnIdentifierUtil.FromColumnRef<AliasedTableT["usedRef"]>
            ]
        )
    )
);
//AliasedTableT["alias"] must not already be in
//QueryT["joins"] or
//QueryT["parentJoins"]
export type AssertValidJoinTarget<
    QueryT extends IQuery,
    AliasedTableT extends IAliasedTable
> = (
    AliasedTableT &
    AssertValidJoinTargetImpl<QueryT, AliasedTableT>
);
export function assertValidJoinTarget (
    query : IQuery,
    aliasedTable : IAliasedTable
) {
    if (query._parentJoins == undefined) {
        ColumnIdentifierRefUtil.assertHasColumnIdentifiers(
            {},
            ColumnIdentifierUtil.Array.fromColumnRef(aliasedTable.usedRef)
        );
    } else {
        ColumnIdentifierRefUtil.assertHasColumnIdentifiers(
            ColumnIdentifierRefUtil.fromJoinArray(query._parentJoins),
            ColumnIdentifierUtil.Array.fromColumnRef(aliasedTable.usedRef)
        );
    }

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