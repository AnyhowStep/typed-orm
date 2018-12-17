import {IColumn} from "../column";
import {IExpr} from "../expr";

export const ASC = "ASC";
export const DESC = "DESC";
//TODO Rename to SortDirection
export type Sort = typeof ASC|typeof DESC;
//TODO Rename to SortExpr
export type OrderExpr = IColumn|IExpr;
//TODO Rename to Sort
export type Order = [OrderExpr, Sort];
//TODO Rename to RawSort
export type RawOrder = OrderExpr|Order;