"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
//import {IColumn} from "../../../column";
const table_1 = require("../../table");
const add_candidate_key_1 = require("./add-candidate-key");
function setPrimaryKey(table, delegate) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/24277
    const primaryKeyColumns = delegate(columns);
    for (let c of primaryKeyColumns) {
        if (sd.isNullable(c.assertDelegate)) {
            throw new Error(`A primary key cannot have a nullable column; ${c.tableAlias}.${c.name} is nullable`);
        }
    }
    const withCandidateKey = add_candidate_key_1.addCandidateKey(table, (() => primaryKeyColumns));
    const { usedRef, alias, autoIncrement, id, candidateKeys, generated, isNullable, hasExplicitDefaultValue, mutable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = withCandidateKey;
    const result = new table_1.Table({
        usedRef,
        alias,
        columns,
        autoIncrement,
        id,
        primaryKey: (primaryKeyColumns.map(c => c.name)),
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
exports.setPrimaryKey = setPrimaryKey;
//# sourceMappingURL=set-primary-key.js.map