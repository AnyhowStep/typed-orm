import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { NonNullPrimitiveExpr } from "../../../primitive-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare type UnaryComparison = (<RawExprT extends RawExpr<NonNullPrimitiveExpr>>(rawExpr: RawExprT) => (Expr<{
    usedRef: RawExprUtil.UsedRef<RawExprT>;
    assertDelegate: sd.SafeMapper<boolean>;
}>));
export declare function unaryComparison(postFixOperator: string): UnaryComparison;
