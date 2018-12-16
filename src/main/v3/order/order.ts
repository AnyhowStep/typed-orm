import {IColumn} from "../column";
import {IExpr} from "../expr";

export const ASC = "ASC";
export const DESC = "DESC";
export type Sort = typeof ASC|typeof DESC;
export type OrderExpr = IColumn|IExpr;
export type Order = [OrderExpr, Sort];
export type RawOrder = OrderExpr|Order;