"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
const exprLib = require("../../../../expr-library");
function fetchZeroOrOneByCk(connection, table, ck) {
    ck = table_1.TableUtil.candidateKeyAssertDelegate(table)(`${table.alias}.ck`, ck);
    const arr = Object.keys(ck).map(columnName => exprLib.nullSafeEq(table.columns[columnName], ck[columnName]));
    const condition = exprLib.and(...arr);
    return __1.QueryUtil.newInstance()
        .from(table)
        .where(() => condition)
        .select(c => [c])
        .fetchZeroOrOne(connection);
}
exports.fetchZeroOrOneByCk = fetchZeroOrOneByCk;
//# sourceMappingURL=fetch-zero-or-one-by-ck.js.map