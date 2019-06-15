import * as sd from "type-mapping";
import {Expr} from "../../../../expr";
import {RawExpr} from "../../../../raw-expr";
import {RawExprUtil} from "../../../../raw-expr";
import {ColumnRefUtil} from "../../../../column-ref";
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
        usedRef : ColumnRefUtil.Intersect<
            RawExprUtil.UsedRef<RawExprT>,
            RawExprUtil.UsedRef<PatternT>
        >,
        assertDelegate : sd.SafeMapper<boolean>,
    }> &
    {
        escape : (escapeChar : string) => (
            Expr<{
                usedRef : ColumnRefUtil.Intersect<
                    RawExprUtil.UsedRef<RawExprT>,
                    RawExprUtil.UsedRef<PatternT>
                >,
                assertDelegate : sd.SafeMapper<boolean>,
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
            assertDelegate : dataType.boolean(),
        },
        [
            RawExprUtil.queryTree(rawExpr),
            "LIKE",
            RawExprUtil.queryTree(pattern),
        ]
    );
    (result as any).escape = (escapeChar : string) => {
        escapeChar = sd.mysql.varChar(0, 1)("escapeChar", escapeChar);
        return new Expr(
            {
                usedRef : ColumnRefUtil.intersect(
                    RawExprUtil.usedRef(rawExpr),
                    RawExprUtil.usedRef(pattern)
                ),
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