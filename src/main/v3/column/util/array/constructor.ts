import {ColumnMap} from "../../../column-map";
import * as Ctor from "../constructor";

export type FromColumnMap<ColumnMapT extends ColumnMap> = (
    Ctor.FromColumnMap<ColumnMapT>[]
)
export function fromColumnMap<ColumnMapT extends ColumnMap> (
    columnMap : ColumnMapT
) : FromColumnMap<ColumnMapT> {
    return Object.keys(columnMap).map(
        columnName => columnMap[columnName]
    ) as FromColumnMap<ColumnMapT>;
}