import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { PrimitiveExpr } from "../../../primitive-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare type NullSafeUnaryComparison = (<RawExprT extends RawExpr<PrimitiveExpr>>(rawExpr: RawExprT) => (Expr<{
    usedRef: RawExprUtil.UsedRef<RawExprT>;
    assertDelegate: sd.AssertDelegate<boolean>;
}>));
export declare function nullSafeUnaryComparison(postFixOperator: string): NullSafeUnaryComparison;
