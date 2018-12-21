import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {TranscodingName} from "../../constant";
import { FunctionCall } from "../../../query-tree";

export function convert<
    RawExprT extends RawExpr<string>
>(
    rawExpr : RawExprT,
    transcodingName : TranscodingName
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        assertDelegate : sd.AssertDelegate<string>,
    }>
) {
    //Defend ourself against invalid values during run-time.
    sd.enumeration(TranscodingName)("transcodingName", transcodingName);
    return new Expr(
        {
            usedRef : RawExprUtil.usedRef(rawExpr),
            assertDelegate : sd.string(),
        },
        new FunctionCall("CONVERT", [
            [
                RawExprUtil.queryTree(rawExpr),
                "USING",
                transcodingName
            ]
        ])
    );
}