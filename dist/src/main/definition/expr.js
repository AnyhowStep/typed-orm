"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const typed_mysql_1 = require("typed-mysql");
class ColumnExpr {
    constructor(usedReferences, table, name, assert, originalQuery) {
        this.usedReferences = usedReferences;
        this.table = table;
        this.name = name;
        this.assertDelegate = sd.toAssertDelegateExact(assert);
        const alias = typed_mysql_1.Database.EscapeId(`${table}--${name}`);
        //const alias = Database.EscapeId(`${name}`);
        this.originalQuery = originalQuery;
        //TODO
        //These tests introduce more risk that a query will be evaluated incorrectly
        if (/\s/.test(originalQuery) && !/^\(.+\)$/.test(originalQuery)) {
            this.query = `(${originalQuery}) AS ${alias}`;
        }
        else {
            this.query = `${originalQuery} AS ${alias}`;
        }
    }
    querify(sb) {
        sb.append(this.query);
    }
}
exports.ColumnExpr = ColumnExpr;
class Expr {
    constructor(usedReferences, assert, originalQuery) {
        this.usedReferences = usedReferences;
        this.assertDelegate = sd.toAssertDelegateExact(assert);
        //TODO
        //These tests introduce more risk that a query will be evaluated incorrectly
        if (/\s/.test(originalQuery)) {
            this.query = `(${originalQuery})`;
        }
        else {
            this.query = originalQuery;
        }
    }
    as(alias) {
        return new ColumnExpr(this.usedReferences, "__expr", alias, this.assertDelegate, this.query);
    }
    querify(sb) {
        sb.append(this.query);
    }
}
exports.Expr = Expr;
//# sourceMappingURL=expr.js.map