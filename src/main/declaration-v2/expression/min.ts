import {Expr} from "../expr";
import {AnyRawExpr, RawExprUtil} from "../raw-expr";

export function min<RawT extends AnyRawExpr> (raw : RawT) : (
    Expr<
        RawExprUtil.UsedReferences<RawT>,
        RawExprUtil.Type<RawT>
    >
) {
    return new Expr(
        RawExprUtil.usedReferences(raw),
        RawExprUtil.assertDelegate(raw),
        `MIN(${RawExprUtil.querify(raw)})`
    );
}