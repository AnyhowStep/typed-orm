import {
    UnionQuery,
    LimitData,
    IQuery,
    QueryData,
} from "../query";
import {ExprUtil, IAnonymousTypedExpr} from "../../expr";
import {SelectItemArrayUtil} from "../../select-item-array";
import {IJoin, JoinUtil} from "../../join";
import {SelectItem, AnonymousTypedSingleValueSelectItem, SelectItemUtil} from "../../select-item";
import {IAliasedTable} from "../../aliased-table";
import {isObjectWithKeys} from "../../type";
import {ColumnIdentifierUtil} from "../../column-identifier";
import {OrderUtil, Order} from "../../order";

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
            JoinUtil.Array.isJoinArray(raw._joins)
        ) &&
        (
            raw._parentJoins == undefined ||
            JoinUtil.Array.isJoinArray(raw._parentJoins)
        ) &&
        (
            raw._selects == undefined ||
            SelectItemArrayUtil.isSelectItemArray(raw._selects)
        ) &&
        (
            //TODO-FEATURE Check if boolean expr
            raw._where == undefined ||
            ExprUtil.isExpr(raw._where)
        ) &&
        (
            raw._grouped == undefined ||
            ColumnIdentifierUtil.Array.isColumnIdentifierArray(raw._grouped)
        ) &&
        (
            //TODO-FEATURE Check if boolean expr
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
export type BeforeWhereClause = IQuery<QueryData & { _where : undefined }>;
export type AfterWhereClause = IQuery<QueryData & { _where : IAnonymousTypedExpr<boolean> }>;
export type BeforeHavingClause = IQuery<QueryData & { _where : undefined }>;
export type AfterHavingClause = IQuery<QueryData & { _where : IAnonymousTypedExpr<boolean> }>;
export type BeforeOrderByClause = IQuery<QueryData & { _orders : undefined }>;
export type AfterOrderByClause = IQuery<QueryData & { _orders : Order[] }>;
export type BeforeUnionOrderByClause = IQuery<QueryData & { _unionOrders : undefined }>;
export type AfterUnionOrderByClause = IQuery<QueryData & { _unionOrders : Order[] }>;
export type CanWidenColumnTypes = IQuery<
    QueryData &
    {
        _selects : undefined,
        _where : undefined,
        _having : undefined,
        _orders : undefined,
        _unionOrders : undefined,
    }
>;
export type MainQuery = IQuery<QueryData & { _parentJoins : undefined }>;
export type SubQuery = IQuery<QueryData & { _parentJoins : IJoin[] }>;
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
export function isBeforeWhereClause (query : IQuery) : query is BeforeWhereClause {
    return query._where == undefined;
}
export function isAfterWhereClause (query : IQuery) : query is AfterWhereClause {
    return query._where != undefined;
}
export function isBeforeHavingClause (query : IQuery) : query is BeforeHavingClause {
    return query._having == undefined;
}
export function isAfterHavingClause (query : IQuery) : query is AfterHavingClause {
    return query._having != undefined;
}
export function isBeforeOrderByClause (query : IQuery) : query is BeforeOrderByClause {
    return query._orders == undefined;
}
export function isAfterOrderByClause (query : IQuery) : query is AfterOrderByClause {
    return query._orders != undefined;
}
export function isBeforeUnionOrderByClause (query : IQuery) : query is BeforeUnionOrderByClause {
    return query._unionOrders == undefined;
}
export function isAfterUnionOrderByClause (query : IQuery) : query is AfterUnionOrderByClause {
    return query._unionOrders != undefined;
}
export function canWidenColumnTypes (query : IQuery) : query is CanWidenColumnTypes {
    return (
        isBeforeSelectClause(query) &&
        isBeforeWhereClause(query) &&
        isBeforeHavingClause(query) &&
        isBeforeOrderByClause(query) &&
        isBeforeUnionOrderByClause(query)
    )
}
export function isMainQuery (query : IQuery) : query is MainQuery {
    return query._parentJoins == undefined;
}
export function isSubQuery (query : IQuery) : query is SubQuery {
    return query._parentJoins != undefined;
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
                JoinUtil.Array.TableAliases<QueryT["_joins"]>
            > extends never ?
            unknown :
            [
                "Alias",
                Extract<
                    AliasedTableT["alias"],
                    JoinUtil.Array.TableAliases<QueryT["_joins"]>
                >,
                "already used in previous JOINs",
                JoinUtil.Array.TableAliases<QueryT["_joins"]>
            ]
        ) :
        unknown
    ) &
    (
        QueryT["_parentJoins"] extends IJoin[] ?
        (
            Extract<
                AliasedTableT["alias"],
                JoinUtil.Array.TableAliases<QueryT["_parentJoins"]>
            > extends never ?
            unknown :
            [
                "Alias",
                Extract<
                    AliasedTableT["alias"],
                    JoinUtil.Array.TableAliases<QueryT["_parentJoins"]>
                >,
                "already used in parent JOINs",
                JoinUtil.Array.TableAliases<QueryT["_parentJoins"]>
            ]
        ) :
        unknown
    ) &
    (
        AliasedTableT["usedColumns"][number] extends never ?
        unknown :
        [
            "Derived table",
            AliasedTableT["alias"],
            "cannot reference outer query columns"
        ]
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
    if (aliasedTable.usedColumns.length > 0) {
        throw new Error(`Derived table ${aliasedTable.alias} cannot reference outer query columns`);
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