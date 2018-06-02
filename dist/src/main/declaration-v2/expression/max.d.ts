import { Expr } from "../expr";
import { AnyRawExpr, RawExprUtil } from "../raw-expr";
export declare function max<RawT extends AnyRawExpr>(raw: RawT): (Expr<RawExprUtil.UsedReferences<RawT>, RawExprUtil.Type<null | RawT>>);
