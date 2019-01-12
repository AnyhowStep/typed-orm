import {RawOrder, Order} from "../../order";
import {IExpr} from "../../../expr";

export type ExtractExpr<RawT extends RawOrder> = (
    Extract<RawT, IExpr> |
    Extract<Extract<RawT, Order>[0], IExpr>
);