import {Query} from "../../query";
import {BeforeUnionClause, BeforeSelectClause} from "../predicate";
import {ColumnRefUtil} from "../../../column-ref";
import {IExpr, ExprUtil} from "../../../expr";
import {AssertValidSelectDelegateImpl, select} from "./select";

/*
    For the *VERY FIRST* item selected,
    you may choose to simply return an expression.

    This allows you to write the following queries,

    o.selectExpr(() => o.utcTimestamp())

    o.from(table)
        .selectExpr(c => o.add(c.x, c.y))

    The above queries are equivalent to,

    o.select(() => [o.utcTimestamp().as("value")])

    o.from(table)
        .select(c => [o.add(c.x, c.y).as("value")])
*/
export type SelectExprDelegate<
    QueryT extends BeforeUnionClause & BeforeSelectClause
> = (
    (
        columns : ColumnRefUtil.ToConvenient<
            ColumnRefUtil.FromQueryJoins<QueryT>
        >,
        query : QueryT
    ) => IExpr
);

export type SelectExpr<
    QueryT extends BeforeUnionClause & BeforeSelectClause,
    SelectDelegateT extends SelectExprDelegate<QueryT>
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : QueryT["_joins"],
        readonly _parentJoins : QueryT["_parentJoins"],
        readonly _selects : [
            ExprUtil.As<
                ReturnType<SelectDelegateT>,
                "value"
            >
        ],
        readonly _where : QueryT["_where"],

        readonly _grouped : QueryT["_grouped"],
        readonly _having : QueryT["_having"],

        readonly _orders : QueryT["_orders"],
        readonly _limit : QueryT["_limit"],

        readonly _unions : QueryT["_unions"],
        readonly _unionOrders : QueryT["_unionOrders"],
        readonly _unionLimit : QueryT["_unionLimit"],

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);
export type AssertValidSelectExprDelegate<
    QueryT extends BeforeUnionClause & BeforeSelectClause,
    SelectDelegateT extends SelectExprDelegate<QueryT>
> = (
    SelectDelegateT &
    AssertValidSelectDelegateImpl<
        QueryT,
        (
            columns : ColumnRefUtil.ToConvenient<
                ColumnRefUtil.FromQueryJoins<QueryT>
            >
        ) => [
            ExprUtil.As<
                ReturnType<SelectDelegateT>,
                "value"
            >
        ]
    >
);
export function selectExpr<
    QueryT extends BeforeUnionClause & BeforeSelectClause,
    SelectDelegateT extends SelectExprDelegate<QueryT>
> (
    query : QueryT,
    delegate : AssertValidSelectExprDelegate<QueryT, SelectDelegateT>
) : SelectExpr<QueryT, SelectDelegateT> {
    if (query._selects != undefined) {
        throw new Error(`Cannot select unaliased expression after SELECT clause`);
    }
    const wrappedDelegate : (
        columns : ColumnRefUtil.ToConvenient<
            ColumnRefUtil.FromQueryJoins<QueryT>
        >
    ) => [
        ExprUtil.As<
            ReturnType<SelectDelegateT>,
            "value"
        >
    ] = c => [ExprUtil.as(delegate(c, query), "value") as any];

    return select(
        query,
        wrappedDelegate as any
    ) as any; //TODO-UNHACK Not use `as any` hacks?
}