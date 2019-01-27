import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { NonNullPrimitiveExpr } from "../../../primitive-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare type Comparison = (<LeftT extends RawExpr<NonNullPrimitiveExpr>, RightT extends RawExpr<RawExprUtil.TypeOf<LeftT>>>(left: LeftT, right: RightT) => (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<LeftT>[number] | RawExprUtil.UsedColumns<RightT>[number])[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>));
export declare function comparison(operator: string): Comparison;
