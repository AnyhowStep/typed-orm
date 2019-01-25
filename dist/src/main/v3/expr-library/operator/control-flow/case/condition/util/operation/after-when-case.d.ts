import * as sd from "schema-decorator";
import { ICaseCondition } from "../../case-condition";
export declare type AfterWhenCase = ICaseCondition<{
    usedRef: {};
    result: sd.AssertDelegate<any>;
}>;
