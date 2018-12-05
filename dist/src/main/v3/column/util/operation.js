"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const column_1 = require("../column");
function toNullable({ tableAlias, name, assertDelegate, __subTableName, __isInSelectClause, }) {
    return new column_1.Column({
        tableAlias,
        name,
        assertDelegate: sd.nullable(assertDelegate),
    }, __subTableName, __isInSelectClause);
}
exports.toNullable = toNullable;
function withTableAlias({ name, assertDelegate, __subTableName, __isInSelectClause, }, newTableAlias) {
    const result = new column_1.Column({
        tableAlias: newTableAlias,
        name,
        assertDelegate,
    }, __subTableName, __isInSelectClause);
    return result;
}
exports.withTableAlias = withTableAlias;
function withType({ tableAlias, name, __subTableName, __isInSelectClause, }, newAssertFunc) {
    return new column_1.Column({
        tableAlias,
        name,
        assertDelegate: sd.toAssertDelegate(newAssertFunc),
    }, __subTableName, __isInSelectClause);
}
exports.withType = withType;
//# sourceMappingURL=operation.js.map