"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {AnyFetchRow} from "../fetch-row";
var AggregateDelegateUtil;
(function (AggregateDelegateUtil) {
    function aggregate(fetchRow, aggregateDelegate) {
        if (aggregateDelegate == undefined) {
            return fetchRow;
        }
        else {
            return aggregateDelegate(fetchRow);
        }
    }
    AggregateDelegateUtil.aggregate = aggregate;
})(AggregateDelegateUtil = exports.AggregateDelegateUtil || (exports.AggregateDelegateUtil = {}));
//# sourceMappingURL=util.js.map