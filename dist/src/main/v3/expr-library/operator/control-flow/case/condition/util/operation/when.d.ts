import * as sd from "type-mapping";
import { RawExpr } from "../../../../../../../raw-expr";
import { NonNullPrimitiveExpr, PrimitiveExprUtil } from "../../../../../../../primitive-expr";
import { RawExprUtil } from "../../../../../../../raw-expr";
import { ICaseCondition, CaseCondition } from "../../case-condition";
export declare type When<BuilderT extends ICaseCondition, WhenT extends RawExpr<boolean>, ThenT extends RawExpr<BuilderT["result"] extends sd.SafeMapper<any> ? ReturnType<BuilderT["result"]> : NonNullPrimitiveExpr>> = (CaseCondition<{
    usedRef: (BuilderT["usedRef"] & RawExprUtil.UsedRef<WhenT> & RawExprUtil.UsedRef<ThenT>);
    result: (BuilderT["result"] extends sd.SafeMapper<any> ? BuilderT["result"] : sd.SafeMapper<PrimitiveExprUtil.ToSuperType<RawExprUtil.TypeOf<ThenT>>>);
}>);
export declare function when<BuilderT extends ICaseCondition, WhenT extends RawExpr<boolean>, ThenT extends RawExpr<BuilderT["result"] extends sd.SafeMapper<any> ? ReturnType<BuilderT["result"]> : NonNullPrimitiveExpr>>(builder: BuilderT, whenExpr: WhenT, thenExpr: ThenT): (When<BuilderT, WhenT, ThenT>);
