"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
const candidate_key_array_1 = require("../../../candidate-key-array");
const column_map_1 = require("../../../column-map");
const string_array_1 = require("../../../string-array");
function setAutoIncrement(table, delegate) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/24277
    const autoIncrement = delegate(columns);
    const key = [autoIncrement.name];
    if (candidate_key_array_1.CandidateKeyArrayUtil.hasSubKey(table.candidateKeys, key)) {
        throw new Error(`Cannot add ${key.join("|")} as candidate key of ${table.alias}; it is a super key of some candidate key`);
    }
    if (candidate_key_array_1.CandidateKeyArrayUtil.hasSuperKey(table.candidateKeys, key)) {
        throw new Error(`Cannot add ${key.join("|")} as candidate key of ${table.alias}; it is a sub key of some candidate key`);
    }
    column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, autoIncrement);
    const candidateKeys = string_array_1.StringArrayUtil.uniqueStringArray(table.candidateKeys.concat([
        [autoIncrement.name]
    ]));
    const generated = (table.generated.indexOf(autoIncrement.name) >= 0) ?
        table.generated :
        [
            ...table.generated,
            autoIncrement.name
        ];
    const hasExplicitDefaultValue = (table.hasExplicitDefaultValue.indexOf(autoIncrement.name) >= 0) ?
        table.hasExplicitDefaultValue :
        [
            ...table.hasExplicitDefaultValue,
            autoIncrement.name,
        ];
    const mutable = table.mutable.filter((columnName) => {
        return (columnName != autoIncrement.name);
    });
    const { usedRef, alias, isNullable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
    const result = new table_1.Table({
        usedRef,
        alias,
        columns,
        autoIncrement: autoIncrement.name,
        id: autoIncrement.name,
        primaryKey: [autoIncrement.name],
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
exports.setAutoIncrement = setAutoIncrement;
//# sourceMappingURL=set-auto-increment.js.map