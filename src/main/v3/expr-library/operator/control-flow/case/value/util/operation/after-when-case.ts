import * as sd from "schema-decorator";
import {ICase} from "../../case";

export type AfterWhenCase = ICase<{
    usedRef : {},
    value : any,
    result : sd.AssertDelegate<any>,
}>;