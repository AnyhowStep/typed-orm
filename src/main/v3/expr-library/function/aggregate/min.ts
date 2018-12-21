import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import {PrimitiveExpr} from "../../../primitive-expr";

//https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_min
export function min<RawExprT extends RawExpr<PrimitiveExpr>>(
    rawExpr : RawExprT
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        //If there are no matching rows, MIN() returns NULL.
        assertDelegate : sd.AssertDelegate<RawExprUtil.TypeOf<RawExprT>|null>,
    }>
) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.usedRef(rawExpr),
            assertDelegate : sd.nullable(RawExprUtil.assertDelegate(rawExpr)),
        },
        new FunctionCall(
            "MIN",
            [
                RawExprUtil.queryTree(rawExpr)
            ]
        )
    );
    return result;
}