import * as sd from "type-mapping";
import { Expr } from "../../../../expr";
import { RawExpr } from "../../../../raw-expr";
import { RawExprUtil } from "../../../../raw-expr";
import { ColumnRefUtil } from "../../../../column-ref";
export declare function like<RawExprT extends RawExpr<string>, PatternT extends RawExpr<string>>(rawExpr: RawExprT, pattern: PatternT): (Expr<{
    usedRef: ColumnRefUtil.Intersect<RawExprUtil.UsedRef<RawExprT>, RawExprUtil.UsedRef<PatternT>>;
    assertDelegate: sd.SafeMapper<boolean>;
}> & {
    escape: (escapeChar: string) => (Expr<{
        usedRef: ColumnRefUtil.Intersect<RawExprUtil.UsedRef<RawExprT>, RawExprUtil.UsedRef<PatternT>>;
        assertDelegate: sd.SafeMapper<boolean>;
    }>);
});
