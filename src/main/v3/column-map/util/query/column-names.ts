import {ColumnMap} from "../../column-map";

//Technically, this could be wrong.
//But it shouldn't be wrong, in general.
export type ColumnNames<MapT extends ColumnMap> = (
    MapT extends ColumnMap ?
    Extract<keyof MapT, string> :
    never
);
export function columnNames<MapT extends ColumnMap> (
    columnMap : MapT
) : ColumnNames<MapT>[] {
    //Technically, this could be wrong.
    //But it shouldn't be wrong, in general.
    return Object.keys(columnMap) as ColumnNames<MapT>[];
}