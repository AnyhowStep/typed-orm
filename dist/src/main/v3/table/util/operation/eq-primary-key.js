"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
const exprLib = require("../../../expr-library");
const primary_key_1 = require("../../../primary-key");
function eqPrimaryKey(table, pk) {
    const assertDelegate = (table instanceof table_1.Table) ?
        table.primaryKeyAssertDelegate() :
        primary_key_1.PrimaryKeyUtil.assertDelegate(table);
    pk = assertDelegate(`${table.alias}.pk`, pk);
    const arr = Object.keys(pk).sort().map(columnName => exprLib.nullSafeEq(table.columns[columnName], pk[columnName]));
    const condition = exprLib.and(...arr);
    return condition;
}
exports.eqPrimaryKey = eqPrimaryKey;
//# sourceMappingURL=eq-primary-key.js.map