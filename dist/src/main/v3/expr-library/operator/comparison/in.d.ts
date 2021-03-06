import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { NonNullPrimitiveExpr, PrimitiveExprUtil } from "../../../primitive-expr";
import { Tuple } from "../../../tuple";
import { OneSelectItemQuery } from "../../../query/util";
import { ColumnRefUtil } from "../../../column-ref";
import { IJoin } from "../../../join";
declare function In<LeftT extends RawExpr<NonNullPrimitiveExpr>>(left: LeftT, ...args: PrimitiveExprUtil.ToSuperType<RawExprUtil.TypeOf<LeftT>>[]): (Expr<{
    usedRef: RawExprUtil.UsedRef<LeftT>;
    assertDelegate: sd.SafeMapper<boolean>;
}>);
declare function In<LeftT extends RawExpr<NonNullPrimitiveExpr>, Arg0 extends RawExpr<RawExprUtil.TypeOf<LeftT>>, Args extends Tuple<RawExpr<RawExprUtil.TypeOf<LeftT>>>>(left: LeftT, arg0: Arg0, ...args: Args): (Expr<{
    usedRef: (RawExprUtil.UsedRef<LeftT> & RawExprUtil.UsedRef<Arg0> & RawExprUtil.IntersectUsedRefTuple<Args>);
    assertDelegate: sd.SafeMapper<boolean>;
}>);
declare function In<LeftT extends RawExpr<NonNullPrimitiveExpr>, RightT extends OneSelectItemQuery<PrimitiveExprUtil.ToSuperType<RawExprUtil.TypeOf<LeftT>>>>(left: LeftT, right: RightT): (Expr<{
    usedRef: (RawExprUtil.UsedRef<LeftT> & (RightT["_parentJoins"] extends IJoin[] ? ColumnRefUtil.FromJoinArray<RightT["_parentJoins"]> : {}));
    assertDelegate: sd.SafeMapper<boolean>;
}>);
export { In as in };
