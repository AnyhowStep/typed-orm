import { IColumn } from "../../column";
import { ASC } from "../../../order";
export declare type Asc<ColumnT extends IColumn> = ([ColumnT, typeof ASC]);
export declare function asc<ColumnT extends IColumn>(column: ColumnT): Asc<ColumnT>;
