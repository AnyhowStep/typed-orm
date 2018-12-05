import {Query} from "../../query";
import {AfterFromClause} from "../predicate";
import {ColumnRefUtil} from "../../../column-ref";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr} from "../../../expr";

export type WhereDelegate<
    QueryT extends AfterFromClause
> = (
    (
        columns : ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuery<QueryT>>,
        query : QueryT,
    ) => RawExpr<boolean>
);

//Must be called after `FROM` as per MySQL
export function where<
    QueryT extends AfterFromClause,
    WhereDelegateT extends WhereDelegate<QueryT>
> (
    query : QueryT,
    delegate : (
        WhereDelegateT &
        (
            ColumnRefUtil.FromQuery<QueryT> extends RawExprUtil.UsedRef<ReturnType<WhereDelegateT>> ?
            unknown :
            [
                "WHERE expression contains some invalid columns; the following are not allowed:",
                Exclude<
                    ColumnRefUtil.ToUnion<
                        RawExprUtil.UsedRef<ReturnType<WhereDelegateT>>
                    >,
                    ColumnRefUtil.ToUnion<
                        ColumnRefUtil.FromQuery<QueryT>
                    >
                >
            ]|void
        )
    )
) : Query<QueryT> {
    const queryRef = ColumnRefUtil.fromQuery(query);
    const rawExpr = delegate(
        ColumnRefUtil.toConvenient(queryRef),
        query
    );
    const expr = Expr.fromRawExpr(rawExpr);

    ColumnRefUtil.assertIsSubset(expr.usedRef, queryRef);

    return new Query(
        query,
        {
            ...query.extraData,
            where : expr,
        }
    );
}