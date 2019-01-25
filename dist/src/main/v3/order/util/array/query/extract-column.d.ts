import { RawOrder, Order } from "../../../order";
import { IColumn } from "../../../../column";
export declare type ExtractColumn<ArrT extends RawOrder[]> = (ArrT[number] extends never ? never : (Extract<ArrT[number], IColumn> | Extract<Extract<ArrT[number], Order>[0], IColumn>));
