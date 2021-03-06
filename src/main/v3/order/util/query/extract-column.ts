import {RawOrder, Order} from "../../order";
import {IColumn} from "../../../column";

export type ExtractColumn<RawT extends RawOrder> = (
    Extract<RawT, IColumn> |
    Extract<Extract<RawT, Order>[0], IColumn>
);