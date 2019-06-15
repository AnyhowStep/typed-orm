import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { NonNullPrimitiveExpr } from "../../../primitive-expr";
import { RawExprUtil } from "../../../raw-expr";
import { ColumnRefUtil } from "../../../column-ref";
export declare type Comparison = (<LeftT extends RawExpr<NonNullPrimitiveExpr>, RightT extends RawExpr<RawExprUtil.TypeOf<LeftT>>>(left: LeftT, right: RightT) => (Expr<{
    usedRef: ColumnRefUtil.Intersect<RawExprUtil.UsedRef<LeftT>, RawExprUtil.UsedRef<RightT>>;
    assertDelegate: sd.SafeMapper<boolean>;
}>));
export declare function comparison(operator: string): Comparison;
