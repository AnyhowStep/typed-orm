import {ColumnMap} from "../../column-map";

export function pick<
    MapT extends ColumnMap,
    ArrT extends string[]
>(
    map : MapT,
    arr : ArrT
) : Pick<MapT, ArrT[number]> {
    const result : any = {};
    for (let columnName in map) {
        if (arr.indexOf(columnName) >= 0) {
            result[columnName] = map[columnName];
        }
    }
    return result;
}