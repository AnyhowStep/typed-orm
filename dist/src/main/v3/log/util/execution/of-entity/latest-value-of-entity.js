"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../../query");
const latest_value_of_entity_or_null_1 = require("./latest-value-of-entity-or-null");
function latestValueOfEntity(log, delegate) {
    const expr = latest_value_of_entity_or_null_1.latestValueOfEntityOrNull(log, delegate);
    return query_1.QueryUtil.coalesce(expr, log.trackedDefaults[expr.alias]).as(expr.alias);
}
exports.latestValueOfEntity = latestValueOfEntity;
//# sourceMappingURL=latest-value-of-entity.js.map