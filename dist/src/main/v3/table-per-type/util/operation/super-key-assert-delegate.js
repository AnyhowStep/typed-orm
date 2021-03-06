"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const query_1 = require("../query");
function assertDelegateFromCandidateKey(candidateKey, table) {
    const assertMap = {};
    for (let columnName of query_1.uniqueColumnNames(table)) {
        const columns = query_1.getColumnsWithName(table, columnName);
        if (columns.length == 0) {
            throw new Error(`No columns found for ${table.alias}.${columnName}`);
        }
        if (candidateKey.indexOf(columnName) >= 0) {
            assertMap[columnName] = sd.unsafeDeepMerge(...columns.map(c => c.assertDelegate));
        }
        else {
            assertMap[columnName] = sd.optional(sd.unsafeDeepMerge(...columns.map(c => c.assertDelegate)));
        }
    }
    return sd.objectFromMap(assertMap);
}
function assertDelegateFromCandidateKeyArray(candidateKeyArr, table) {
    const arr = candidateKeyArr.map(candidateKey => assertDelegateFromCandidateKey(candidateKey, table));
    return sd.unsafeOr(...arr);
}
function superKeyAssertDelegate(table) {
    return assertDelegateFromCandidateKeyArray(
    //https://github.com/Microsoft/TypeScript/issues/28592
    table.candidateKeys, table);
}
exports.superKeyAssertDelegate = superKeyAssertDelegate;
//# sourceMappingURL=super-key-assert-delegate.js.map