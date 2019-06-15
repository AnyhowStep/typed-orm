import * as sd from "type-mapping";
import { RawExpr } from "../../../../../../../raw-expr";
import { RawExprUtil } from "../../../../../../../raw-expr";
import { Expr } from "../../../../../../../expr";
import { AfterWhenCase } from "./after-when-case";
export declare type NullableElse<BuilderT extends AfterWhenCase, ElseT extends RawExpr<ReturnType<BuilderT["result"]> | null>> = (Expr<{
    usedRef: (BuilderT["usedRef"] & RawExprUtil.UsedRef<ElseT>);
    assertDelegate: sd.SafeMapper<ReturnType<BuilderT["result"]> | RawExprUtil.TypeOf<ElseT>>;
}>);
declare function NullableElseFunction<BuilderT extends AfterWhenCase, ElseT extends RawExpr<ReturnType<BuilderT["result"]> | null>>(builder: BuilderT, elseExpr: ElseT): (NullableElse<BuilderT, ElseT>);
export { NullableElseFunction as nullableElse };
