import {RawExpr, RawExprUtil} from "../../raw-expr";
import {Expr} from "../../expr";
import * as sd from "schema-decorator";

//If this operator is used with a BIGINT, the return value is also a BIGINT.
//This means that you should avoid using - on integers that may have the value of −(2^63).
export function neg<RawT extends RawExpr<number>> (
    raw : RawT
) : Expr<RawExprUtil.UsedReferences<RawT>, number> {
    RawExprUtil.assertNonNullable(raw);

    return new Expr(
        RawExprUtil.usedReferences(raw),
        sd.number(),
        `-(${RawExprUtil.querify(raw)})`
    );
}