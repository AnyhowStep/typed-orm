import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare function findInSet<NeedleT extends RawExpr<string>, SetT extends RawExpr<string>>(needle: NeedleT, set: SetT): (Expr<{
    usedRef: (RawExprUtil.UsedRef<NeedleT> & RawExprUtil.UsedRef<SetT>);
    assertDelegate: sd.SafeMapper<number>;
}>);
