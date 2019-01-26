import {Expr} from "../expr";
import {AnyRawExpr, RawExprUtil} from "../raw-expr";
import * as sd from "schema-decorator";

export function min<RawT extends AnyRawExpr> (raw : RawT) : (
    Expr<
        RawExprUtil.UsedReferences<RawT>,
        RawExprUtil.Type<null|RawT>
    >
) {
    return new Expr(
        RawExprUtil.usedReferences(raw),
        sd.nullable(RawExprUtil.assertDelegate(raw)),
        `MIN(${RawExprUtil.querify(raw)})`
    );
}