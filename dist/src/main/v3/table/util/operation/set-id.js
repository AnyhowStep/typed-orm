"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const table_1 = require("../../table");
const key_1 = require("../../../key");
const column_map_1 = require("../../../column-map");
function setId(table, delegate) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/24277
    const id = delegate(columns);
    if (sd.isNullable(id.assertDelegate)) {
        throw new Error(`A primary key cannot have a nullable column; ${id.tableAlias}.${id.name} is nullable`);
    }
    const key = [id.name];
    if (key_1.KeyUtil.Array.hasSubKey(table.candidateKeys, key)) {
        throw new Error(`Cannot add ${key.join("|")} as candidate key of ${table.alias}; it is a super key of some candidate key`);
    }
    if (key_1.KeyUtil.Array.hasSuperKey(table.candidateKeys, key)) {
        throw new Error(`Cannot add ${key.join("|")} as candidate key of ${table.alias}; it is a sub key of some candidate key`);
    }
    column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, id);
    const candidateKeys = table.candidateKeys.concat([
        [id.name]
    ]);
    const { usedRef, alias, autoIncrement, generated, isNullable, hasExplicitDefaultValue, mutable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
    const result = new table_1.Table({
        usedRef,
        alias,
        columns,
        autoIncrement,
        id: id.name,
        primaryKey: [id.name],
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
exports.setId = setId;
//# sourceMappingURL=set-id.js.map