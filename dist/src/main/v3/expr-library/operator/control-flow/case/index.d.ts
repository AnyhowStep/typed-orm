import { RawExpr } from "../../../../raw-expr";
import { NonNullPrimitiveExpr } from "../../../../primitive-expr";
import { RawExprUtil } from "../../../../raw-expr";
import { CaseCondition } from "./condition";
import { CaseValue } from "./value";
export * from "./condition";
export * from "./value";
export declare function CaseConstructor(): (CaseCondition<{
    usedColumns: never[];
    result: undefined;
}>);
export declare function CaseConstructor<ValueT extends RawExpr<NonNullPrimitiveExpr>>(valueExpr: ValueT): (CaseValue<{
    usedColumns: RawExprUtil.UsedColumns<ValueT>;
    value: RawExprUtil.AssertDelegate<ValueT>;
    result: undefined;
}>);
export { CaseConstructor as case };
