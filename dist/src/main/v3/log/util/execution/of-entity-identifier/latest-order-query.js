"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../../query");
const latest_1 = require("./latest");
function latestOrderQuery(log, entityIdentifier) {
    return query_1.QueryUtil.select(latest_1.latest(log, entityIdentifier), (() => [log.latestOrder[0]]));
}
exports.latestOrderQuery = latestOrderQuery;
//# sourceMappingURL=latest-order-query.js.map