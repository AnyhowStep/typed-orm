import * as sd from "schema-decorator";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { Expr } from "../../../expr";
import { ColumnRefUtil } from "../../../column-ref";
export declare function div<LeftT extends RawExpr<number>, RightT extends RawExpr<number>>(left: LeftT, right: RightT): (Expr<{
    usedRef: ColumnRefUtil.Intersect<RawExprUtil.UsedRef<LeftT>, RawExprUtil.UsedRef<RightT>>;
    assertDelegate: sd.AssertDelegate<number | null>;
}>);
