import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr, ExprData} from "../../../expr";
import {QueryTree, Parentheses} from "../../../query-tree";
import * as constant from "../../constant";

class NotExpr<DataT extends Pick<ExprData, "usedRef">> extends Expr<{
    usedRef : DataT["usedRef"],
    assertDelegate : sd.AssertDelegate<boolean>,
}> {
    constructor (
        data : DataT,
        queryTree : QueryTree
    ) {
        super(
            {
                usedRef : data.usedRef,
                assertDelegate : sd.numberToBoolean()
            },
            queryTree
        );
    }
}
export function not<RawExprT extends RawExpr<boolean>> (
    rawExpr : RawExprT
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    if (rawExpr instanceof NotExpr) {
        //NOT (NOT (expr)) === expr
        if (rawExpr.queryTree instanceof Parentheses) {
            const tree = rawExpr.queryTree.getTree();
            if (tree instanceof Array && tree.length == 2) {
                return new Expr(
                    {
                        usedRef : rawExpr.usedRef,
                        assertDelegate : rawExpr.assertDelegate,
                    },
                    tree[1]
                );
            }
        }
    } else if (rawExpr === true) {
        //NOT TRUE === FALSE
        return constant.false as any;
    } else if (rawExpr === false) {
        //NOT FALSE === TRUE
        return constant.true as any;
    } else if (rawExpr instanceof Expr) {
        if (rawExpr.queryTree == RawExprUtil.queryTree(true)) {
            //NOT TRUE === FALSE
            return constant.false as any;
        } else if (rawExpr.queryTree == RawExprUtil.queryTree(false)) {
            //NOT FALSE === TRUE
            return constant.true as any;
        }
    }
    return new NotExpr(
        {
            usedRef : RawExprUtil.usedRef(rawExpr),
        },
        [
            "NOT",
            RawExprUtil.queryTree(rawExpr)
        ]
    );
}