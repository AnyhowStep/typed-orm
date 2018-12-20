import * as sd from "schema-decorator";
import { RawExpr } from "../../../../../../../raw-expr";
import { RawExprUtil } from "../../../../../../../raw-expr";
import { ICase } from "../../case";
import { Expr } from "../../../../../../../expr";
import { AfterWhenCase } from "./after-when-case";
export declare type Else<BuilderT extends ICase<{
    usedRef: {};
    value: any;
    result: sd.AssertDelegate<any>;
}>, ElseT extends RawExpr<Exclude<ReturnType<BuilderT["result"]>, null>>> = (Expr<{
    usedRef: (BuilderT["usedRef"] & RawExprUtil.UsedRef<ElseT>);
    assertDelegate: BuilderT["result"];
}>);
declare function ElseFunction<BuilderT extends AfterWhenCase, ElseT extends RawExpr<Exclude<ReturnType<BuilderT["result"]>, null>>>(builder: BuilderT, elseExpr: ElseT): (Else<BuilderT, ElseT>);
export { ElseFunction as else };
//# sourceMappingURL=else.d.ts.map