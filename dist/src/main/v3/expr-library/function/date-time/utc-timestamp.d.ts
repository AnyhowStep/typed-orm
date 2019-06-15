import * as sd from "type-mapping";
import { Expr } from "../../../expr";
export declare function utcTimestamp(fractionalSecondsPrecision?: 0 | 1 | 2 | 3): Expr<{
    usedRef: {};
    assertDelegate: sd.Mapper<unknown, Date>;
}>;
