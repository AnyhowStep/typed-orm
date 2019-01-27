import {Query} from "../../query";
import {AfterFromClause} from "../predicate";
import {ColumnRefUtil} from "../../../column-ref";
import {IExpr, ExprUtil} from "../../../expr";
import {ColumnUtil, IColumn} from "../../../column";
import {NonEmptyTuple} from "../../../tuple";
import {RawOrder, Order, OrderUtil, SortDirection} from "../../../order";
import {ToNeverIfAllFieldsNever} from "../../../type";

export type OrderByDelegate<
    QueryT extends AfterFromClause
> = (
    (
        columns : ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuery<QueryT>>,
        query : QueryT,
    ) => NonEmptyTuple<
        ColumnUtil.FromColumnRef<
            ColumnRefUtil.FromQuery<QueryT>
        > |
        [
            ColumnUtil.FromColumnRef<
                ColumnRefUtil.FromQuery<QueryT>
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

export type OrderBy<
    QueryT extends AfterFromClause
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

        readonly _orders : Order[],
        readonly _limit : QueryT["_limit"],

        readonly _unions : QueryT["_unions"],
        readonly _unionOrders : QueryT["_unionOrders"],
        readonly _unionLimit : QueryT["_unionLimit"],

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);

export type AssertValidOrderByDelegate_HackImpl<
    QueryT extends AfterFromClause,
    OrderByDelegateT extends OrderByDelegate<QueryT>
> = (
    //Exprs must have usedColumns be subset of queryRef
    ToNeverIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<OrderByDelegateT>, string>] : (
            ReturnType<OrderByDelegateT>[index] extends RawOrder ?
            (
                OrderUtil.ExtractExpr<
                    ReturnType<OrderByDelegateT>[index]
                > extends never ?
                never :
                (
                    ColumnUtil.AssertValidUsed<
                        OrderUtil.ExtractExpr<
                            ReturnType<OrderByDelegateT>[index]
                        >["usedColumns"][number],
                        //Weird that this needs to be wrapped in Extract<>
                        Extract<ColumnUtil.FromQuery<QueryT>, IColumn>
                    > extends never ?
                    never :
                    [
                        "Invalid IExpr",
                        index,
                        ColumnUtil.AssertValidUsed<
                            OrderUtil.ExtractExpr<
                                ReturnType<OrderByDelegateT>[index]
                            >["usedColumns"][number],
                            //Weird that this needs to be wrapped in Extract<>
                            Extract<ColumnUtil.FromQuery<QueryT>, IColumn>
                        >
                    ]
                )
            ) :
            never
        )
    }> |
    //Columns used must exist in queryRef
    ToNeverIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<OrderByDelegateT>, string>] : (
            ReturnType<OrderByDelegateT>[index] extends RawOrder ?
            (
                OrderUtil.ExtractColumn<
                    ReturnType<OrderByDelegateT>[index]
                > extends ColumnUtil.FromColumnRef<
                    ColumnRefUtil.FromQuery<QueryT>
                > ?
                never :
                [
                    "Invalid IColumn",
                    index,
                    Exclude<
                        OrderUtil.ExtractColumn<
                            ReturnType<OrderByDelegateT>[index]
                        >,
                        ColumnUtil.FromColumnRef<
                            ColumnRefUtil.FromQuery<QueryT>
                        >
                    >
                ]
            ) :
            never
        )
    }>
);
//https://github.com/Microsoft/TypeScript/issues/29133
export type AssertValidOrderByDelegate_Hack<
    QueryT extends AfterFromClause,
    OrderByDelegateT extends OrderByDelegate<QueryT>,
    ResultT
> = (
    AssertValidOrderByDelegate_HackImpl<
        QueryT,
        OrderByDelegateT
    > extends never ?
    ResultT :
    AssertValidOrderByDelegate_HackImpl<
        QueryT,
        OrderByDelegateT
    >|void
);

export type OrderByResult<
    QueryT extends AfterFromClause,
    OrderByDelegateT extends OrderByDelegate<QueryT>
> = (
    AssertValidOrderByDelegate_Hack<
        QueryT,
        OrderByDelegateT,
        OrderBy<QueryT>
    >
);

//Must be called after `FROM`, because there's little point
//in ordering one row
export function orderBy<
    QueryT extends AfterFromClause,
    OrderByDelegateT extends OrderByDelegate<QueryT>
> (
    query : QueryT,
    delegate : OrderByDelegateT
) : OrderByResult<QueryT, OrderByDelegateT> {
    if (query._joins == undefined) {
        throw new Error(`Cannot use ORDER BY before FROM clause`);
    }
    const queryRef = ColumnRefUtil.fromQuery(query);
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
            ColumnRefUtil.assertHasColumnIdentifiers(
                queryRef,
                orderExpr.usedColumns
            );
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

        _limit,

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate,
    } = query;
    const result : OrderBy<QueryT> = new Query(
        {
            _distinct,
            _sqlCalcFoundRows,

            _joins,
            _parentJoins,
            _selects,
            _where,

            _grouped,
            _having,

            _orders : (
                query._orders == undefined ?
                orders :
                [...query._orders, ...orders]
            ),
            _limit,

            _unions,
            _unionOrders,
            _unionLimit,

            _mapDelegate
        }
    );
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
    .orderBy(c => [
        c.z.desc()
    ])
    .having(rnse);
o.from(table)
    .orderBy(() => [xDesc, nse.desc()])
    .having(rnse);
o.from(table)
    .orderBy((_c) => [xDesc, nse.desc()])
    .having(rnse);

const table2 = o.table("test2", {
    x : o.bigint(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse2 = o.nullSafeEq(table.columns.x, table2.columns.x);
o.from(table)
    .orderBy((_c) => [xDesc, nse2.desc()])
    .having(rnse);

const table3 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse3 = o.nullSafeEq(table.columns.x, table3.columns.x);
o.from(table)
    .orderBy((_c) => [xDesc, nse3.desc()])
    .having(rnse);

const table4 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse4 = o.nullSafeEq(table.columns.y, table4.columns.y);
o.from(table)
    .orderBy((_c) => [xDesc, nse4.desc()])
    .having(rnse);

const table5 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse5 = o.eq(table5.columns.y, "test");
o.from(table)
    .orderBy((_c) => [xDesc, nse5.desc()])
    .having(rnse);
*/