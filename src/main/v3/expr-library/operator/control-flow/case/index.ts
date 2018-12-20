import {RawExpr} from "../../../../raw-expr";
import {NonNullPrimitiveExpr} from "../../../../primitive-expr";
import {RawExprUtil} from "../../../../raw-expr";
import {CaseValue} from "./value";

export * from "./value";

export function CaseConstructor<
    ValueT extends RawExpr<NonNullPrimitiveExpr>
>(
    valueExpr : ValueT
) : (
    CaseValue<{
        usedRef : RawExprUtil.UsedRef<ValueT>,
        value : RawExprUtil.AssertDelegate<ValueT>,
        result : undefined,
    }>
) {
    return new CaseValue(
        {
            usedRef : RawExprUtil.usedRef(valueExpr),
            value : RawExprUtil.assertDelegate(valueExpr),
            result : undefined,
        },
        [
            "CASE",
            RawExprUtil.queryTree(valueExpr),
        ]
    );
}
export {CaseConstructor as case};
