"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ctor = require("../../constructor");
const column_1 = require("../../../../column");
const expr_select_item_1 = require("../../../../expr-select-item");
const column_map_1 = require("../../../../column-map");
const column_ref_1 = require("../../../../column-ref");
const from_column_map_1 = require("./from-column-map");
const from_column_ref_1 = require("./from-column-ref");
function fromSelectItem(selectItem) {
    if (column_1.ColumnUtil.isColumn(selectItem)) {
        return [Ctor.fromColumn(selectItem)];
    }
    else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(selectItem)) {
        return [Ctor.fromExprSelectItem(selectItem)];
    }
    else if (column_map_1.ColumnMapUtil.isColumnMap(selectItem)) {
        return from_column_map_1.fromColumnMap(selectItem);
    }
    else if (column_ref_1.ColumnRefUtil.isColumnRef(selectItem)) {
        return from_column_ref_1.fromColumnRef(selectItem);
    }
    else {
        throw new Error(`Unknown select item`);
    }
}
exports.fromSelectItem = fromSelectItem;
//# sourceMappingURL=from-select-item.js.map