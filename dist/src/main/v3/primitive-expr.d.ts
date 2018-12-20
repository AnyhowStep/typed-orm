/// <reference types="node" />
import { MySqlDateTime, MySqlDate, MySqlTime } from "./data-type";
export declare type PrimitiveExpr = bigint | number | string | boolean | Date | Buffer | null | MySqlDateTime | MySqlDate | MySqlTime;
export declare type NonNullPrimitiveExpr = Exclude<PrimitiveExpr, null>;
//# sourceMappingURL=primitive-expr.d.ts.map