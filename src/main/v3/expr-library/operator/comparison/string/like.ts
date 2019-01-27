import * as sd from "schema-decorator";
import {Expr} from "../../../../expr";
import {RawExpr} from "../../../../raw-expr";
import {RawExprUtil} from "../../../../raw-expr";
import * as dataType from "../../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#operator_like
export function like<
    RawExprT extends RawExpr<string>,
    PatternT extends RawExpr<string>
>(
    rawExpr : RawExprT,
    pattern : PatternT
) : (
    Expr<{
        usedColumns : (
            RawExprUtil.UsedColumns<RawExprT>[number] |
            RawExprUtil.UsedColumns<PatternT>[number]
        )[],
        assertDelegate : sd.AssertDelegate<boolean>,
    }> &
    {
        escape : (escapeChar : string) => (
            Expr<{
                usedColumns : (
                    RawExprUtil.UsedColumns<RawExprT>[number] |
                    RawExprUtil.UsedColumns<PatternT>[number]
                )[],
                assertDelegate : sd.AssertDelegate<boolean>,
            }>
        )
    }
) {
    const result = new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns([
                rawExpr,
                pattern,
            ]),
            assertDelegate : dataType.boolean(),
        },
        [
            RawExprUtil.queryTree(rawExpr),
            "LIKE",
            RawExprUtil.queryTree(pattern),
        ]
    );
    (result as any).escape = (escapeChar : string) => {
        escapeChar = sd.varChar(0, 1)("escapeChar", escapeChar);
        return new Expr(
            {
                usedColumns : RawExprUtil.Array.usedColumns([
                    rawExpr,
                    pattern,
                ]),
                assertDelegate : dataType.boolean(),
            },
            [
                RawExprUtil.queryTree(rawExpr),
                "LIKE",
                RawExprUtil.queryTree(pattern),
                "ESCAPE",
                RawExprUtil.queryTree(escapeChar)
            ]
        );
    };
    return result as any;
}