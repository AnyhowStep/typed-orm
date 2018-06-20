import { RawExpr, RawExprUtil } from "../../raw-expr";
import { Expr } from "../../expr";
export declare function neg<RawT extends RawExpr<number>>(raw: RawT): Expr<RawExprUtil.UsedReferences<RawT>, number>;
