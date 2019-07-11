import * as sd from "type-mapping";
import {RawExpr, RawExprUtil} from "../../../../raw-expr";
import {Expr, ExprUtil} from "../../../../expr";
import {Parentheses, QueryTreeArray} from "../../../../query-tree";
import * as dataType from "../../../../data-type";
import {castAsSignedInteger} from "../../../function";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_plus
function tryGetAddQueryTree (rawExpr : RawExpr<bigint>) : QueryTreeArray|undefined {
    if (ExprUtil.isExpr(rawExpr)) {
        if (rawExpr.queryTree instanceof Parentheses) {
            const tree = rawExpr.queryTree.getTree();
            if (tree instanceof Array) {
                if (tree.length == 0) {
                    //This shouldn't happen, in general...
                    return [];
                }
                for (let i=1; i<tree.length; i+=2) {
                    if (tree[i] !== "+") {
                        return undefined;
                    }
                }
                return tree;
            }
        }
    }
    return undefined;
}
export function bigIntAdd<ArrT extends RawExpr<bigint>[]> (
    ...arr : ArrT
) : (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<ArrT>,
        assertDelegate : sd.SafeMapper<bigint>,
    }>
) {
    const usedRef = RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree : QueryTreeArray = [];

    for (let rawExpr of arr) {
        const addQueryTree = tryGetAddQueryTree(rawExpr);
        if (addQueryTree != undefined) {
            if (addQueryTree.length == 0) {
                continue;
            } else {
                if (queryTree.length > 0) {
                    queryTree.push("+");
                }
                queryTree.push(...addQueryTree);
            }
        } else {
            if (queryTree.length > 0) {
                queryTree.push("+");
            }
            queryTree.push(RawExprUtil.queryTree(rawExpr));
        }
    }
    if (queryTree.length == 0) {
        //By convention, adding zero numbers is zero.
        return new Expr(
            {
                usedRef : usedRef,
                assertDelegate : dataType.bigint(),
            },
            RawExprUtil.queryTree(0)
        );
    } else {
        return new Expr(
            {
                usedRef : usedRef,
                assertDelegate : dataType.bigint(),
            },
            queryTree
        );
    }
}
/**
 * We cannot always perform integer addition naively in SQL.
 *
 * Error #1690 - BIGINT UNSIGNED value is out of range
 * ```sql
 * SELECT CAST(1 AS UNSIGNED INTEGER) + CAST(-2 AS SIGNED INTEGER)
 * ```
 *
 * -----
 *
 * If either `x` or `y` are `UNSIGNED`,
 * we need to cast both to `SIGNED` before performing addition,
 * if we want to allow negative numbers.
 *
 * ```sql
 * SELECT CAST(x AS SIGNED INTEGER) + CAST(y AS SIGNED INTEGER)
 * ```
 *
 * @param arr
 */
export function bigIntAddAsSignedInteger<ArrT extends RawExpr<bigint>[]> (
    ...arr : ArrT
) : (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<ArrT>,
        assertDelegate : sd.SafeMapper<bigint>,
    }>
) {
    return bigIntAdd(
        ...arr.map(x => castAsSignedInteger(x))
    ) as Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<ArrT>,
        assertDelegate : sd.SafeMapper<bigint>,
    }>;
}