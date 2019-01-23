"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const fetch_latest_value_or_undefined_1 = require("./fetch-latest-value-or-undefined");
const column_identifier_map_1 = require("../../../column-identifier-map");
const column_map_1 = require("../../../column-map");
async function fetchLatestValueOrDefault(log, connection, entityIdentifier, delegate) {
    const result = await fetch_latest_value_or_undefined_1.fetchLatestValueOrUndefined(log, connection, entityIdentifier, delegate);
    if (result !== undefined) {
        return result;
    }
    //If the entity does not exist, there is no default value
    await query_1.QueryUtil.assertExistsByCk(connection, log.entity, entityIdentifier);
    const columns = column_map_1.ColumnMapUtil.pick(log.table.columns, log.tracked);
    const column = delegate(columns);
    column_identifier_map_1.ColumnIdentifierMapUtil.assertHasColumnIdentifier(columns, column);
    return log.trackedDefaults[column.name];
}
exports.fetchLatestValueOrDefault = fetchLatestValueOrDefault;
//# sourceMappingURL=fetch-latest-value-or-default.js.map