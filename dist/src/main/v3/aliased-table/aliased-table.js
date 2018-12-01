"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
class AliasedTable {
    constructor(data, __databaseName) {
        this.alias = data.alias;
        this.name = data.name;
        this.columns = data.columns;
        this.__databaseName = __databaseName;
    }
    queryStringTree() {
        return AliasedTable.queryStringTree(this);
    }
}
exports.AliasedTable = AliasedTable;
(function (AliasedTable) {
    function queryStringTree({ alias, name, __databaseName }) {
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
    AliasedTable.queryStringTree = queryStringTree;
    function isAliasedTable(raw) {
        return (raw != undefined &&
            (raw instanceof Object) &&
            ("alias" in raw) &&
            ("name" in raw) &&
            ("columns" in raw) &&
            (typeof raw.alias == "string") &&
            (typeof raw.name == "string") &&
            (raw.columns instanceof Object));
    }
    AliasedTable.isAliasedTable = isAliasedTable;
})(AliasedTable = exports.AliasedTable || (exports.AliasedTable = {}));
//# sourceMappingURL=aliased-table.js.map