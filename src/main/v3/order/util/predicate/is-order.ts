import {Order} from "../../order";
import {isSortDirection} from "./is-sort-direction";
import {isSortExpr} from "./is-sort-expr";

export function isOrder (raw : any) : raw is Order {
    if (!(raw instanceof Array)) {
        return false;
    }
    if (raw.length != 2) {
        return false;
    }
    if (!isSortDirection(raw[1])) {
        return false;
    }
    if (!isSortExpr(raw[0])) {
        return false;
    }
    return true;
}