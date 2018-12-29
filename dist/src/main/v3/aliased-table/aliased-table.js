"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_map_1 = require("../column-map");
const sqlstring_1 = require("sqlstring");
const column_ref_1 = require("../column-ref");
const query_tree_1 = require("../query-tree");
class AliasedTable {
    constructor(data, { unaliasedQuery, }) {
        this.usedRef = data.usedRef;
        this.alias = data.alias;
        this.columns = data.columns;
        this.unaliasedQuery = unaliasedQuery;
    }
    queryTree() {
        return AliasedTable.queryTree(this);
    }
}
exports.AliasedTable = AliasedTable;
//TODO Move this to AliasedTableUtil
(function (AliasedTable) {
    /*
        `name`
        `name` AS `alias`
        (SELECT x) AS `alias`
    */
    function queryTree({ alias, unaliasedQuery, }) {
        const escapedAlias = sqlstring_1.escapeId(alias);
        if (unaliasedQuery === escapedAlias) {
            return unaliasedQuery;
        }
        return [
            unaliasedQuery,
            "AS",
            sqlstring_1.escapeId(alias),
        ];
    }
    AliasedTable.queryTree = queryTree;
    function isAliasedTable(raw) {
        return (raw != undefined &&
            (raw instanceof Object) &&
            ("usedRef" in raw) &&
            ("alias" in raw) &&
            ("columns" in raw) &&
            ("unaliasedQuery" in raw) &&
            column_ref_1.ColumnRefUtil.isColumnRef(raw.usedRef) &&
            (typeof raw.alias == "string") &&
            column_map_1.ColumnMapUtil.isColumnMap(raw.columns) &&
            query_tree_1.QueryTreeUtil.isQueryTree(raw.unaliasedQuery));
    }
    AliasedTable.isAliasedTable = isAliasedTable;
})(AliasedTable = exports.AliasedTable || (exports.AliasedTable = {}));
//# sourceMappingURL=aliased-table.js.map