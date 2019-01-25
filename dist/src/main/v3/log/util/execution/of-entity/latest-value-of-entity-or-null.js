"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../../query");
const latest_of_entity_1 = require("./latest-of-entity");
const column_map_1 = require("../../../../column-map");
const column_identifier_map_1 = require("../../../../column-identifier-map");
const expr_1 = require("../../../../expr");
function latestValueOfEntityOrNull(log, delegate) {
    const columns = column_map_1.ColumnMapUtil.pick(log.table.columns, [
        ...log.tracked,
        ...log.doNotCopy,
    ]);
    const column = delegate(columns);
    column_identifier_map_1.ColumnIdentifierMapUtil.assertHasColumnIdentifier(columns, column);
    const expr = expr_1.ExprUtil.fromRawExpr(query_1.QueryUtil.select(latest_of_entity_1.latestOfEntity(log), (() => [column])));
    const result = expr.as(column.name);
    return result;
}
exports.latestValueOfEntityOrNull = latestValueOfEntityOrNull;
//# sourceMappingURL=latest-value-of-entity-or-null.js.map