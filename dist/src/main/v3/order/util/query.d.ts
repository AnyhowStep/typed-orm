import { RawOrder, Order } from "../order";
import { IColumn } from "../../column";
import { IExpr } from "../../expr";
export declare type ExtractColumn<RawT extends RawOrder> = (Extract<RawT, IColumn> | Extract<Extract<RawT, Order>[0], IColumn>);
export declare type ExtractExpr<RawT extends RawOrder> = (Extract<RawT, IExpr> | Extract<Extract<RawT, Order>[0], IExpr>);
//# sourceMappingURL=query.d.ts.map