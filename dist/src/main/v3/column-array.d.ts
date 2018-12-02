import { Column, IColumn } from "./column";
import { ColumnMap } from "./column-map";
export declare namespace ColumnArrayUtil {
    type FromColumnMap<ColumnMapT extends ColumnMap> = (Column.UnionFromColumnMap<ColumnMapT>[]);
    function fromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): FromColumnMap<ColumnMapT>;
    function isColumnArray(raw: any): raw is IColumn[];
}
//# sourceMappingURL=column-array.d.ts.map