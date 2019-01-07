import {ColumnMap} from "../../../../column-map";
import * as Ctor from "../../constructor";

export function fromColumnMap<ColumnMapT extends ColumnMap> (
    columnMap : ColumnMapT
) : Ctor.FromColumnMap<ColumnMapT>[] {
    return Object.keys(columnMap).map(
        columnName => columnMap[columnName]
    ) as Ctor.FromColumnMap<ColumnMapT>[];
}