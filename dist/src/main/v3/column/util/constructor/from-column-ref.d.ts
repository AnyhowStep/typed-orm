import { ColumnRef } from "../../../column-ref";
import { FromColumnMap } from "./from-column-map";
import { ColumnMap } from "../../../column-map";
export declare type FromColumnRef<ColumnRefT extends ColumnRef> = (ColumnRefT extends ColumnRef ? (ColumnRefT[keyof ColumnRefT] extends ColumnMap ? FromColumnMap<ColumnRefT[keyof ColumnRefT]> : never) : never);
