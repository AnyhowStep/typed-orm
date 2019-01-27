import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr, ExprUtil} from "../../../expr";
import {Parentheses, QueryTreeArray} from "../../../query-tree";
import * as dataType from "../../../data-type";

function tryGetAndQueryTree (rawExpr : RawExpr<boolean>) : QueryTreeArray|undefined {
    const trueLiteral = RawExprUtil.queryTree(true);

    if (ExprUtil.isExpr(rawExpr)) {
        if (rawExpr.queryTree instanceof Parentheses) {
            const tree = rawExpr.queryTree.getTree();
            if (tree === trueLiteral) {
                return [];
            }

            if (tree instanceof Array) {
                if (tree.length == 0) {
                    //This shouldn't happen, in general...
                    return [];
                }
                if (tree.length == 1 && tree[0] === trueLiteral) {
                    //Makes resultant queries "tidier" if we eliminate all true constants
                    return [];
                }
                for (let i=1; i<tree.length; i+=2) {
                    if (tree[i] !== "AND") {
                        return undefined;
                    }
                }
                return tree;
            }
        } else if (rawExpr.queryTree === trueLiteral) {
            return [];
        }
    }
    return undefined;
}
export function and<ArrT extends RawExpr<boolean>[]> (
    ...arr : ArrT
) : (
    Expr<{
        usedColumns : RawExprUtil.Array.UsedColumns<ArrT>,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    const usedColumns = RawExprUtil.Array.usedColumns(arr);
    const queryTree : QueryTreeArray = [];

    for (let rawExpr of arr) {
        const andQueryTree = tryGetAndQueryTree(rawExpr);
        if (andQueryTree != undefined) {
            if (andQueryTree.length == 0) {
                continue;
            } else {
                if (queryTree.length > 0) {
                    queryTree.push("AND");
                }
                queryTree.push(...andQueryTree);
            }
        } else {
            //Makes resultant queries "tidier" if we eliminate all true constants
            if (rawExpr === true) {
                continue;
            }
            if (queryTree.length > 0) {
                queryTree.push("AND");
            }
            queryTree.push(RawExprUtil.queryTree(rawExpr));
        }
    }
    if (queryTree.length == 0) {
        return new Expr(
            {
                usedColumns,
                assertDelegate : dataType.boolean(),
            },
            RawExprUtil.queryTree(true)
        );
    } else {
        return new Expr(
            {
                usedColumns,
                assertDelegate : dataType.boolean(),
            },
            queryTree
        );
    }
}