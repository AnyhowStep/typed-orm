import {Query} from "../../query";
import {AfterSelectClause, AfterFromClause, AfterUnionClause} from "../predicate";
import {ColumnRefUtil} from "../../../column-ref";
import {IExpr, ExprUtil} from "../../../expr";
import {ColumnUtil} from "../../../column";
import {NonEmptyTuple} from "../../../tuple";
import {RawOrder, Order, OrderUtil, SortDirection} from "../../../order";
import {ToNeverIfAllFieldsNever} from "../../../type";

export type UnionOrderByDelegate<
    QueryT extends AfterSelectClause & (AfterFromClause|AfterUnionClause)
> = (
    (
        columns : ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuerySelects<QueryT>>,
        query : QueryT,
    ) => NonEmptyTuple<
        ColumnUtil.FromColumnRef<
            ColumnRefUtil.FromQuerySelects<QueryT>
        > |
        [
            ColumnUtil.FromColumnRef<
                ColumnRefUtil.FromQuerySelects<QueryT>
            >,
            SortDirection
        ] |
        IExpr |
        [
            IExpr,
            SortDirection
        ]
    >
);

export type UnionOrderBy<
    QueryT extends AfterSelectClause & (AfterFromClause|AfterUnionClause)
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : QueryT["_joins"],
        readonly _parentJoins : QueryT["_parentJoins"],
        readonly _selects : QueryT["_selects"],
        readonly _where : QueryT["_where"],

        readonly _grouped : QueryT["_grouped"],
        readonly _having : QueryT["_having"],

        readonly _orders : QueryT["_orders"],
        readonly _limit : QueryT["_limit"],

        readonly _unions : QueryT["_unions"],
        readonly _unionOrders : Order[],
        readonly _unionLimit : QueryT["_unionLimit"],

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);

export type AssertValidUnionOrderByDelegate_HackImpl<
    QueryT extends AfterSelectClause & (AfterFromClause|AfterUnionClause),
    UnionOrderByDelegateT extends UnionOrderByDelegate<QueryT>
> = (
    //Exprs must have usedColumns be subset of queryRef
    ToNeverIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<UnionOrderByDelegateT>, string>] : (
            ReturnType<UnionOrderByDelegateT>[index] extends RawOrder ?
            (
                OrderUtil.ExtractExpr<
                    ReturnType<UnionOrderByDelegateT>[index]
                > extends never ?
                never :
                (
                    ColumnUtil.AssertValidUsed<
                        OrderUtil.ExtractExpr<
                            ReturnType<UnionOrderByDelegateT>[index]
                        >["usedColumns"][number],
                        ColumnUtil.FromQuerySelects<QueryT>
                    > extends never ?
                    never :
                    [
                        "Invalid IExpr",
                        index,
                        ColumnUtil.AssertValidUsed<
                            OrderUtil.ExtractExpr<
                                ReturnType<UnionOrderByDelegateT>[index]
                            >["usedColumns"][number],
                            ColumnUtil.FromQuerySelects<QueryT>
                        >
                    ]
                )
            ) :
            never
        )
    }> |
    //Columns used must exist in queryRef
    ToNeverIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<UnionOrderByDelegateT>, string>] : (
            ReturnType<UnionOrderByDelegateT>[index] extends RawOrder ?
            (
                OrderUtil.ExtractColumn<
                    ReturnType<UnionOrderByDelegateT>[index]
                > extends ColumnUtil.FromColumnRef<
                    ColumnRefUtil.FromQuerySelects<QueryT>
                > ?
                never :
                [
                    "Invalid IColumn",
                    index,
                    Exclude<
                        OrderUtil.ExtractColumn<
                            ReturnType<UnionOrderByDelegateT>[index]
                        >,
                        ColumnUtil.FromColumnRef<
                            ColumnRefUtil.FromQuerySelects<QueryT>
                        >
                    >
                ]
            ) :
            never
        )
    }>
);
//https://github.com/Microsoft/TypeScript/issues/29133
export type AssertValidUnionOrderByDelegate_Hack<
    QueryT extends AfterSelectClause & (AfterFromClause|AfterUnionClause),
    UnionOrderByDelegateT extends UnionOrderByDelegate<QueryT>,
    ResultT
> = (
    UnionOrderByDelegateT &
    AssertValidUnionOrderByDelegate_HackImpl<
        QueryT,
        UnionOrderByDelegateT
    > extends never ?
    ResultT :
    AssertValidUnionOrderByDelegate_HackImpl<
        QueryT,
        UnionOrderByDelegateT
    >|void
);

