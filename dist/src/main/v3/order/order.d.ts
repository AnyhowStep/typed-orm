import { IColumn } from "../column";
import { IExpr } from "../expr";
export declare const ASC = "ASC";
export declare const DESC = "DESC";
export declare type Sort = typeof ASC | typeof DESC;
export declare type OrderExpr = IColumn | IExpr;
export declare type Order = [OrderExpr, Sort];
export declare type RawOrder = OrderExpr | Order;
//# sourceMappingURL=order.d.ts.map