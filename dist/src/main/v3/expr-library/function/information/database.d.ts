import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
export declare function database(): (Expr<{
    usedColumns: never[];
    assertDelegate: sd.AssertDelegate<string | null>;
}>);
