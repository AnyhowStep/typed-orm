import * as sd from "schema-decorator";
import { RawExpr } from "../../../../../../../raw-expr";
import { NonNullPrimitiveExpr } from "../../../../../../../primitive-expr";
import { RawExprUtil } from "../../../../../../../raw-expr";
import { ICaseCondition, CaseCondition } from "../../case-condition";
export declare type When<BuilderT extends ICaseCondition, WhenT extends RawExpr<boolean>, ThenT extends RawExpr<BuilderT["result"] extends sd.AssertDelegate<any> ? ReturnType<BuilderT["result"]> : NonNullPrimitiveExpr>> = (CaseCondition<{
    usedRef: (BuilderT["usedRef"] & RawExprUtil.UsedRef<WhenT> & RawExprUtil.UsedRef<ThenT>);
    result: (BuilderT["result"] extends sd.AssertDelegate<any> ? BuilderT["result"] : sd.AssertDelegate<RawExprUtil.TypeOf<ThenT>>);
}>);
export declare function when<BuilderT extends ICaseCondition, WhenT extends RawExpr<boolean>, ThenT extends RawExpr<BuilderT["result"] extends sd.AssertDelegate<any> ? ReturnType<BuilderT["result"]> : NonNullPrimitiveExpr>>(builder: BuilderT, whenExpr: WhenT, thenExpr: ThenT): (When<BuilderT, WhenT, ThenT>);
//# sourceMappingURL=when.d.ts.map