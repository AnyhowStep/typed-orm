"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const column_map_1 = require("../../../column-map");
const column_identifier_map_1 = require("../../../column-identifier-map");
const latest_value_sub_query_1 = require("./latest-value-sub-query");
function latestValueSubExpr(log, delegate) {
    const columns = column_map_1.ColumnMapUtil.pick(log.table.columns, Object.keys(log.trackedDefaults));
    const column = delegate(columns);
    column_identifier_map_1.ColumnIdentifierMapUtil.assertHasColumnIdentifier(columns, column);
    return query_1.QueryUtil.coalesce(latest_value_sub_query_1.latestValueSubQuery(log, delegate), log.trackedDefaults[column.name]).as(column.name);
}
exports.latestValueSubExpr = latestValueSubExpr;
//# sourceMappingURL=latest-value-sub-expr.js.map