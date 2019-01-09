"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_identifier_1 = require("../../../column-identifier");
function appendExprSelectItem(ref, item) {
    let map = ref[item.tableAlias];
    if (map == undefined) {
        map = {};
        ref[item.tableAlias] = map;
    }
    map[item.alias] = column_identifier_1.ColumnIdentifierUtil.fromExprSelectItem(item);
    return ref;
}
exports.appendExprSelectItem = appendExprSelectItem;
//# sourceMappingURL=from-expr-select-item.js.map