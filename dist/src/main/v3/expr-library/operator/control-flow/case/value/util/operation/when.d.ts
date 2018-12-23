import * as sd from "schema-decorator";
import { RawExpr } from "../../../../../../../raw-expr";
import { NonNullPrimitiveExpr } from "../../../../../../../primitive-expr";
import { RawExprUtil } from "../../../../../../../raw-expr";
import { ICaseValue, CaseValue } from "../../case-value";
export declare type When<BuilderT extends ICaseValue, WhenT extends RawExpr<ReturnType<BuilderT["value"]>>, ThenT extends RawExpr<BuilderT["result"] extends sd.AssertDelegate<any> ? ReturnType<BuilderT["result"]> : NonNullPrimitiveExpr>> = (CaseValue<{
    usedRef: (BuilderT["usedRef"] & RawExprUtil.UsedRef<WhenT> & RawExprUtil.UsedRef<ThenT>);
    value: BuilderT["value"];
    result: (BuilderT["result"] extends sd.AssertDelegate<any> ? BuilderT["result"] : sd.AssertDelegate<RawExprUtil.TypeOf<ThenT>>);
}>);
export declare function when<BuilderT extends ICaseValue, WhenT extends RawExpr<ReturnType<BuilderT["value"]>>, ThenT extends RawExpr<BuilderT["result"] extends sd.AssertDelegate<any> ? ReturnType<BuilderT["result"]> : NonNullPrimitiveExpr>>(builder: BuilderT, whenExpr: WhenT, thenExpr: ThenT): (When<BuilderT, WhenT, ThenT>);
//# sourceMappingURL=when.d.ts.map