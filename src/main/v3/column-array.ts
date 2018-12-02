import {Column, IColumn} from "./column";
import {ColumnMap} from "./column-map";

export namespace ColumnArrayUtil {
    export type FromColumnMap<ColumnMapT extends ColumnMap> = (
        Column.UnionFromColumnMap<ColumnMapT>[]
    )
    export function fromColumnMap<ColumnMapT extends ColumnMap> (
        columnMap : ColumnMapT
    ) : FromColumnMap<ColumnMapT> {
        return (Object.keys(columnMap) as Extract<keyof ColumnMapT, string>[])
            .map<Column.UnionFromColumnMap<ColumnMapT>>((columnName) => {
                return columnMap[columnName] as Column.UnionFromColumnMap<ColumnMapT>;
            });
    }
    export function isColumnArray (raw : any) : raw is IColumn[] {
        if (!(raw instanceof Array)) {
            return false;
        }
        for (let item of raw) {
            if (!Column.isColumn(item)) {
                return false;
            }
        }
        return true;
    }
}