"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_util_1 = require("@anyhowstep/type-util");
const column_references_operation_1 = require("./column-references-operation");
const column_1 = require("./column");
function getJoinFrom(columnReferences, callback) {
    if (callback instanceof Array) {
        return callback;
    }
    else {
        return callback(columnReferences);
    }
}
exports.getJoinFrom = getJoinFrom;
function getJoinTo(table, callback) {
    if (callback instanceof Array) {
        return callback;
    }
    else {
        return callback(table.columns);
    }
}
exports.getJoinTo = getJoinTo;
function getJoinToUsingFrom(table, fromTuple) {
    return fromTuple.map((f) => {
        const column = table.columns[f.name];
        if (column == undefined) {
            throw new Error(`Table ${table.alias} does not have column ${f.name}`);
        }
        return column;
    });
}
exports.getJoinToUsingFrom = getJoinToUsingFrom;
function toNullableJoinTuple(tuple) {
    return tuple.map((e) => {
        return {
            joinType: e.joinType,
            table: e.table,
            columnReferences: e.columnReferences,
            nullable: true,
            from: e.from,
            to: e.to,
        };
    });
}
exports.toNullableJoinTuple = toNullableJoinTuple;
function replaceColumnOfJoin(join, newColumn) {
    return type_util_1.spread(join, {
        columnReferences: column_references_operation_1.replaceColumnOfReference(join.columnReferences, newColumn)
    });
}
exports.replaceColumnOfJoin = replaceColumnOfJoin;
function replaceColumnOfJoinTuple(joinTuple, newColumn) {
    const result = [];
    for (let join of joinTuple) {
        result.push(replaceColumnOfJoin(join, newColumn));
    }
    return result;
}
exports.replaceColumnOfJoinTuple = replaceColumnOfJoinTuple;
function nullableJoinTableNames(joins) {
    return joins
        .filter(j => j.nullable)
        .map(j => j.table.alias);
}
exports.nullableJoinTableNames = nullableJoinTableNames;
function assertDelegateOfJoinTuple(joins, table, name) {
    const result = joins
        .filter((j) => {
        return (j.table.alias == table &&
            (j.columnReferences[table] instanceof Object) &&
            (j.columnReferences[table][name] instanceof column_1.Column));
    });
    if (result.length == 0) {
        throw new Error(`No such column ${table}.${name} in joins`);
    }
    if (result.length != 1) {
        throw new Error(`Should not have multiple columns ${table}.${name} in joins`);
    }
    return result[0].columnReferences[table][name].assertDelegate;
}
exports.assertDelegateOfJoinTuple = assertDelegateOfJoinTuple;
//# sourceMappingURL=join.js.map