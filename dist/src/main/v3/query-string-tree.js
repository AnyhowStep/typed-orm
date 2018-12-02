"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryStringTreeUtil;
(function (QueryStringTreeUtil) {
    function isQueryStringTree(raw) {
        if (typeof raw == "string") {
            return true;
        }
        if (raw instanceof Array) {
            for (let item of raw) {
                if (!isQueryStringTree(item)) {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    QueryStringTreeUtil.isQueryStringTree = isQueryStringTree;
})(QueryStringTreeUtil = exports.QueryStringTreeUtil || (exports.QueryStringTreeUtil = {}));
//# sourceMappingURL=query-string-tree.js.map