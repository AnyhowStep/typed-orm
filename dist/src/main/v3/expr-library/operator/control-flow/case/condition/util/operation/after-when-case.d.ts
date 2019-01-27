import * as sd from "schema-decorator";
import { ICaseCondition } from "../../case-condition";
import { IColumn } from "../../../../../../../column";
export declare type AfterWhenCase = ICaseCondition<{
    usedColumns: IColumn[];
    result: sd.AssertDelegate<any>;
}>;
