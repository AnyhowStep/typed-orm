import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { PrimitiveExpr } from "../../../primitive-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare type NullSafeComparison = (<LeftT extends RawExpr<PrimitiveExpr>, RightT extends RawExpr<RawExprUtil.TypeOf<LeftT> | null>>(left: LeftT, right: RightT) => (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<LeftT>[number] | RawExprUtil.UsedColumns<RightT>[number])[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>));
export declare function nullSafeComparison(operator: string): NullSafeComparison;
