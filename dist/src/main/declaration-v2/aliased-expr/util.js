"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_expr_1 = require("./aliased-expr");
var AliasedExprUtil;
(function (AliasedExprUtil) {
    function withType(aliasedExpr, newAssertDelegate) {
        return new aliased_expr_1.AliasedExpr(aliasedExpr.usedReferences, aliasedExpr.tableAlias, aliasedExpr.alias, newAssertDelegate, aliasedExpr.originalQuery);
    }
    AliasedExprUtil.withType = withType;
    ;
})(AliasedExprUtil = exports.AliasedExprUtil || (exports.AliasedExprUtil = {}));
//# sourceMappingURL=util.js.map