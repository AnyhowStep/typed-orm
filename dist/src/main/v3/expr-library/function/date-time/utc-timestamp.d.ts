import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
export declare function utcTimestamp(fractionalSecondsPrecision?: 0 | 1 | 2 | 3): Expr<{
    usedColumns: never[];
    assertDelegate: sd.AssertDelegate<Date>;
}>;
