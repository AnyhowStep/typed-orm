import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { PrimitiveExpr } from "../../../primitive-expr";
import { Expr } from "../../../expr";
export declare type Coalesce<QueryT extends RawExpr<PrimitiveExpr>, DefaultT extends RawExpr<RawExprUtil.TypeOf<QueryT>>> = (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<QueryT>[number] | RawExprUtil.UsedColumns<DefaultT>[number])[];
    assertDelegate: RawExprUtil.AssertDelegate<Exclude<RawExprUtil.TypeOf<QueryT>, null> | DefaultT>;
}>);
export declare function coalesce<QueryT extends RawExpr<PrimitiveExpr>, DefaultT extends RawExpr<RawExprUtil.TypeOf<QueryT>>>(query: QueryT, defaultExpr: DefaultT): Coalesce<QueryT, DefaultT>;
