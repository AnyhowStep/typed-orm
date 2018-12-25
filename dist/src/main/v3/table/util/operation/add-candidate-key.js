"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
const column_map_1 = require("../../../column-map");
const candidate_key_array_1 = require("../../../candidate-key-array");
const string_array_1 = require("../../../string-array");
function addCandidateKey(table, delegate) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/24277
    const candidateKeyColumns = delegate(columns);
    for (let candidateKeyColumn of candidateKeyColumns) {
        column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, candidateKeyColumn);
    }
    const key = string_array_1.StringArrayUtil.uniqueString(candidateKeyColumns.map(candidateKeyColumn => candidateKeyColumn.name));
    if (candidate_key_array_1.CandidateKeyArrayUtil.hasSubKey(table.candidateKeys, key)) {
        throw new Error(`Cannot add ${key.join("|")} as candidate key of ${table.alias}; it is a super key of some candidate key`);
    }
    if (candidate_key_array_1.CandidateKeyArrayUtil.hasSuperKey(table.candidateKeys, key)) {
        throw new Error(`Cannot add ${key.join("|")} as candidate key of ${table.alias}; it is a sub key of some candidate key`);
    }
    const candidateKeys = table.candidateKeys.concat([key]);
    const { usedRef, alias, autoIncrement, id, generated, isNullable, hasExplicitDefaultValue, mutable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
    const result = new table_1.Table({
        usedRef,
        alias,
        columns,
        autoIncrement,
        id,
        candidateKeys,
        generated,
        isNullable,
        hasExplicitDefaultValue,
        mutable,
        parents,
        insertAllowed,
        deleteAllowed,
    }, { unaliasedQuery });
    return result;
}
exports.addCandidateKey = addCandidateKey;
//# sourceMappingURL=add-candidate-key.js.map