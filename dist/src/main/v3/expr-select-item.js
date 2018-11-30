"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExprSelectItemUtil;
(function (ExprSelectItemUtil) {
    function isExprSelectItem(raw) {
        return (raw != undefined &&
            (raw instanceof Object) &&
            ("usedRef" in raw) &&
            ("assertDelegate" in raw) &&
            ("tableAlias" in raw) &&
            ("alias" in raw) &&
            ("unaliasedQuery" in raw) &&
            (raw.usedRef instanceof Object) &&
            (typeof raw.assertDelegate == "function") &&
            (typeof raw.tableAlias == "string") &&
            (typeof raw.alias == "string") &&
            (typeof raw.unaliasedQuery == "string"));
    }
    ExprSelectItemUtil.isExprSelectItem = isExprSelectItem;
})(ExprSelectItemUtil = exports.ExprSelectItemUtil || (exports.ExprSelectItemUtil = {}));
//# sourceMappingURL=expr-select-item.js.map