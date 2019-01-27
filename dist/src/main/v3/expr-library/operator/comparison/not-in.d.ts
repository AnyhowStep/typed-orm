import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { NonNullPrimitiveExpr } from "../../../primitive-expr";
export declare function notIn<LeftT extends RawExpr<NonNullPrimitiveExpr>>(left: LeftT, ...args: RawExprUtil.TypeOf<LeftT>[]): (Expr<{
    usedColumns: RawExprUtil.UsedColumns<LeftT>;
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
export declare function notIn<LeftT extends RawExpr<NonNullPrimitiveExpr>, Arg0 extends RawExpr<RawExprUtil.TypeOf<LeftT>>, Args extends RawExpr<RawExprUtil.TypeOf<LeftT>>[]>(left: LeftT, arg0: Arg0, ...args: Args): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<LeftT>[number] | RawExprUtil.UsedColumns<Arg0>[number] | RawExprUtil.Array.UsedColumns<Args>[number])[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
