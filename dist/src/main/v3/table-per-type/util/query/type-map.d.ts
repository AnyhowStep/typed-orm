import * as sd from "schema-decorator";
import { ITable } from "../../../table";
import { ColumnNames } from "./column-names";
import { ColumnType } from "./column-type";
export declare type TypeMap<TableT extends ITable> = ({
    [columnName in ColumnNames<TableT>]: (ColumnType<TableT, columnName>);
});
export declare function assertDelegate<TableT extends ITable>(table: TableT): sd.AssertDelegate<TypeMap<TableT>>;
//# sourceMappingURL=type-map.d.ts.map