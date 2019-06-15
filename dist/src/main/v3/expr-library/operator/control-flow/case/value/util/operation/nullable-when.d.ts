import * as sd from "type-mapping";
import { RawExpr } from "../../../../../../../raw-expr";
import { PrimitiveExpr, PrimitiveExprUtil } from "../../../../../../../primitive-expr";
import { RawExprUtil } from "../../../../../../../raw-expr";
import { ICaseValue, CaseValue } from "../../case-value";
export declare type NullableWhen<BuilderT extends ICaseValue, WhenT extends RawExpr<ReturnType<BuilderT["value"]>>, ThenT extends RawExpr<BuilderT["result"] extends sd.SafeMapper<any> ? ReturnType<BuilderT["result"]> | null : PrimitiveExpr>> = (CaseValue<{
    usedRef: (BuilderT["usedRef"] & RawExprUtil.UsedRef<WhenT> & RawExprUtil.UsedRef<ThenT>);
    value: BuilderT["value"];
    result: (BuilderT["result"] extends sd.SafeMapper<any> ? sd.SafeMapper<ReturnType<BuilderT["result"]> | RawExprUtil.TypeOf<ThenT>> : sd.SafeMapper<PrimitiveExprUtil.ToSuperType<RawExprUtil.TypeOf<ThenT>>>);
}>);
export declare function nullableWhen<BuilderT extends ICaseValue, WhenT extends RawExpr<ReturnType<BuilderT["value"]>>, ThenT extends RawExpr<BuilderT["result"] extends sd.SafeMapper<any> ? ReturnType<BuilderT["result"]> | null : PrimitiveExpr>>(builder: BuilderT, whenExpr: WhenT, thenExpr: ThenT): (NullableWhen<BuilderT, WhenT, ThenT>);
