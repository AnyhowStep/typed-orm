import {Query} from "../../query";
import {AfterFromClause} from "../predicate";
import {ColumnRefUtil} from "../../../column-ref";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {ExprUtil} from "../../../expr";
import {ColumnUtil} from "../../../column";
import {IAnonymousTypedExpr} from "../../../expr";
import {and} from "../../../expr-library";

export type AndHavingDelegate<
    QueryT extends AfterFromClause
> = (
    (
        columns : ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuery<QueryT>>,
        query : QueryT,
    ) => RawExpr<boolean>
);

export type AndHaving<
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
        //TODO See if this needs to be more strongly typed
        readonly _having : IAnonymousTypedExpr<boolean>,

        readonly _orders : QueryT["_orders"],
        readonly _limit : QueryT["_limit"],

        readonly _unions : QueryT["_unions"],
        readonly _unionOrders : QueryT["_unionOrders"],
        readonly _unionLimit : QueryT["_unionLimit"],

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);

export type AssertValidAndHavingDelegate<
    QueryT extends AfterFromClause,
    AndHavingDelegateT extends AndHavingDelegate<QueryT>
> = (
    AndHavingDelegateT &
    (
        //TODO Safer to convert both to union of columns and check if used columns extends query columns
        //I think
        ColumnRefUtil.FromQuery<QueryT> extends RawExprUtil.UsedRef<ReturnType<AndHavingDelegateT>> ?
        unknown :
        [
            "HAVING expression contains some invalid columns; the following are not allowed:",
            Exclude<
                ColumnUtil.FromColumnRef<
                    RawExprUtil.UsedRef<ReturnType<AndHavingDelegateT>>
                >,
                ColumnUtil.FromColumnRef<
                    ColumnRefUtil.FromQuery<QueryT>
                >
            >
        ]
    )
);

//Must be called after `FROM` as per MySQL
export function andHaving<
    QueryT extends AfterFromClause,
    AndHavingDelegateT extends AndHavingDelegate<QueryT>
> (
    query : QueryT,
    delegate : AssertValidAndHavingDelegate<QueryT, AndHavingDelegateT>
) : AndHaving<QueryT> {
    if (query._joins == undefined) {
        throw new Error(`Cannot use HAVING before FROM clause`);
    }
    const queryRef = ColumnRefUtil.fromQuery(query);
    const rawExpr = delegate(
        ColumnRefUtil.toConvenient(queryRef),
        query
    ) as ReturnType<AndHavingDelegateT>;
    const expr = ExprUtil.fromRawExpr(rawExpr);

    ColumnRefUtil.assertIsSubset(expr.usedRef, queryRef);

    const {
        _distinct,
        _sqlCalcFoundRows,

        _joins,
        _parentJoins,
        _selects,
        _where,

        _grouped,

        _orders,
        _limit,

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate,
    } = query;

    return new Query(
        {
            _distinct,
            _sqlCalcFoundRows,

            _joins,
            _parentJoins,
            _selects,
            _where,

            _grouped,
            _having : (
                query._having == undefined ?
                expr :
                and(query._having, expr)
            ) as IAnonymousTypedExpr<boolean>,

            _orders,
            _limit,

            _unions,
            _unionOrders,
            _unionLimit,

            _mapDelegate,
        }
    ) as AndHaving<QueryT>;
}