import { Expr } from "../expr";
import { RawExpr, AnyRawExpr, RawExprUtil } from "../raw-expr";
export declare function sum<RawT extends RawExpr<number>>(raw: RawT): (Expr<RawExprUtil.UsedReferences<RawT>, RawExprUtil.Type<null | number>> & {
    distinct: () => Expr<RawExprUtil.UsedReferences<RawT>, RawExprUtil.Type<null | number>>;
});
export declare function sumUnsafe<RawT extends AnyRawExpr>(raw: RawT): (Expr<RawExprUtil.UsedReferences<RawT>, RawExprUtil.Type<null | number>> & {
    distinct: () => Expr<RawExprUtil.UsedReferences<RawT>, RawExprUtil.Type<null | number>>;
});
