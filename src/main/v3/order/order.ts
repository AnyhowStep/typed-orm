import {IColumn} from "../column";
import {IExpr} from "../expr";

export const ASC = "ASC";
export const DESC = "DESC";
//TODO-FEATURE Rename to SortDirection
export type Sort = typeof ASC|typeof DESC;
//TODO-FEATURE Rename to SortExpr
export type OrderExpr = IColumn|IExpr;
//TODO-FEATURE Rename to Sort
export type Order = [OrderExpr, Sort];
//TODO-FEATURE Rename to RawSort
export type RawOrder = OrderExpr|Order;