import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { NonNullPrimitiveExpr } from "../../../primitive-expr";
import { Tuple } from "../../../tuple";
export declare function notIn<LeftT extends RawExpr<NonNullPrimitiveExpr>>(left: LeftT, ...args: RawExprUtil.TypeOf<LeftT>[]): (Expr<{
    usedRef: RawExprUtil.UsedRef<LeftT>;
    assertDelegate: sd.SafeMapper<boolean>;
}>);
export declare function notIn<LeftT extends RawExpr<NonNullPrimitiveExpr>, Arg0 extends RawExpr<RawExprUtil.TypeOf<LeftT>>, Args extends Tuple<RawExpr<RawExprUtil.TypeOf<LeftT>>>>(left: LeftT, arg0: Arg0, ...args: Args): (Expr<{
    usedRef: (RawExprUtil.UsedRef<LeftT> & RawExprUtil.UsedRef<Arg0> & RawExprUtil.IntersectUsedRefTuple<Args>);
    assertDelegate: sd.SafeMapper<boolean>;
}>);
