"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnUtil = require("./util");
class Column {
    constructor(data, __isFromExprSelectItem) {
        this.tableAlias = data.tableAlias;
        this.name = data.name;
        this.assertDelegate = data.assertDelegate;
        //HACK
        this.__isFromExprSelectItem = (__isFromExprSelectItem === true);
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
    as(alias) {
        return ColumnUtil.as(this, alias);
    }
    asc() {
        return ColumnUtil.asc(this);
    }
    desc() {
        return ColumnUtil.desc(this);
    }
    sort(sortDirection) {
        return ColumnUtil.sort(this, sortDirection);
    }
}
exports.Column = Column;
function column(tableAlias, name, assertFunc) {
    return new Column({
        tableAlias,
        name,
        assertDelegate: assertFunc,
    });
}
exports.column = column;
//# sourceMappingURL=column.js.map