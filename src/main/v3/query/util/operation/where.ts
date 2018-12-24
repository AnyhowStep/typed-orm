import {Query} from "../../query";
import {AfterFromClause} from "../predicate";
import {ColumnRefUtil} from "../../../column-ref";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {ExprUtil} from "../../../expr";
import {ColumnUtil} from "../../../column";
import {IAnonymousTypedExpr} from "../../../expr";
import {and} from "../../../expr-library";

export type WhereDelegate<
    QueryT extends AfterFromClause
> = (
    (
        columns : ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQueryJoins<QueryT>>,
        query : QueryT,
    ) => RawExpr<boolean>
);

export type Where<
    QueryT extends AfterFromClause
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : QueryT["_joins"],
        readonly _parentJoins : QueryT["_parentJoins"],
        readonly _selects : QueryT["_selects"],
        //TODO-DEBATE See if this needs to be more strongly typed
        readonly _where : IAnonymousTypedExpr<boolean>,

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

export type AssertValidWhereDelegate<
    QueryT extends AfterFromClause,
    WhereDelegateT extends WhereDelegate<QueryT>
> = (
    WhereDelegateT &
    (
        ColumnRefUtil.FromQueryJoins<QueryT> extends RawExprUtil.UsedRef<ReturnType<WhereDelegateT>> ?
        unknown :
        [
            "WHERE expression contains some invalid columns; the following are not allowed:",
            Exclude<
                ColumnUtil.FromColumnRef<
                    RawExprUtil.UsedRef<ReturnType<WhereDelegateT>>
                >,
                ColumnUtil.FromColumnRef<
                    ColumnRefUtil.FromQueryJoins<QueryT>
                >
            >
        ]
    )
);

//Must be called after `FROM` as per MySQL
export function where<
    QueryT extends AfterFromClause,
    WhereDelegateT extends WhereDelegate<QueryT>
> (
    query : QueryT,
    delegate : AssertValidWhereDelegate<QueryT, WhereDelegateT>
) : Where<QueryT> {
    if (query._joins == undefined) {
        throw new Error(`Cannot use WHERE before FROM clause`);
    }
    const queryRef = ColumnRefUtil.fromQueryJoins(query);
    const rawExpr : ReturnType<WhereDelegateT> = delegate(
        ColumnRefUtil.toConvenient(queryRef),
        query
    ) as ReturnType<WhereDelegateT>;
    const expr = ExprUtil.fromRawExpr(rawExpr);

    ColumnRefUtil.assertIsSubset(expr.usedRef, queryRef);

    const {
        _distinct,
        _sqlCalcFoundRows,

        _joins,
        _parentJoins,
        _selects,

        _grouped,
        _having,

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
            _where : (
                query._where == undefined ?
                expr :
                and(query._where, expr)
            ) as IAnonymousTypedExpr<boolean>,

            _grouped,
            _having,

            _orders,
            _limit,

            _unions,
            _unionOrders,
            _unionLimit,

            _mapDelegate,
        }
    ) as Where<QueryT>;
}