import * as sd from "schema-decorator";
import { RawExpr } from "../../../../../../raw-expr";
import { PrimitiveExpr } from "../../../../../../primitive-expr";
import { RawExprUtil } from "../../../../../../raw-expr";
import { ICase, Case } from "../../case";
export declare type NullableWhen<BuilderT extends ICase, WhenT extends RawExpr<ReturnType<BuilderT["value"]>>, ThenT extends RawExpr<BuilderT["result"] extends sd.AssertDelegate<any> ? ReturnType<BuilderT["result"]> | null : PrimitiveExpr>> = (Case<{
    usedRef: (BuilderT["usedRef"] & RawExprUtil.UsedRef<WhenT> & RawExprUtil.UsedRef<ThenT>);
    value: BuilderT["value"];
    result: (BuilderT["result"] extends sd.AssertDelegate<any> ? sd.AssertDelegate<ReturnType<BuilderT["result"]> | RawExprUtil.TypeOf<ThenT>> : sd.AssertDelegate<RawExprUtil.TypeOf<ThenT>>);
}>);
export declare function nullableWhen<BuilderT extends ICase, WhenT extends RawExpr<ReturnType<BuilderT["value"]>>, ThenT extends RawExpr<BuilderT["result"] extends sd.AssertDelegate<any> ? ReturnType<BuilderT["result"]> | null : PrimitiveExpr>>(builder: BuilderT, whenExpr: WhenT, thenExpr: ThenT): (NullableWhen<BuilderT, WhenT, ThenT>);
//# sourceMappingURL=nullable-when.d.ts.map