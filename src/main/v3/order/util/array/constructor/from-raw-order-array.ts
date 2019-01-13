import {RawOrder, Order, ASC} from "../../../order";

export function fromRawOrderArray (rawOrders : RawOrder[]) : Order[] {
    return rawOrders.map((rawOrder) : Order => {
        if (rawOrder instanceof Array) {
            return rawOrder;
        } else {
            //Default to ASC
            return [rawOrder, ASC];
        }
    });
}