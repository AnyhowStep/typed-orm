import {IColumn} from "../column";
import {IExpr} from "../expr";

export const ASC = "ASC";
export const DESC = "DESC";
export type SortDirection = typeof ASC|typeof DESC;
//TODO-DEBATE Consider letting IExprSelectItem be a SortExpr?
//Then, we'd just use the `unaliasedQuery`
export type SortExpr = IColumn|IExpr;
export type Order = [SortExpr, SortDirection];
export type RawOrder = SortExpr|Order;