/// <reference types="node" />
export declare type PrimitiveExpr = bigint | number | string | boolean | Date | Buffer | null;
export declare type NonNullPrimitiveExpr = Exclude<PrimitiveExpr, null>;
export declare function isPrimitiveExpr(raw: unknown): raw is PrimitiveExpr;
export declare function isNonNullPrimitiveExpr(raw: unknown): raw is NonNullPrimitiveExpr;
export declare namespace PrimitiveExprUtil {
    function isEqual(a: PrimitiveExpr, b: PrimitiveExpr): boolean;
}
//# sourceMappingURL=primitive-expr.d.ts.map