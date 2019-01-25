import { RawOrder, Order } from "../../../order";
import { IExpr } from "../../../../expr";
export declare type ExtractExpr<ArrT extends RawOrder[]> = (ArrT[number] extends never ? never : (Extract<ArrT[number], IExpr> | Extract<Extract<ArrT[number], Order>[0], IExpr>));
