import * as sd from "schema-decorator";
import { ICaseValue } from "../../case-value";
import { IColumn } from "../../../../../../../column";
export declare type AfterWhenCase = ICaseValue<{
    usedColumns: IColumn[];
    value: any;
    result: sd.AssertDelegate<any>;
}>;
