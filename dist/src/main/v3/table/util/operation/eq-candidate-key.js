"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
const exprLib = require("../../../expr-library");
const candidate_key_1 = require("../../../candidate-key");
function eqCandidateKey(table, ck) {
    const assertDelegate = (table instanceof table_1.Table) ?
        table.candidateKeyAssertDelegate() :
        candidate_key_1.CandidateKeyUtil.assertDelegate(table);
    ck = assertDelegate(`${table.alias}.ck`, ck);
    const arr = Object.keys(ck).sort().map(columnName => exprLib.nullSafeEq(table.columns[columnName], ck[columnName]));
    const condition = exprLib.and(...arr);
    return condition;
}
exports.eqCandidateKey = eqCandidateKey;
//# sourceMappingURL=eq-candidate-key.js.map