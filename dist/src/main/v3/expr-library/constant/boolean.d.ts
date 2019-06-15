import * as sd from "type-mapping";
import { Expr } from "../../expr";
declare function trueLiteral(): Expr<{
    usedRef: {};
    assertDelegate: sd.Mapper<unknown, true>;
}>;
declare function getFalse(): Expr<{
    usedRef: {};
    assertDelegate: sd.Mapper<unknown, false>;
}>;
export { trueLiteral as trueLiteral, getFalse as falseLiteral, };
