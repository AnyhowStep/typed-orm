import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr} from "../../../expr";
import * as dataType from "../../../data-type";

export function xor<
    LeftT extends RawExpr<boolean>,
    RightT extends RawExpr<boolean>
> (
    left : LeftT,
    right : RightT
) : (
    Expr<{
        usedColumns : (
            RawExprUtil.UsedColumns<LeftT>[number] |
            RawExprUtil.UsedColumns<RightT>[number]
        )[],
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    return new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns([
                left,
                right,
            ]),
            assertDelegate : dataType.boolean(),
        },
        [
            RawExprUtil.queryTree(left),
            "XOR",
            RawExprUtil.queryTree(right),
        ]
    );
}