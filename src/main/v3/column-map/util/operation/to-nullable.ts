import {ColumnMap, WritableColumnMap} from "../../column-map";
import {ColumnUtil} from "../../../column";

export type ToNullable<ColumnMapT extends ColumnMap> = (
    {
        readonly [columnName in keyof ColumnMapT] : (
            ColumnUtil.ToNullable<ColumnMapT[columnName]>
        )
    }
);
export function toNullable<ColumnMapT extends ColumnMap> (
    columnMap : ColumnMapT
) : ToNullable<ColumnMapT> {
    const result : WritableColumnMap = {};
    for (let columnName in columnMap) {
        result[columnName] = ColumnUtil.toNullable(columnMap[columnName]);
    }
    return result as ToNullable<ColumnMapT>;
}