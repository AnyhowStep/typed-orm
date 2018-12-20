import * as sd from "schema-decorator";
import { ICaseValue } from "../../case-value";
import { Expr } from "../../../../../../../expr";
import { AfterWhenCase } from "./after-when-case";
export declare type End<BuilderT extends ICaseValue<{
    usedRef: {};
    value: any;
    result: sd.AssertDelegate<any>;
}>> = (Expr<{
    usedRef: BuilderT["usedRef"];
    assertDelegate: sd.AssertDelegate<ReturnType<BuilderT["result"]> | null>;
}>);
declare function EndFunction<BuilderT extends AfterWhenCase>(builder: BuilderT): (End<BuilderT>);
export { EndFunction as end };
//# sourceMappingURL=end.d.ts.map