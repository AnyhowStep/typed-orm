import { IColumn } from "../../column";
import { SortDirection } from "../../../order";
export declare type Sort<ColumnT extends IColumn> = ([ColumnT, SortDirection]);
export declare function sort<ColumnT extends IColumn>(column: ColumnT, sortDirection: SortDirection): Sort<ColumnT>;
