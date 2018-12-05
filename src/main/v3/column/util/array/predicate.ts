import {IColumn} from "../../column";
import {isColumn} from "../predicate";

export function isColumnArray (raw : any) : raw is IColumn[] {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!isColumn(item)) {
            return false;
        }
    }
    return true;
}

export function assertIsColumnArray (raw : any) {
    if (!isColumnArray(raw)) {
        throw new Error(`Expected a column array`);
    }
}