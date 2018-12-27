import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr, ExprUtil} from "../../../expr";
import {Parentheses} from "../../../query-tree";
import * as constant from "../../constant";
import * as dataType from "../../../data-type";

export function not<RawExprT extends RawExpr<boolean>> (
    rawExpr : RawExprT
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    if (rawExpr === true) {
        //NOT TRUE === FALSE
        return constant.falseLiteral() as any;
    }
    if (rawExpr === false) {
        //NOT FALSE === TRUE
        return constant.trueLiteral() as any;
    }

    if (ExprUtil.isExpr(rawExpr)) {
        if (rawExpr.queryTree instanceof Parentheses) {
            const tree = rawExpr.queryTree.getTree();
            if (tree instanceof Array && tree.length == 2) {
                if (tree[0] === "NOT") {
                    //NOT (NOT (expr)) === expr
                    return new Expr(
                        {
                            usedRef : RawExprUtil.usedRef(rawExpr),
                            assertDelegate : dataType.boolean(),
                        },
                        tree[1]
                    );
                }

            }
        } else if (rawExpr.queryTree == RawExprUtil.queryTree(true)) {
            //NOT TRUE === FALSE
            return constant.falseLiteral() as any;
        } else if (rawExpr.queryTree == RawExprUtil.queryTree(false)) {
            //NOT FALSE === TRUE
            return constant.trueLiteral() as any;
        }
    }
    return new Expr(
        {
            usedRef : RawExprUtil.usedRef(rawExpr),
            assertDelegate : dataType.boolean(),
        },
        [
            "NOT",
            RawExprUtil.queryTree(rawExpr)
        ]
    );
}