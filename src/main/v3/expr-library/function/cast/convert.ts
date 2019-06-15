import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {TranscodingName} from "../../constant";
import {FunctionCall} from "../../../query-tree";

export function convert<
    RawExprT extends RawExpr<string>
>(
    rawExpr : RawExprT,
    transcodingName : TranscodingName
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        assertDelegate : sd.SafeMapper<string>,
    }>
) {
    //Defend ourself against invalid values during run-time.
    sd.enumValue(TranscodingName)("transcodingName", transcodingName);
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