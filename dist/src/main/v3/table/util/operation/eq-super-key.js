"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
const exprLib = require("../../../expr-library");
const super_key_1 = require("../../../super-key");
function eqSuperKey(table, sk) {
    const assertDelegate = (table instanceof table_1.Table) ?
        table.superKeyAssertDelegate() :
        super_key_1.SuperKeyUtil.assertDelegate(table);
    sk = assertDelegate(`${table.alias}.sk`, sk);
    const arr = Object.keys(sk).sort().map(columnName => exprLib.nullSafeEq(table.columns[columnName], sk[columnName]));
    const condition = exprLib.and(...arr);
    return condition;
}
exports.eqSuperKey = eqSuperKey;
//# sourceMappingURL=eq-super-key.js.map