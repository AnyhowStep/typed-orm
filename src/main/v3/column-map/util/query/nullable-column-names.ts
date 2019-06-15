import * as sd from "type-mapping";
import {ColumnMap} from "../../column-map";

export type NullableColumnNames<MapT extends ColumnMap> = (
    MapT extends ColumnMap ?
    {
        [columnName in Extract<keyof MapT, string>] : (
            null extends ReturnType<MapT[columnName]["assertDelegate"]> ?
            columnName :
            never
        )
    }[Extract<keyof MapT, string>] :
    never
);
export function nullableColumnNames<MapT extends ColumnMap> (
    columnMap : MapT
) : NullableColumnNames<MapT>[] {
    return Object.keys(columnMap)
        .filter(columnName => sd.canOutputNull(
            columnMap[columnName].assertDelegate
        )) as NullableColumnNames<MapT>[];
}