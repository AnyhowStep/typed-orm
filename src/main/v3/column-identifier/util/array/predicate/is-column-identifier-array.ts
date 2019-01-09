import {ColumnIdentifier} from "../../../column-identifier";
import {isColumnIdentifier} from "../../predicate";

export function isColumnIdentifierArray (raw : any) : raw is ColumnIdentifier[] {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!isColumnIdentifier(item)) {
            return false;
        }
    }
    return true;
}
