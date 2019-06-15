import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { PrimitiveExpr } from "../../../primitive-expr";
import { RawExprUtil } from "../../../raw-expr";
import { ColumnRefUtil } from "../../../column-ref";
export declare function nullSafeNotEq<LeftT extends RawExpr<PrimitiveExpr>, RightT extends RawExpr<RawExprUtil.TypeOf<LeftT> | null>>(left: LeftT, right: RightT): (Expr<{
    usedRef: ColumnRefUtil.Intersect<RawExprUtil.UsedRef<LeftT>, RawExprUtil.UsedRef<RightT>>;
    assertDelegate: sd.SafeMapper<boolean>;
}>);
