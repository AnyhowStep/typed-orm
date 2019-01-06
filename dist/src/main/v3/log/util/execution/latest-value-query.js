"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const latest_query_1 = require("./latest-query");
const column_map_1 = require("../../../column-map");
const column_identifier_map_1 = require("../../../column-identifier-map");
function latestValueQuery(log, entityIdentifier, delegate) {
    const columns = column_map_1.ColumnMapUtil.pick(log.table.columns, Object.keys(log.trackedDefaults));
    const column = delegate(columns);
    column_identifier_map_1.ColumnIdentifierMapUtil.assertHasColumnIdentifier(columns, column);
    return query_1.QueryUtil.select(latest_query_1.latestQuery(log, entityIdentifier), (() => [column]));
}
exports.latestValueQuery = latestValueQuery;
//# sourceMappingURL=latest-value-query.js.map