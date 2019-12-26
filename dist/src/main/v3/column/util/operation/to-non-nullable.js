"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const column_1 = require("../../column");
function toNonNullable({ tableAlias, name, assertDelegate, __isFromExprSelectItem, }) {
    return new column_1.Column({
        tableAlias,
        name,
        assertDelegate: sd.notNull(assertDelegate),
    }, __isFromExprSelectItem);
}
exports.toNonNullable = toNonNullable;
//# sourceMappingURL=to-non-nullable.js.map