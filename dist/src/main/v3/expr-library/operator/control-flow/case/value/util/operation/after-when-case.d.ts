import * as sd from "schema-decorator";
import { ICaseValue } from "../../case-value";
export declare type AfterWhenCase = ICaseValue<{
    usedRef: {};
    value: any;
    result: sd.AssertDelegate<any>;
}>;
