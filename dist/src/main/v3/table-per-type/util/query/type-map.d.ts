import * as sd from "type-mapping";
import { ITable } from "../../../table";
import { ColumnNames } from "./column-names";
import { ColumnType } from "./column-type";
export declare type TypeMap<TableT extends ITable> = ({
    [columnName in ColumnNames<TableT>]: (ColumnType<TableT, columnName>);
});
export declare function assertDelegate<TableT extends ITable>(table: TableT): sd.SafeMapper<TypeMap<TableT>>;
