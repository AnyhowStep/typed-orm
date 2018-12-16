import {Query} from "../../query";
import {AfterFromClause} from "../predicate";
import {ColumnRefUtil} from "../../../column-ref";
import {IExpr, ExprUtil} from "../../../expr";
import {ColumnUtil} from "../../../column";
import {NonEmptyTuple} from "../../../tuple";
import {RawOrder, Order, OrderUtil} from "../../../order";
import {ToUnknownIfAllFieldsNever} from "../../../type";

export type OrderByDelegate<
    QueryT extends AfterFromClause
> = (
    (
        columns : ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuery<QueryT>>,
        query : QueryT,
    ) => NonEmptyTuple<RawOrder>
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

export type AssertValidOrderByDelegate<
    QueryT extends AfterFromClause,
    OrderByDelegateT extends OrderByDelegate<QueryT>
> = (
    OrderByDelegateT &
    //Exprs must have usedRef be subset of queryRef
    ToUnknownIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<OrderByDelegateT>, string>] : (
            ReturnType<OrderByDelegateT>[index] extends RawOrder ?
            (
                OrderUtil.ExtractExpr<
                    ReturnType<OrderByDelegateT>[index]
                > extends IExpr ?
                (
                    ColumnRefUtil.FromQueryJoins<QueryT> extends OrderUtil.ExtractExpr<
                        ReturnType<OrderByDelegateT>[index]
                    >["usedRef"] ?
                    never :
                    [
                        "Invalid IExpr",
                        Exclude<
                            ColumnUtil.FromColumnRef<
                                OrderUtil.ExtractExpr<ReturnType<OrderByDelegateT>[index]>["usedRef"]
                            >,
                            ColumnUtil.FromColumnRef<
                                ColumnRefUtil.FromQueryJoins<QueryT>
                            >
                        >
                    ]
                ) :
                never
            ) :
            never
        )
    }> &
    //Columns used must exist in queryRef
    ToUnknownIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<OrderByDelegateT>, string>] : (
            ReturnType<OrderByDelegateT>[index] extends RawOrder ?
            (
                OrderUtil.ExtractColumn<
                    ReturnType<OrderByDelegateT>[index]
                > extends ColumnUtil.FromColumnRef<
                    ColumnRefUtil.FromQueryJoins<QueryT>
                > ?
                never :
                [
                    "Invalid IColumn",
                    Exclude<
                        OrderUtil.ExtractColumn<
                            ReturnType<OrderByDelegateT>[index]
                        >,
                        ColumnUtil.FromColumnRef<
                            ColumnRefUtil.FromQueryJoins<QueryT>
                        >
                    >
                ]
            ) :
            never
        )
    }>
);

//Must be called after `FROM`, because there's little point
//in ordering one row
export function orderBy<
    QueryT extends AfterFromClause,
    OrderByDelegateT extends OrderByDelegate<QueryT>
> (
    query : QueryT,
    delegate : AssertValidOrderByDelegate<QueryT, OrderByDelegateT>
) : OrderBy<QueryT> {
    if (query._joins == undefined) {
        throw new Error(`Cannot use ORDER BY before FROM clause`);
    }
    const queryRef = ColumnRefUtil.fromQuery(query);
    const rawOrders = delegate(
        ColumnRefUtil.toConvenient(queryRef),
        query
    );
    const orders = OrderUtil.Array.fromRawOrderArray(rawOrders);

    for (let order of orders) {
        const orderExpr = order[0];
        if (ColumnUtil.isColumn(orderExpr)) {
            ColumnRefUtil.assertHasColumnIdentifier(queryRef, orderExpr);
        } else if (ExprUtil.isExpr(orderExpr)) {
            ColumnRefUtil.assertIsSubset(orderExpr.usedRef, queryRef);
        }
    }

    return new Query(
        {
            ...query,
            _orders : (
                query._orders == undefined ?
                orders :
                [...query._orders, ...orders]
            )
        }
    );
}