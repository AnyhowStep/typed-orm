"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../column");
function withType({ tableAlias, name, __isFromExprSelectItem, }, newAssertFunc) {
    return new column_1.Column({
        tableAlias,
        name,
        assertDelegate: newAssertFunc,
    }, __isFromExprSelectItem);
}
exports.withType = withType;
//# sourceMappingURL=with-type.js.map