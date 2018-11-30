import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export const column = o.column("tableAlias", "name", sd.naturalNumber());
export const columnMap = o.ColumnMapUtil.fromColumn(column);

export declare const untypedColumn : o.IColumn;
export const untypedColumnMap = o.ColumnMapUtil.fromColumn(untypedColumn);