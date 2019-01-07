"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isColumn(raw) {
    return (raw != undefined &&
        (raw instanceof Object) &&
        ("tableAlias" in raw) &&
        ("name" in raw) &&
        ("assertDelegate" in raw) &&
        (typeof raw.tableAlias == "string") &&
        (typeof raw.name == "string") &&
        (typeof raw.assertDelegate == "function") &&
        ("__isFromExprSelectItem" in raw) &&
        (typeof raw.__isFromExprSelectItem == "boolean"));
}
exports.isColumn = isColumn;
//# sourceMappingURL=is-column.js.map