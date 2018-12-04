"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const ColumnUtil = require("./util");
class Column {
    constructor(data, __subTableName, __isInSelectClause) {
        this.tableAlias = data.tableAlias;
        this.name = data.name;
        this.assertDelegate = data.assertDelegate;
        //HACK
        this.__subTableName = __subTableName;
        //HACK
        this.__isInSelectClause = (__isInSelectClause === true);
    }
    queryTree() {
        return ColumnUtil.queryTree(this);
    }
    toNullable() {
        return ColumnUtil.toNullable(this);
    }
    withTableAlias(newTableAlias) {
        return ColumnUtil.withTableAlias(this, newTableAlias);
    }
    withType(newAssertFunc) {
        return ColumnUtil.withType(this, newAssertFunc);
    }
}
exports.Column = Column;
function column(tableAlias, name, assertFunc) {
    return new Column({
        tableAlias,
        name,
        assertDelegate: sd.toAssertDelegate(assertFunc),
    });
}
exports.column = column;
//# sourceMappingURL=column.js.map