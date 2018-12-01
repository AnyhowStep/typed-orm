import { Column } from "./column";
import { ColumnMap } from "./column-map";
export declare namespace ColumnArrayUtil {
    type FromColumnMap<ColumnMapT extends ColumnMap> = (Column.UnionFromColumnMap<ColumnMapT>[]);
    function fromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): FromColumnMap<ColumnMapT>;
}
//# sourceMappingURL=column-array.d.ts.map