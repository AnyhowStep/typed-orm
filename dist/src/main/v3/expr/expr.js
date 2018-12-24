"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_tree_1 = require("../query-tree");
const ExprUtil = require("./util");
class Expr {
    constructor(data, queryTree) {
        this.usedRef = data.usedRef;
        this.assertDelegate = data.assertDelegate;
        //Gotta' play it safe.
        //We want to preserve the order of operations.
        this.queryTree = query_tree_1.Parentheses.Create(queryTree);
    }
    as(alias) {
        return ExprUtil.as(this, alias);
    }
    asc() {
        return ExprUtil.asc(this);
    }
    desc() {
        return ExprUtil.desc(this);
    }
    sort(sortDirection) {
        return ExprUtil.sort(this, sortDirection);
    }
}
exports.Expr = Expr;
//# sourceMappingURL=expr.js.map