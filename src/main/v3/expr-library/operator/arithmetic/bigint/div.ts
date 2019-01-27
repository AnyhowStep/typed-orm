import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../../raw-expr";
import {Expr} from "../../../../expr";
import * as dataType from "../../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_divide
export function bigIntDiv<
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
        //1 / 0 === NULL
        //CAST(5 AS UNSIGNED) / CAST(2 AS UNSIGNED) === 2.5
        assertDelegate : sd.AssertDelegate<number|null>,
    }>
) {
    return new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns([
                left,
                right
            ]),
            assertDelegate : sd.nullable(dataType.double()),
        },
        [
            RawExprUtil.queryTree(left),
            "/",
            RawExprUtil.queryTree(right),
        ]
    );
}