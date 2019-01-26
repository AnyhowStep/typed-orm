import { Expr } from "../expr";
import { RawExpr, RawExprUtil } from "../raw-expr";
import { ColumnReferencesUtil } from "../column-references";
export declare function like<StrT extends RawExpr<string>, PatternT extends RawExpr<string>>(str: StrT, pattern: PatternT): (Expr<ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<StrT>, RawExprUtil.UsedReferences<PatternT>>, boolean> & {
    escape: (escapeChar: string) => Expr<ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<StrT>, RawExprUtil.UsedReferences<PatternT>>, boolean>;
});
export declare function likeUnsafe<StrT extends RawExpr<string | null>, PatternT extends RawExpr<string | null>>(str: StrT, pattern: PatternT): (Expr<ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<StrT>, RawExprUtil.UsedReferences<PatternT>>, null | boolean> & {
    escape: (escapeChar: string) => Expr<ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<StrT>, RawExprUtil.UsedReferences<PatternT>>, null | boolean>;
});
export declare function escapeLikePattern(pattern: string, escapeChar?: string): string;
//# sourceMappingURL=like.d.ts.map