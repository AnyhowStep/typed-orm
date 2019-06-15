"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const column_1 = require("../../column");
function toNullable({ tableAlias, name, assertDelegate, __isFromExprSelectItem, }) {
    return new column_1.Column({
        tableAlias,
        name,
        assertDelegate: sd.orNull(assertDelegate),
    }, __isFromExprSelectItem);
}
exports.toNullable = toNullable;
//# sourceMappingURL=to-nullable.js.map