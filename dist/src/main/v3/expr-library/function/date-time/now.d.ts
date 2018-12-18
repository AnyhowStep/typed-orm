import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
export declare function NOW(fractionalSecondsPrecision?: 0 | 1 | 2 | 3 | 4 | 5 | 6): Expr<{
    usedRef: {};
    assertDelegate: sd.AssertDelegate<import("../../../data-type").MySqlDateTime> & {
        __accepts: string | Date | import("../../../data-type").MySqlDateTime;
        __canAccept: string | number | Date | import("../../../data-type").MySqlDateTime;
    };
}>;
//# sourceMappingURL=now.d.ts.map