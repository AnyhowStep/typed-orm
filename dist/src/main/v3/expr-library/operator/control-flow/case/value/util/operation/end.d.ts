import * as sd from "type-mapping";
import { Expr } from "../../../../../../../expr";
import { AfterWhenCase } from "./after-when-case";
export declare type End<BuilderT extends AfterWhenCase> = (Expr<{
    usedRef: BuilderT["usedRef"];
    assertDelegate: sd.SafeMapper<ReturnType<BuilderT["result"]> | null>;
}>);
declare function EndFunction<BuilderT extends AfterWhenCase>(builder: BuilderT): (End<BuilderT>);
export { EndFunction as end };
