"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_count
function count() {
    const result = new expr_1.Expr({
        usedRef: {},
        assertDelegate: dataType.bigint(),
    }, new query_tree_1.FunctionCall("COUNT", [
        "*"
    ]));
    return result;
}
exports.count = count;
//# sourceMappingURL=count.js.map