/// <reference types="node" />
import { MySqlDateTime } from "./data-type";
export declare type PrimitiveExpr = bigint | number | string | boolean | Date | Buffer | null | MySqlDateTime;
export declare type NonNullPrimitiveExpr = Exclude<PrimitiveExpr, null>;
//# sourceMappingURL=primitive-expr.d.ts.map