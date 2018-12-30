"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const multi_table_update_1 = require("./multi-table-update");
function isSingleTableUpdatableQuery(query) {
    const tables = query._joins
        .map(j => j.aliasedTable)
        .filter(j => table_1.TableUtil.isTable(j));
    return (tables.length == 1);
}
exports.isSingleTableUpdatableQuery = isSingleTableUpdatableQuery;
function singleTableUpdate(query, modifier, delegate) {
    const tables = query._joins
        .map(j => j.aliasedTable)
        .filter(j => table_1.TableUtil.isTable(j));
    if (tables.length != 1) {
        throw new Error(`Expected one updatable table, found ${tables.length}`);
    }
    return multi_table_update_1.multiTableUpdate(query, modifier, c => {
        const result = delegate(c);
        const keys = Object.keys(result);
        if (keys.length == 1 && keys[0] == tables[0].alias) {
            return result;
        }
        else {
            return {
                [tables[0].alias]: result,
            };
        }
    });
}
exports.singleTableUpdate = singleTableUpdate;
//# sourceMappingURL=single-table-update.js.map