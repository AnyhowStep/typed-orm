import {ColumnIdentifierUtil} from "./column-identifier";
import {ColumnMap} from "./column-map";

export namespace ColumnIdentifierArrayUtil {
    export type FromColumnMap<ColumnMapT extends ColumnMap> = (
        ColumnIdentifierUtil.UnionFromColumnMap<ColumnMapT>[]
    );
    export function fromColumnMap<ColumnMapT extends ColumnMap> (
        columnMap : ColumnMapT
    ) : FromColumnMap<ColumnMapT> {
        const columnNames = Object.keys(columnMap) as Extract<keyof ColumnMapT, string>[];
        return columnNames.map((columnName) => ({
            tableAlias : columnMap[columnName].tableAlias,
            name : columnName,
        }));
    }
}