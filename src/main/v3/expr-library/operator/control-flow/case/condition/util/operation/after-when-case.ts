import * as sd from "type-mapping";
import {ICaseCondition} from "../../case-condition";

export type AfterWhenCase = ICaseCondition<{
    usedRef : {},
    result : sd.SafeMapper<any>,
}>;