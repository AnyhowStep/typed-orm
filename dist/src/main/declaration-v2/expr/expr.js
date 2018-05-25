"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_expr_1 = require("../aliased-expr");
class Expr {
    constructor(usedReferences, assertDelegate, originalQuery) {
        this.usedReferences = usedReferences;
        this.assertDelegate = assertDelegate;
        this.originalQuery = originalQuery;
        //These tests introduce more risk that a query will be evaluated incorrectly
        if (/\s/.test(originalQuery)) {
            this.query = `(${originalQuery})`;
        }
        else {
            this.query = originalQuery;
        }
    }
    querify(sb) {
        sb.append(this.query);
    }
    as(alias) {
        return new aliased_expr_1.AliasedExpr(this.usedReferences, "__expr", alias, this.assertDelegate, this.query);
    }
}
exports.Expr = Expr;
//# sourceMappingURL=expr.js.map