/// <reference types="node" />
export declare type PrimitiveExpr = bigint | number | string | boolean | Date | Buffer | null;
export declare type NonNullPrimitiveExpr = Exclude<PrimitiveExpr, null>;
export declare namespace PrimitiveExprUtil {
    function isPrimitiveExprArray(raw: unknown): raw is PrimitiveExpr[];
    function isPrimitiveExpr(raw: unknown): raw is PrimitiveExpr;
    function isNonNullPrimitiveExprArray(raw: unknown): raw is NonNullPrimitiveExpr[];
    function isNonNullPrimitiveExpr(raw: unknown): raw is NonNullPrimitiveExpr;
    function isEqual(a: PrimitiveExpr, b: PrimitiveExpr): boolean;
}
//# sourceMappingURL=primitive-expr.d.ts.map