import {Sort, OrderExpr, Order, ASC, DESC} from "../order";
import {ColumnUtil} from "../../column";
import {ExprUtil} from "../../expr";

export function isSort (raw : any) : raw is Sort {
    return (
        raw === ASC ||
        raw === DESC
    );
}
export function isOrderExpr (raw : any) : raw is OrderExpr {
    return (
        ColumnUtil.isColumn(raw) ||
        ExprUtil.isExpr(raw)
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
    if (!isOrderExpr(raw[0])) {
        return false;
    }
    return true;
}