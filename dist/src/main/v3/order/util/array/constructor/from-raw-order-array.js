"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../../order");
function fromRawOrderArray(rawOrders) {
    return rawOrders.map((rawOrder) => {
        if (rawOrder instanceof Array) {
            return rawOrder;
        }
        else {
            //Default to ASC
            return [rawOrder, order_1.ASC];
        }
    });
}
exports.fromRawOrderArray = fromRawOrderArray;
//# sourceMappingURL=from-raw-order-array.js.map