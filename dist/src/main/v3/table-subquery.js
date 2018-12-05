"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const query_1 = require("./query");
const aliased_table_1 = require("./aliased-table");
const column_1 = require("./column");
const expr_select_item_1 = require("./expr-select-item");
var TableSubquery;
(function (TableSubquery) {
    function isTableSubquery(raw) {
        return (aliased_table_1.AliasedTable.isAliasedTable(raw) &&
            ("query" in raw) &&
            (typeof raw.query == "string"));
    }
    TableSubquery.isTableSubquery = isTableSubquery;
    function isSingleValueOrEmpty(raw) {
        return (isTableSubquery(raw) &&
            query_1.QueryUtil.isAfterSelectClause(raw.query) &&
            query_1.QueryUtil.isZeroOrOneRowQuery(raw.query) &&
            (raw.query.selects != undefined &&
                raw.query.selects.length == 1 &&
                (column_1.ColumnUtil.isColumn(raw.query.selects[0]) ||
                    expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(raw.query.selects[0]))));
    }
    TableSubquery.isSingleValueOrEmpty = isSingleValueOrEmpty;
    function isSingleValue(raw) {
        return (isTableSubquery(raw) &&
            query_1.QueryUtil.isAfterSelectClause(raw.query) &&
            query_1.QueryUtil.isOneRowQuery(raw.query) &&
            (raw.query.selects != undefined &&
                raw.query.selects.length == 1 &&
                (column_1.ColumnUtil.isColumn(raw.query.selects[0]) ||
                    expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(raw.query.selects[0]))));
    }
    TableSubquery.isSingleValue = isSingleValue;
    function columnName(t) {
        const selectItem = t.query.selects[0];
        if (column_1.ColumnUtil.isColumn(selectItem)) {
            return selectItem.name;
        }
        if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(selectItem)) {
            return selectItem.alias;
        }
        throw new Error(`Unknown select item ${sd.toTypeStr(selectItem)}`);
    }
    TableSubquery.columnName = columnName;
    function assertDelegate(t) {
        if (isSingleValue(t)) {
            return t.query.selects[0].assertDelegate;
        }
        else {
            return sd.nullable(t.query.selects[0].assertDelegate);
        }
    }
    TableSubquery.assertDelegate = assertDelegate;
    function queryTree(_tableSubquery) {
        throw new Error(`Unimplemented`);
    }
    TableSubquery.queryTree = queryTree;
})(TableSubquery = exports.TableSubquery || (exports.TableSubquery = {}));
//# sourceMappingURL=table-subquery.js.map