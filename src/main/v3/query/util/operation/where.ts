import {Query} from "../../query";
import {AfterFromClause} from "../predicate";
import {ColumnRefUtil} from "../../../column-ref";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {ExprUtil} from "../../../expr";
import {ColumnUtil} from "../../../column";

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
                    ColumnUtil.FromColumnRef<
                        RawExprUtil.UsedRef<ReturnType<WhereDelegateT>>
                    >,
                    ColumnUtil.FromColumnRef<
                        ColumnRefUtil.FromQuery<QueryT>
                    >
                >
            ]|void
        )
    )
) : /*TODO Implement actual return type*/Query<QueryT> {
    const queryRef = ColumnRefUtil.fromQuery(query);
    const rawExpr = delegate(
        ColumnRefUtil.toConvenient(queryRef),
        query
    );
    const expr = ExprUtil.fromRawExpr(rawExpr);

    ColumnRefUtil.assertIsSubset(expr.usedRef, queryRef);

    return new Query(
        {
            ...query,
            //TODO This should be (query._where AND expr)
            where : expr
        }
    );
}