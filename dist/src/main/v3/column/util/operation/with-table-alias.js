"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../column");
function withTableAlias({ name, assertDelegate, __subTableName, __isInSelectClause, }, newTableAlias) {
    const result = new column_1.Column({
        tableAlias: newTableAlias,
        name,
        assertDelegate,
    }, __subTableName, __isInSelectClause);
    return result;
}
exports.withTableAlias = withTableAlias;
//# sourceMappingURL=with-table-alias.js.map