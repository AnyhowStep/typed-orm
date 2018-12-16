import {RawOrder, Order} from "../../order";
import {IColumn} from "../../../column";
import {IExpr} from "../../../expr";

export type ExtractColumn<ArrT extends RawOrder[]> = (
    ArrT[number] extends never ?
    never :
    (
        Extract<ArrT[number], IColumn> |
        Extract<Extract<ArrT[number], Order>[0], IColumn>
    )
);
export type ExtractExpr<ArrT extends RawOrder[]> = (
    ArrT[number] extends never ?
    never :
    (
        Extract<ArrT[number], IExpr> |
        Extract<Extract<ArrT[number], Order>[0], IExpr>
    )
);