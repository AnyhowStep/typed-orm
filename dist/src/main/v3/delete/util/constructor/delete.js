"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_1 = require("../../delete");
const table_1 = require("../../../table");
function deletableTableArray(query) {
    const result = [];
    for (let join of query._joins) {
        if (table_1.TableUtil.isTable(join.aliasedTable) && join.aliasedTable.deleteAllowed) {
            result.push(join.aliasedTable);
        }
    }
    return result;
}
exports.deletableTableArray = deletableTableArray;
function del(query, modifier, delegate) {
    const options = deletableTableArray(query);
    const selected = delegate(options.reduce((memo, table) => {
        memo[table.alias] = table;
        return memo;
    }, {}));
    if (selected.length == 0) {
        throw new Error(`Cannot delete from zero tables`);
    }
    const tables = [];
    const alreadySeen = new Set();
    for (let s of selected) {
        if (alreadySeen.has(s.alias)) {
            continue;
        }
        alreadySeen.add(s.alias);
        const table = options.find(o => o.alias == s.alias);
        if (table == undefined) {
            throw new Error(`Cannot delete from table ${s.alias}`);
        }
        if (!table.deleteAllowed) {
            throw new Error(`Cannot delete from table ${s.alias}; explicitly not allowed`);
        }
        tables.push(table);
    }
    return new delete_1.Delete({
        _query: query,
        _tables: tables,
        _modifier: modifier,
    });
}
exports.delete = del;
//# sourceMappingURL=delete.js.map