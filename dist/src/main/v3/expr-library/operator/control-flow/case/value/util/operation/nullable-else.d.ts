import * as sd from "schema-decorator";
import { RawExpr } from "../../../../../../../raw-expr";
import { RawExprUtil } from "../../../../../../../raw-expr";
import { ICaseValue } from "../../case-value";
import { Expr } from "../../../../../../../expr";
import { AfterWhenCase } from "./after-when-case";
export declare type NullableElse<BuilderT extends ICaseValue<{
    usedRef: {};
    value: any;
    result: sd.AssertDelegate<any>;
}>, ElseT extends RawExpr<ReturnType<BuilderT["result"]> | null>> = (Expr<{
    usedRef: (BuilderT["usedRef"] & RawExprUtil.UsedRef<ElseT>);
    assertDelegate: sd.AssertDelegate<ReturnType<BuilderT["result"]> | RawExprUtil.TypeOf<ElseT>>;
}>);
declare function NullableElseFunction<BuilderT extends AfterWhenCase, ElseT extends RawExpr<ReturnType<BuilderT["result"]> | null>>(builder: BuilderT, elseExpr: ElseT): (NullableElse<BuilderT, ElseT>);
export { NullableElseFunction as nullableElse };
//# sourceMappingURL=nullable-else.d.ts.map