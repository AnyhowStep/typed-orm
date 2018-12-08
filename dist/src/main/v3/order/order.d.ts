import { ColumnIdentifier } from "../column-identifier";
import { IExpr } from "../expr";
export declare const ASC = "ASC";
export declare const DESC = "DESC";
export declare type Sort = typeof ASC | typeof DESC;
export declare type Order = [ColumnIdentifier | IExpr, Sort];
//# sourceMappingURL=order.d.ts.map