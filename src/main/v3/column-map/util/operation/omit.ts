import {ColumnMap} from "../../column-map";
import {Omit} from "../../../type";

export function omit<
    MapT extends ColumnMap,
    ArrT extends string[]
>(
    map : MapT,
    arr : ArrT
) : Omit<MapT, ArrT[number]> {
    const result : any = {};
    for (let columnName in map) {
        if (arr.indexOf(columnName) < 0) {
            result[columnName] = map[columnName];
        }
    }
    return result;
}