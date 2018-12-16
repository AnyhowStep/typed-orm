import { RawOrder, Order } from "../../order";
import { IColumn } from "../../../column";
import { IExpr } from "../../../expr";
export declare type ExtractColumn<ArrT extends RawOrder[]> = (ArrT[number] extends never ? never : (Extract<ArrT[number], IColumn> | Extract<Extract<ArrT[number], Order>[0], IColumn>));
export declare type ExtractExpr<ArrT extends RawOrder[]> = (ArrT[number] extends never ? never : (Extract<ArrT[number], IExpr> | Extract<Extract<ArrT[number], Order>[0], IExpr>));
//# sourceMappingURL=query.d.ts.map