"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../../column");
const expr_select_item_1 = require("../../../expr-select-item");
const column_map_1 = require("../../../column-map");
const column_ref_1 = require("../../../column-ref");
const from_column_1 = require("./from-column");
const from_expr_select_item_1 = require("./from-expr-select-item");
const from_column_map_1 = require("./from-column-map");
const from_column_ref_1 = require("./from-column-ref");
function appendSelectItem(ref, item) {
    if (column_1.ColumnUtil.isColumn(item)) {
        from_column_1.appendColumn(ref, item);
    }
    else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(item)) {
        from_expr_select_item_1.appendExprSelectItem(ref, item);
    }
    else if (column_map_1.ColumnMapUtil.isColumnMap(item)) {
        from_column_map_1.appendColumnMap(ref, item);
    }
    else if (column_ref_1.ColumnRefUtil.isColumnRef(item)) {
        from_column_ref_1.appendColumnRef(ref, item);
    }
    else {
        throw new Error(`Unknown select item`);
    }
    return ref;
}
exports.appendSelectItem = appendSelectItem;
//# sourceMappingURL=from-select-item.js.map