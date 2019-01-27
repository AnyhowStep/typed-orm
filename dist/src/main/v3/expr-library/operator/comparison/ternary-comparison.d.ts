import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { NonNullPrimitiveExpr } from "../../../primitive-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare type TernaryComparison = (<LeftT extends RawExpr<NonNullPrimitiveExpr>, MidT extends RawExpr<RawExprUtil.TypeOf<LeftT>>, RightT extends RawExpr<RawExprUtil.TypeOf<LeftT>>>(left: LeftT, mid: MidT, right: RightT) => (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<LeftT>[number] | RawExprUtil.UsedColumns<MidT>[number] | RawExprUtil.UsedColumns<RightT>[number])[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>));
export declare function ternaryComparison(leftOperator: string, rightOperator: string): TernaryComparison;
