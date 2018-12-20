import * as sd from "schema-decorator";
import { RawExpr } from "../../../../../../raw-expr";
import { NonNullPrimitiveExpr } from "../../../../../../primitive-expr";
import { RawExprUtil } from "../../../../../../raw-expr";
import { ICase, Case } from "../../case";
export declare type When<BuilderT extends ICase, WhenT extends RawExpr<ReturnType<BuilderT["value"]>>, ThenT extends RawExpr<BuilderT["result"] extends sd.AssertDelegate<any> ? ReturnType<BuilderT["result"]> : NonNullPrimitiveExpr>> = (Case<{
    usedRef: (BuilderT["usedRef"] & RawExprUtil.UsedRef<WhenT> & RawExprUtil.UsedRef<ThenT>);
    value: BuilderT["value"];
    result: (BuilderT["result"] extends sd.AssertDelegate<any> ? BuilderT["result"] : sd.AssertDelegate<RawExprUtil.TypeOf<ThenT>>);
}>);
export declare function when<BuilderT extends ICase, WhenT extends RawExpr<ReturnType<BuilderT["value"]>>, ThenT extends RawExpr<BuilderT["result"] extends sd.AssertDelegate<any> ? ReturnType<BuilderT["result"]> : NonNullPrimitiveExpr>>(builder: BuilderT, whenExpr: WhenT, thenExpr: ThenT): (When<BuilderT, WhenT, ThenT>);
//# sourceMappingURL=when.d.ts.map