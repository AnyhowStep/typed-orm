import { ColumnMap } from "../../../column-map";
import { IColumn } from "../../column";
export declare type FromColumnMap<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? (ColumnMapT[keyof ColumnMapT] extends IColumn ? ColumnMapT[Extract<keyof ColumnMapT, string>] : never) : never);
