import * as sd from "schema-decorator";
import {Expr} from "../../../../expr";
import {RawExpr} from "../../../../raw-expr";
import {RawExprUtil} from "../../../../raw-expr";
import {ColumnRefUtil} from "../../../../column-ref";

export function like<
    RawExprT extends RawExpr<string>,
    PatternT extends RawExpr<string>
>(
    rawExpr : RawExprT,
    pattern : PatternT
) : (
    Expr<{
        usedRef : ColumnRefUtil.Intersect<
            RawExprUtil.UsedRef<RawExprT>,
            RawExprUtil.UsedRef<PatternT>
        >,
        assertDelegate : sd.AssertDelegate<boolean>,
    }> &
    {
        escape : (escapeChar : string) => (
            Expr<{
                usedRef : ColumnRefUtil.Intersect<
                    RawExprUtil.UsedRef<RawExprT>,
                    RawExprUtil.UsedRef<PatternT>
                >,
                assertDelegate : sd.AssertDelegate<boolean>,
            }>
        )
    }
) {
    const result = new Expr(
        {
            usedRef : ColumnRefUtil.intersect(
                RawExprUtil.usedRef(rawExpr),
                RawExprUtil.usedRef(pattern)
            ),
            assertDelegate : sd.numberToBoolean(),
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
                usedRef : ColumnRefUtil.intersect(
                    RawExprUtil.usedRef(rawExpr),
                    RawExprUtil.usedRef(pattern)
                ),
                assertDelegate : sd.numberToBoolean(),
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