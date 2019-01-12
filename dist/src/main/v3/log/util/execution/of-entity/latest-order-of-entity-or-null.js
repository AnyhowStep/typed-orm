"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../../query");
const expr_1 = require("../../../../expr");
const latest_of_entity_1 = require("./latest-of-entity");
function latestOrderOfEntityOrNull(log) {
    const expr = expr_1.ExprUtil.fromRawExpr(query_1.QueryUtil.select(latest_of_entity_1.latestOfEntity(log), (() => [log.latestOrder[0]])));
    const result = expr.as(log.latestOrder[0].name);
    return result;
}
exports.latestOrderOfEntityOrNull = latestOrderOfEntityOrNull;
//# sourceMappingURL=latest-order-of-entity-or-null.js.map