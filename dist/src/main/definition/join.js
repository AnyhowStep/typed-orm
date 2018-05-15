"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            nullable: true,
            from: e.from,
            to: e.to,
        };
    });
}
exports.toNullableJoinTuple = toNullableJoinTuple;
//# sourceMappingURL=join.js.map