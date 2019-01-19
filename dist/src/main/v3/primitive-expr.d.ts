/// <reference types="node" />
export declare type PrimitiveExpr = bigint | number | string | boolean | Date | Buffer | null;
export declare type NonNullPrimitiveExpr = Exclude<PrimitiveExpr, null>;
export declare namespace PrimitiveExprUtil {
    function isPrimitiveExprArray(raw: unknown): raw is PrimitiveExpr[];
    function isPrimitiveExpr(raw: unknown): raw is PrimitiveExpr;
    function isNonNullPrimitiveExprArray(raw: unknown): raw is NonNullPrimitiveExpr[];
    function isNonNullPrimitiveExpr(raw: unknown): raw is NonNullPrimitiveExpr;
    function isEqual(a: PrimitiveExpr, b: PrimitiveExpr): boolean;
    type ToNonNullableSuperType<T extends NonNullPrimitiveExpr> = (T extends bigint ? bigint : T extends number ? number : T extends string ? string : T extends boolean ? boolean : T);
    type ToSuperType<T extends PrimitiveExpr> = ((null extends T ? null : never) | ToNonNullableSuperType<Exclude<T, null>>);
}
//# sourceMappingURL=primitive-expr.d.ts.map