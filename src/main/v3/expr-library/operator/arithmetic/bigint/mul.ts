import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../../raw-expr";
import {Expr, ExprUtil} from "../../../../expr";
import {Parentheses, QueryTreeArray} from "../../../../query-tree";
import * as dataType from "../../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_times
function tryGetMulQueryTree (rawExpr : RawExpr<bigint>) : QueryTreeArray|undefined {
    if (ExprUtil.isExpr(rawExpr)) {
        if (rawExpr.queryTree instanceof Parentheses) {
            const tree = rawExpr.queryTree.getTree();
            if (tree instanceof Array) {
                if (tree.length == 0) {
                    //This shouldn't happen, in general...
                    return [];
                }
                for (let i=1; i<tree.length; i+=2) {
                    if (tree[i] !== "*") {
                        return undefined;
                    }
                }
                return tree;
            }
        }
    }
    return undefined;
}
export function bigIntMul<ArrT extends RawExpr<bigint>[]> (
    ...arr : ArrT
) : (
    Expr<{
        usedColumns : RawExprUtil.Array.UsedColumns<ArrT>,
        assertDelegate : sd.AssertDelegate<bigint>,
    }>
) {
    const usedColumns = RawExprUtil.Array.usedColumns(arr);
    const queryTree : QueryTreeArray = [];

    for (let rawExpr of arr) {
        const mulQueryTree = tryGetMulQueryTree(rawExpr);
        if (mulQueryTree != undefined) {
            if (mulQueryTree.length == 0) {
                continue;
            } else {
                if (queryTree.length > 0) {
                    queryTree.push("*");
                }
                queryTree.push(...mulQueryTree);
            }
        } else {
            if (queryTree.length > 0) {
                queryTree.push("*");
            }
            queryTree.push(RawExprUtil.queryTree(rawExpr));
        }
    }
    if (queryTree.length == 0) {
        //By convention, multiplying zero numbers is one.
        return new Expr(
            {
                usedColumns,
                assertDelegate : dataType.bigint(),
            },
            RawExprUtil.queryTree(1)
        );
    } else {
        return new Expr(
            {
                usedColumns,
                assertDelegate : dataType.bigint(),
            },
            queryTree
        );
    }
}