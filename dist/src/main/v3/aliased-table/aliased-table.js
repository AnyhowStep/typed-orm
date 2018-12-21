"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_map_1 = require("../column-map");
const sqlstring_1 = require("sqlstring");
const column_ref_1 = require("../column-ref");
class AliasedTable {
    constructor(data, __databaseName) {
        this.usedRef = data.usedRef;
        this.alias = data.alias;
        this.name = data.name;
        this.columns = data.columns;
        this.__databaseName = __databaseName;
    }
    queryTree() {
        return AliasedTable.queryTree(this);
    }
}
exports.AliasedTable = AliasedTable;
(function (AliasedTable) {
    function queryTree({ alias, name, __databaseName }) {
        const result = [];
        if (__databaseName != undefined) {
            result.push(sqlstring_1.escapeId(__databaseName));
            result.push(".");
        }
        if (name == alias) {
            result.push(sqlstring_1.escapeId(name));
        }
        else {
            result.push(sqlstring_1.escapeId(name));
            result.push(" AS ");
            result.push(sqlstring_1.escapeId(alias));
        }
        return result.join("");
    }
    AliasedTable.queryTree = queryTree;
    function isAliasedTable(raw) {
        return (raw != undefined &&
            (raw instanceof Object) &&
            ("usedRef" in raw) &&
            ("alias" in raw) &&
            ("name" in raw) &&
            ("columns" in raw) &&
            (raw.usedRef instanceof Object) &&
            (typeof raw.alias == "string") &&
            (typeof raw.name == "string") &&
            column_ref_1.ColumnRefUtil.isColumnRef(raw.usedRef) &&
            column_map_1.ColumnMapUtil.isColumnMap(raw.columns) &&
            (raw.__databaseName === undefined ||
                typeof raw.__databaseName == "string"));
    }
    AliasedTable.isAliasedTable = isAliasedTable;
})(AliasedTable = exports.AliasedTable || (exports.AliasedTable = {}));
//# sourceMappingURL=aliased-table.js.map