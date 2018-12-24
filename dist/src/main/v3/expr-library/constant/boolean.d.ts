import * as sd from "schema-decorator";
import { Expr } from "../../expr";
declare function getTrue(): Expr<{
    usedRef: {};
    assertDelegate: sd.AssertDelegate<true>;
}>;
declare function getFalse(): Expr<{
    usedRef: {};
    assertDelegate: sd.AssertDelegate<false>;
}>;
export { getTrue as true, getFalse as false, };
//# sourceMappingURL=boolean.d.ts.map