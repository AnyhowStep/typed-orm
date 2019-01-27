import * as sd from "schema-decorator";
import { Expr } from "../../expr";
declare function trueLiteral(): Expr<{
    usedColumns: [];
    assertDelegate: sd.AssertDelegate<true>;
}>;
declare function getFalse(): Expr<{
    usedColumns: [];
    assertDelegate: sd.AssertDelegate<false>;
}>;
export { trueLiteral as trueLiteral, getFalse as falseLiteral, };
