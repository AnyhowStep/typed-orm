import {Sort, Order, ASC, DESC} from "../order";
import {ColumnIdentifierUtil} from "../../column-identifier";
import {ExprUtil} from "../../expr";

export function isSort (raw : any) : raw is Sort {
    return (
        raw === ASC ||
        raw === DESC
    );
}
export function isOrder (raw : any) : raw is Order {
    if (!(raw instanceof Array)) {
        return false;
    }
    if (raw.length != 2) {
        return false;
    }
    if (!isSort(raw[1])) {
        return false;
    }
    if (
        !ColumnIdentifierUtil.isColumnIdentifier(raw[0]) &&
        !ExprUtil.isExpr(raw[0])
    ) {
        return false;
    }
    return true;
}