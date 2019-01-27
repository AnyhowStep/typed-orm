import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { NonNullPrimitiveExpr } from "../../../primitive-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare type UnaryComparison = (<RawExprT extends RawExpr<NonNullPrimitiveExpr>>(rawExpr: RawExprT) => (Expr<{
    usedColumns: RawExprUtil.UsedColumns<RawExprT>;
    assertDelegate: sd.AssertDelegate<boolean>;
}>));
export declare function unaryComparison(postFixOperator: string): UnaryComparison;
