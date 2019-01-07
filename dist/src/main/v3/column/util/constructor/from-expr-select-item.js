"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../column");
//TODO-UNHACK Find some way to not need this hack
function fromExprSelectItem(item) {
    return new column_1.Column({
        tableAlias: item.tableAlias,
        name: item.alias,
        assertDelegate: item.assertDelegate,
    }, 
    //TODO-UNHACK Find some way to not need this hack
    true);
}
exports.fromExprSelectItem = fromExprSelectItem;
//# sourceMappingURL=from-expr-select-item.js.map