import {RawOrder, Order} from "../order";
import {IColumn} from "../../column";
import {IExpr} from "../../expr";

export type ExtractColumn<RawT extends RawOrder> = (
    Extract<RawT, IColumn> |
    Extract<Extract<RawT, Order>[0], IColumn>
);
export type ExtractExpr<RawT extends RawOrder> = (
    Extract<RawT, IExpr> |
    Extract<Extract<RawT, Order>[0], IExpr>
);