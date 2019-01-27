import {RawExpr} from "../../../../raw-expr";
import {NonNullPrimitiveExpr} from "../../../../primitive-expr";
import {RawExprUtil} from "../../../../raw-expr";
import {CaseCondition} from "./condition";
import {CaseValue} from "./value";

export * from "./condition";
export * from "./value";

//https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html#operator_case
function CaseConditionConstructor () : (
    CaseCondition<{
        usedColumns : never[],
        result : undefined,
    }>
) {
    return new CaseCondition(
        {
            usedColumns : [],
            result : undefined,
        },
        [
            "CASE",
        ]
    );
}
//https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html#operator_case
function CaseValueConstructor<
    ValueT extends RawExpr<NonNullPrimitiveExpr>
>(
    valueExpr : ValueT
) : (
    CaseValue<{
        usedColumns : RawExprUtil.UsedColumns<ValueT>,
        value : RawExprUtil.AssertDelegate<ValueT>,
        result : undefined,
    }>
) {
    return new CaseValue(
        {
            usedColumns : RawExprUtil.usedColumns(valueExpr),
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
        usedColumns : never[],
        result : undefined,
    }>
);
export function CaseConstructor<
    ValueT extends RawExpr<NonNullPrimitiveExpr>
>(
    valueExpr : ValueT
) : (
    CaseValue<{
        usedColumns : RawExprUtil.UsedColumns<ValueT>,
        value : RawExprUtil.AssertDelegate<ValueT>,
        result : undefined,
    }>
);
export function CaseConstructor (arg0? : RawExpr<NonNullPrimitiveExpr>) {
    if (arg0 === undefined) {
        return CaseConditionConstructor();
    } else {
        return CaseValueConstructor(arg0);
    }
}
export {CaseConstructor as case};
