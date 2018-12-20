import { RawExpr } from "../../../../raw-expr";
import { NonNullPrimitiveExpr } from "../../../../primitive-expr";
import { RawExprUtil } from "../../../../raw-expr";
import { CaseValue } from "./value";
export * from "./value";
export declare function CaseConstructor<ValueT extends RawExpr<NonNullPrimitiveExpr>>(valueExpr: ValueT): (CaseValue<{
    usedRef: RawExprUtil.UsedRef<ValueT>;
    value: RawExprUtil.AssertDelegate<ValueT>;
    result: undefined;
}>);
export { CaseConstructor as case };
//# sourceMappingURL=index.d.ts.map