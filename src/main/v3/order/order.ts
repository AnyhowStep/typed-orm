import {ColumnIdentifier} from "../column-identifier";
import {IExpr} from "../expr";

export const ASC = "ASC";
export const DESC = "DESC";
export type Sort = typeof ASC|typeof DESC;
export type Order = [ColumnIdentifier|IExpr, Sort];
