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