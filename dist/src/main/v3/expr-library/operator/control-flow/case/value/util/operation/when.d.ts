import * as sd from "type-mapping";
import { RawExpr } from "../../../../../../../raw-expr";
import { NonNullPrimitiveExpr, PrimitiveExprUtil } from "../../../../../../../primitive-expr";
import { RawExprUtil } from "../../../../../../../raw-expr";
import { ICaseValue, CaseValue } from "../../case-value";
export declare type When<BuilderT extends ICaseValue, WhenT extends RawExpr<ReturnType<BuilderT["value"]>>, ThenT extends RawExpr<BuilderT["result"] extends sd.SafeMapper<any> ? ReturnType<BuilderT["result"]> : NonNullPrimitiveExpr>> = (CaseValue<{
    usedRef: (BuilderT["usedRef"] & RawExprUtil.UsedRef<WhenT> & RawExprUtil.UsedRef<ThenT>);
    value: BuilderT["value"];
    result: (BuilderT["result"] extends sd.SafeMapper<any> ? BuilderT["result"] : sd.SafeMapper<PrimitiveExprUtil.ToSuperType<RawExprUtil.TypeOf<ThenT>>>);
}>);
export declare function when<BuilderT extends ICaseValue, WhenT extends RawExpr<ReturnType<BuilderT["value"]>>, ThenT extends RawExpr<BuilderT["result"] extends sd.SafeMapper<any> ? ReturnType<BuilderT["result"]> : NonNullPrimitiveExpr>>(builder: BuilderT, whenExpr: WhenT, thenExpr: ThenT): (When<BuilderT, WhenT, ThenT>);
