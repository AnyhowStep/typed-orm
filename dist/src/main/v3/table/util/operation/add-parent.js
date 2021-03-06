"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const table_1 = require("../../table");
const key_1 = require("../../../key");
//+ Must share at least one unique key
//+ Duplicate columns must be assignable from child to parent
//  Example: child.type = "red"|"blue", parent.type = "red"|"blue"|"green"
//+ No duplicates
function addParent(table, parent) {
    if (key_1.KeyUtil.Array.isDisjoint(table.candidateKeys, parent.candidateKeys)) {
        throw new Error(`No common candidate keys found between table ${table.alias} and parent ${parent.alias}`);
    }
    ;
    if (table.alias == parent.alias) {
        throw new Error(`Parent ${table.alias} cannot have same alias as table`);
    }
    for (let otherParent of table.parents) {
        if (otherParent.alias == parent.alias) {
            throw new Error(`Parent ${parent.alias} already added to table`);
        }
    }
    //TODO-FEATURE Recursively find incompatible types
    for (let columnName in table.columns) {
        const parentColumn = parent.columns[columnName];
        if (parentColumn == undefined) {
            continue;
        }
        if (sd.canOutputNull(table.columns[columnName].assertDelegate) !=
            sd.canOutputNull(parentColumn.assertDelegate)) {
            throw new Error(`Parent ${parent.alias}.${columnName} and ${table.alias}.${columnName} have incompatible types; one is nullable, the other is not`);
        }
    }
    const parents = [
        ...table.parents,
        ...parent.parents,
        parent
    ];
    const { usedRef, alias, columns, autoIncrement, id, primaryKey, candidateKeys, generated, isNullable, hasExplicitDefaultValue, mutable, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
    return new table_1.Table({
        usedRef,
        alias,
        columns,
        autoIncrement,
        id,
        primaryKey,
        candidateKeys,
        generated,
        isNullable,
        hasExplicitDefaultValue,
        mutable,
        parents,
        insertAllowed,
        deleteAllowed,
    }, { unaliasedQuery });
}
exports.addParent = addParent;
//# sourceMappingURL=add-parent.js.map