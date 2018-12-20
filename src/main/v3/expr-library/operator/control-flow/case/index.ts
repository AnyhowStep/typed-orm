import {RawExpr} from "../../../../raw-expr";
import {NonNullPrimitiveExpr} from "../../../../primitive-expr";
import {RawExprUtil} from "../../../../raw-expr";
import {CaseCondition} from "./condition";
import {CaseValue} from "./value";

export * from "./condition";
export * from "./value";

function CaseConditionConstructor () : (
    CaseCondition<{
        usedRef : {},
        result : undefined,
    }>
) {
    return new CaseCondition(
        {
            usedRef : {},
            result : undefined,
        },
        [
            "CASE",
        ]
    );
}
function CaseValueConstructor<
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
export function CaseConstructor () : (
    CaseCondition<{
        usedRef : {},
        result : undefined,
    }>
);
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
);
export function CaseConstructor (arg0? : RawExpr<NonNullPrimitiveExpr>) {
    if (arg0 == undefined) {
        return CaseConditionConstructor();
    } else {
        return CaseValueConstructor(arg0);
    }
}
export {CaseConstructor as case};
