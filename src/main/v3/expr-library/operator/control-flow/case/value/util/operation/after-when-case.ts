import * as sd from "type-mapping";
import {ICaseValue} from "../../case-value";

export type AfterWhenCase = ICaseValue<{
    usedRef : {},
    value : any,
    result : sd.SafeMapper<any>,
}>;