import { ColumnIdentifierUtil } from "./column-identifier";
import { ColumnMap } from "./column-map";
export declare namespace ColumnIdentifierArrayUtil {
    type FromColumnMap<ColumnMapT extends ColumnMap> = (ColumnIdentifierUtil.UnionFromColumnMap<ColumnMapT>[]);
    function fromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): FromColumnMap<ColumnMapT>;
}
//# sourceMappingURL=column-identifier-array.d.ts.map