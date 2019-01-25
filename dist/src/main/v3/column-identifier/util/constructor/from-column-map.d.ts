import { ColumnMap } from "../../../column-map";
import { FromColumn } from "./from-column";
export declare type FromColumnMap<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? FromColumn<ColumnMapT[Extract<keyof ColumnMapT, string>]> : never);