export type UnionOrderByResult<
    QueryT extends AfterSelectClause & (AfterFromClause|AfterUnionClause),
    UnionOrderByDelegateT extends UnionOrderByDelegate<QueryT>
> = (
    AssertValidUnionOrderByDelegate_Hack<
        QueryT,
        UnionOrderByDelegateT,
        UnionOrderBy<QueryT>
    >
);

//Must be called after `FROM` or `UNION`, because there's little point
//in ordering one row
//Must be called after `SELECT` because the only
//other viable SortExpr/OrderExpr is RAND()
//but you usually aren't interested in that
export function unionOrderBy<
    QueryT extends AfterSelectClause & (AfterFromClause|AfterUnionClause),
    UnionOrderByDelegateT extends UnionOrderByDelegate<QueryT>
> (
    query : QueryT,
    delegate : UnionOrderByDelegateT
) : (
    UnionOrderByResult<QueryT, UnionOrderByDelegateT>
) {
    if (query._selects == undefined) {
        throw new Error(`Can only use UNION ORDER BY after SELECT clause`);
    }
    if (query._joins == undefined && query._unions == undefined) {
        throw new Error(`Can only use UNION ORDER BY after FROM or UNION clause`);
    }
    const queryRef = ColumnRefUtil.fromQuerySelects(query);
    const rawOrders = delegate(
        ColumnRefUtil.toConvenient(queryRef),
        query
    );
    //TODO-UNHACK This was fine in TS 3.3.0-dev.20190103
    const orders = OrderUtil.Array.fromRawOrderArray(rawOrders as any);

    for (let order of orders) {
        const orderExpr = order[0];
        if (ColumnUtil.isColumn(orderExpr)) {
            ColumnRefUtil.assertHasColumnIdentifier(queryRef, orderExpr);
        } else if (ExprUtil.isExpr(orderExpr)) {
            ColumnRefUtil.assertHasColumnIdentifiers(queryRef, orderExpr.usedColumns);
        }
    }

    const {
        _distinct,
        _sqlCalcFoundRows,

        _joins,
        _parentJoins,
        _selects,
        _where,

        _grouped,
        _having,

        _orders,
        _limit,

        _unions,
        _unionLimit,

        _mapDelegate,
    } = query;
    const result : UnionOrderBy<QueryT> = new Query(
        {
            _distinct,
            _sqlCalcFoundRows,

            _joins,
            _parentJoins,
            _selects,
            _where,

            _grouped,
            _having,

            _orders,
            _limit,

            _unions,
            _unionOrders : (
                query._unionOrders == undefined ?
                orders :
                [...query._unionOrders, ...orders]
            ),
            _unionLimit,

            _mapDelegate,
        }
    ) as UnionOrderBy<QueryT>;
    return result as any;
}
/*
import * as o from "../../../index";
const table = o.table("test", {
    x : o.bigint(),
    y : o.varChar.nullable(),
    z : o.boolean(),
});
const nse = o.nullSafeEq(table.columns.x, table.columns.x);
const rnse = () => nse;
const xDesc = table.columns.x.desc();
o.from(table)
    .select(c => [c])
    .unionOrderBy(c => [
        c.z.desc()
    ])
    .having(rnse);
o.from(table)
    .select(c => [c])
    .unionOrderBy(() => [xDesc, nse.desc()])
    .having(rnse);
o.from(table)
    .select(c => [c])
    .unionOrderBy((_c) => [xDesc, nse.desc()])
    .having(rnse);

const table2 = o.table("test2", {
    x : o.bigint(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse2 = o.nullSafeEq(table.columns.x, table2.columns.x);
o.from(table)
    .select(c => [c])
    .unionOrderBy((_c) => [xDesc, nse2.desc()])
    .having(rnse);

const table3 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse3 = o.nullSafeEq(table.columns.x, table3.columns.x);
o.from(table)
    .select(c => [c])
    .unionOrderBy((_c) => [xDesc, nse3.desc()])
    .having(rnse);

const table4 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse4 = o.nullSafeEq(table.columns.y, table4.columns.y);
o.from(table)
    .select(c => [c])
    .unionOrderBy((_c) => [xDesc, nse4.desc()])
    .having(rnse);

const table5 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse5 = o.eq(table5.columns.y, "test");
o.from(table)
    .select(c => [c])
    .unionOrderBy((_c) => [xDesc, nse5.desc()])
    .having(rnse);
*/