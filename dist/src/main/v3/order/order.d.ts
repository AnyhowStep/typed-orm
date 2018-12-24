import { IColumn } from "../column";
import { IExpr } from "../expr";
export declare const ASC = "ASC";
export declare const DESC = "DESC";
export declare type SortDirection = typeof ASC | typeof DESC;
export declare type SortExpr = IColumn | IExpr;
export declare type Order = [SortExpr, SortDirection];
export declare type RawOrder = SortExpr | Order;
//# sourceMappingURL=order.d.ts.map