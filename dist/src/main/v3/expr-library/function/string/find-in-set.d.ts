import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare function findInSet<NeedleT extends RawExpr<string>, SetT extends RawExpr<string>>(needle: NeedleT, set: SetT): (Expr<{
    usedRef: (RawExprUtil.UsedRef<NeedleT> & RawExprUtil.UsedRef<SetT>);
    assertDelegate: sd.AssertDelegate<number>;
}>);
