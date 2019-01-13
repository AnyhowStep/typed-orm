"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
const exprLib = require("../../../expr-library");
const primary_key_1 = require("../../../primary-key");
function eqPrimaryKey(table, ck) {
    const assertDelegate = (table instanceof table_1.Table) ?
        table.primaryKeyAssertDelegate() :
        primary_key_1.PrimaryKeyUtil.assertDelegate(table);
    ck = assertDelegate(`${table.alias}.ck`, ck);
    const arr = Object.keys(ck).sort().map(columnName => exprLib.nullSafeEq(table.columns[columnName], ck[columnName]));
    const condition = exprLib.and(...arr);
    return condition;
}
exports.eqPrimaryKey = eqPrimaryKey;
//# sourceMappingURL=eq-primary-key.js.map