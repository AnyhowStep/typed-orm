"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../column");
function withTableAlias({ name, assertDelegate, __isFromExprSelectItem, }, newTableAlias) {
    const result = new column_1.Column({
        tableAlias: newTableAlias,
        name,
        assertDelegate,
    }, __isFromExprSelectItem);
    return result;
}
exports.withTableAlias = withTableAlias;
//# sourceMappingURL=with-table-alias.js.map