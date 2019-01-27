import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../../raw-expr";
import {Expr} from "../../../../expr";
import * as dataType from "../../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_div
export function integerDiv<
    LeftT extends RawExpr<bigint>,
    RightT extends RawExpr<bigint>
> (
    left : LeftT,
    right : RightT
) : (
    Expr<{
        usedColumns : (
            RawExprUtil.UsedColumns<LeftT>[number] |
            RawExprUtil.UsedColumns<RightT>[number]
        )[],
        //1 DIV 0 === NULL
        assertDelegate : sd.AssertDelegate<bigint|null>,
    }>
) {
    return new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns([
                left,
                right
            ]),
            assertDelegate : sd.nullable(dataType.bigint()),
        },
        [
            RawExprUtil.queryTree(left),
            "DIV",
            RawExprUtil.queryTree(right),
        ]
    );
}