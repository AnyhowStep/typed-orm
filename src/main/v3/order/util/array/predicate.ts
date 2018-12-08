import {Order} from "../../order";
import {isOrder} from "../predicate";

export function isOrderArray (raw : any) : raw is Order[] {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!isOrder(item)) {
            return false;
        }
    }
    return true;
}