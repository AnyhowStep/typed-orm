"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_found-rows
function foundRows() {
    return new expr_1.Expr({
        usedRef: {},
        assertDelegate: dataType.bigint(),
    }, new query_tree_1.FunctionCall("FOUND_ROWS", []));
}
exports.foundRows = foundRows;
//# sourceMappingURL=found-rows.js.map