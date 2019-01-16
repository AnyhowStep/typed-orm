import {ColumnMap} from "../../column-map";
import {ColumnUtil} from "../../../column";

export function isColumnMap (raw : any) : raw is ColumnMap {
    if (!(raw instanceof Object)) {
        return false;
    }
    if (raw instanceof Array) {
        return false;
    }
    if (raw instanceof Function) {
        return false;
    }
    if (raw instanceof Date) {
        return false;
    }
    for (let columnName in raw) {
        const column = raw[columnName];
        if (!ColumnUtil.isColumn(column)) {
            return false;
        }
    }
    return true;
}