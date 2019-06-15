import * as sd from "type-mapping";
import { Expr } from "../../../../expr";
import { RawExpr } from "../../../../raw-expr";
import { RawExprUtil } from "../../../../raw-expr";
import { ColumnRefUtil } from "../../../../column-ref";
export declare function strCmp<LeftT extends RawExpr<string>, RightT extends RawExpr<string>>(left: LeftT, right: RightT): (Expr<{
    usedRef: ColumnRefUtil.Intersect<RawExprUtil.UsedRef<LeftT>, RawExprUtil.UsedRef<RightT>>;
    assertDelegate: sd.SafeMapper<0 | 1 | -1>;
}>);
