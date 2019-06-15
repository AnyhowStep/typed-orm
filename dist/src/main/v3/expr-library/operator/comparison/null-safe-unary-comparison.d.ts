import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { PrimitiveExpr } from "../../../primitive-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare type NullSafeUnaryComparison = (<RawExprT extends RawExpr<PrimitiveExpr>>(rawExpr: RawExprT) => (Expr<{
    usedRef: RawExprUtil.UsedRef<RawExprT>;
    assertDelegate: sd.SafeMapper<boolean>;
}>));
export declare function nullSafeUnaryComparison(postFixOperator: string): NullSafeUnaryComparison;
