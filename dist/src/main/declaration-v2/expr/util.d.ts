import { Expr, AnyExpr } from "./expr";
export declare namespace ExprUtil {
    function dangerouslyHideUsedReferences<ExprT extends AnyExpr>(expr: ExprT): Expr<{}, ReturnType<ExprT["assertDelegate"]>>;
}
//# sourceMappingURL=util.d.ts.map