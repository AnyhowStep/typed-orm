"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("typed-mysql");
class AliasedExpr {
    constructor(usedReferences, tableAlias, alias, assertDelegate, originalQuery) {
        this.usedReferences = usedReferences;
        this.tableAlias = tableAlias;
        this.alias = alias;
        this.assertDelegate = assertDelegate;
        this.originalQuery = originalQuery;
        const queryAlias = mysql.escapeId(`${tableAlias}--${alias}`);
        //These tests introduce more risk that a query will be evaluated incorrectly
        if (/\s/.test(originalQuery)) {
            this.query = `(${originalQuery}) AS ${queryAlias}`;
        }
        else {
            this.query = `${originalQuery} AS ${queryAlias}`;
        }
    }
    querify(sb) {
        sb.append(this.query);
    }
}
exports.AliasedExpr = AliasedExpr;
//# sourceMappingURL=aliased-expr.js.map