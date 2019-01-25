import * as sd from "schema-decorator";
import { Expr } from "../../../../expr";
import { RawExpr } from "../../../../raw-expr";
import { RawExprUtil } from "../../../../raw-expr";
import { ColumnRefUtil } from "../../../../column-ref";
export declare function strCmp<LeftT extends RawExpr<string>, RightT extends RawExpr<string>>(left: LeftT, right: RightT): (Expr<{
    usedRef: ColumnRefUtil.Intersect<RawExprUtil.UsedRef<LeftT>, RawExprUtil.UsedRef<RightT>>;
    assertDelegate: sd.AssertDelegate<0 | 1 | -1>;
}>);
