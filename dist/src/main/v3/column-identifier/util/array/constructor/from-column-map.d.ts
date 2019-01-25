import * as Ctor from "../../constructor";
import { ColumnMap } from "../../../../column-map";
export declare type FromColumnMap<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? Ctor.FromColumnMap<ColumnMapT>[] : never);
export declare function fromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): FromColumnMap<ColumnMapT>;
