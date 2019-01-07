"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const column_1 = require("../../column");
function withType({ tableAlias, name, __subTableName, __isInSelectClause, }, newAssertFunc) {
    return new column_1.Column({
        tableAlias,
        name,
        assertDelegate: sd.toAssertDelegate(newAssertFunc),
    }, __subTableName, __isInSelectClause);
}
exports.withType = withType;
//# sourceMappingURL=with-type.js.map