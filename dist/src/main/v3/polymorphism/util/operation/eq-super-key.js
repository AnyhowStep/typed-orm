"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exprLib = require("../../../expr-library");
const super_key_assert_delegate_1 = require("./super-key-assert-delegate");
function eqSuperKey(table, sk) {
    const assertDelegate = super_key_assert_delegate_1.superKeyAssertDelegate(table);
    sk = assertDelegate(`${table.alias}.sk`, sk);
    const arr = Object.keys(sk)
        .sort()
        .map(columnName => {
        if (columnName in table.columns) {
            return exprLib.nullSafeEq(table.columns[columnName], sk[columnName]);
        }
        //TODO-DEBATE is it better to check downwards
        //or upwards?
        for (let i = table.parents.length - 1; i >= 0; --i) {
            const p = table.parents[i];
            if (columnName in p.columns) {
                return exprLib.nullSafeEq(p.columns[columnName], sk[columnName]);
            }
        }
        throw new Error(`Column ${columnName} does not exist in table ${table.alias} or its parents`);
    });
    const condition = exprLib.and(...arr);
    return condition;
}
exports.eqSuperKey = eqSuperKey;
//# sourceMappingURL=eq-super-key.js.map