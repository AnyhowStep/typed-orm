"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const column_1 = require("../../column");
function toNullable({ tableAlias, name, assertDelegate, __isFromExprSelectItem, }) {
    return new column_1.Column({
        tableAlias,
        name,
        assertDelegate: sd.nullable(assertDelegate),
    }, __isFromExprSelectItem);
}
exports.toNullable = toNullable;
//# sourceMappingURL=to-nullable.js.map