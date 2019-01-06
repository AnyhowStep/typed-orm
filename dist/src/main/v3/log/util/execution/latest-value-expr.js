"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const column_map_1 = require("../../../column-map");
const column_identifier_map_1 = require("../../../column-identifier-map");
const latest_value_query_1 = require("./latest-value-query");
function latestValueExpr(log, entityIdentifier, delegate) {
    const columns = column_map_1.ColumnMapUtil.pick(log.table.columns, Object.keys(log.trackedDefaults));
    const column = delegate(columns);
    column_identifier_map_1.ColumnIdentifierMapUtil.assertHasColumnIdentifier(columns, column);
    return query_1.QueryUtil.coalesce(latest_value_query_1.latestValueQuery(log, entityIdentifier, delegate), log.trackedDefaults[column.name]).as(column.name);
}
exports.latestValueExpr = latestValueExpr;
//# sourceMappingURL=latest-value-expr.js.map