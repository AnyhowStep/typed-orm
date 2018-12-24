"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../expr");
const constants_1 = require("../../../constants");
function as(expr, alias) {
    const result = new expr_1.Expr(expr, expr.queryTree);
    result.tableAlias = constants_1.ALIASED;
    result.alias = alias;
    result.unaliasedQuery = expr.queryTree;
    return result;
}
exports.as = as;
//# sourceMappingURL=as.js.map