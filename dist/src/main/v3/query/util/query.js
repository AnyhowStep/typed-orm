"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const query_tree_1 = require("../../query-tree");
const aliased_table_1 = require("../../aliased-table");
const column_1 = require("../../column");
const predicate_1 = require("./predicate");
const expr_select_item_1 = require("../../expr-select-item");
const column_map_1 = require("../../column-map");
const constants_1 = require("../../constants");
const sqlstring_1 = require("sqlstring");
const column_identifier_ref_1 = require("../../column-identifier-ref");
const expr_1 = require("../../expr");
const raw_expr_1 = require("../../raw-expr");
const column_ref_1 = require("../../column-ref");
function queryTreeSelectItem_Column(column) {
    const result = [];
    result.push(column_1.ColumnUtil.queryTree(column));
    result.push("AS");
    result.push(sqlstring_1.escapeId(`${column.tableAlias}${constants_1.SEPARATOR}${column.name}`));
    return result;
}
function queryTreeSelectItem_ColumnMap(columnMap) {
    const result = [];
    for (let column of column_map_1.ColumnMapUtil.getSortedColumnArray(columnMap)) {
        if (result.length > 0) {
            result.push(",");
        }
        result.push(queryTreeSelectItem_Column(column));
    }
    return result;
}
function queryTreeSelectItem_ColumnRef(columnRef) {
    const result = [];
    for (let column of column_ref_1.ColumnRefUtil.getSortedColumnArray(columnRef)) {
        if (result.length > 0) {
            result.push(",");
        }
        result.push(queryTreeSelectItem_Column(column));
    }
    return result;
}
function queryTreeSelectItem_As_Column(column) {
    return column_1.ColumnUtil.queryTree(column);
}
function queryTreeSelectItem_As_ColumnMap(columnMap) {
    const result = [];
    for (let column of column_map_1.ColumnMapUtil.getSortedColumnArray(columnMap)) {
        if (result.length > 0) {
            result.push(",");
        }
        result.push(queryTreeSelectItem_As_Column(column));
    }
    return result;
}
function queryTreeSelectItem_As_ColumnRef(columnRef) {
    const result = [];
    for (let column of column_ref_1.ColumnRefUtil.getSortedColumnArray(columnRef)) {
        if (result.length > 0) {
            result.push(",");
        }
        result.push(queryTreeSelectItem_As_Column(column));
    }
    return result;
}
function queryTreeSelects(query) {
    const selects = query._selects;
    const result = [];
    for (let item of selects) {
        if (result.length > 0) {
            result.push(",");
        }
        if (column_1.ColumnUtil.isColumn(item)) {
            result.push(queryTreeSelectItem_Column(item));
        }
        else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(item)) {
            result.push(expr_select_item_1.ExprSelectItemUtil.queryTree(item));
        }
        else if (column_map_1.ColumnMapUtil.isColumnMap(item)) {
            result.push(queryTreeSelectItem_ColumnMap(item));
        }
        else if (column_ref_1.ColumnRefUtil.isColumnRef(item)) {
            result.push(queryTreeSelectItem_ColumnRef(item));
        }
        else {
            throw new Error(`Unknown select item`);
        }
    }
    return [
        "SELECT",
        (query._distinct ? "DISTINCT" : ""),
        (query._sqlCalcFoundRows ? "SQL_CALC_FOUND_ROWS" : ""),
        result
    ];
}
exports.queryTreeSelects = queryTreeSelects;
function queryTreeSelects_RawExpr(query) {
    let result = undefined;
    const item = query._selects[0];
    if (column_1.ColumnUtil.isColumn(item)) {
        result = column_1.ColumnUtil.queryTree(item);
    }
    else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(item)) {
        result = item.unaliasedQuery;
    }
    else {
        throw new Error(`Unknown select item`);
    }
    return [
        "SELECT",
        (query._distinct ? "DISTINCT" : ""),
        (query._sqlCalcFoundRows ? "SQL_CALC_FOUND_ROWS" : ""),
        result
    ];
}
exports.queryTreeSelects_RawExpr = queryTreeSelects_RawExpr;
function queryTreeSelects_As(query) {
    const selects = query._selects;
    const result = [];
    for (let item of selects) {
        if (result.length > 0) {
            result.push(",");
        }
        if (column_1.ColumnUtil.isColumn(item)) {
            result.push(queryTreeSelectItem_As_Column(item));
        }
        else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(item)) {
            result.push(query_tree_1.Parentheses.Create(item.unaliasedQuery));
            result.push("AS");
            result.push(sqlstring_1.escapeId(item.alias));
        }
        else if (column_map_1.ColumnMapUtil.isColumnMap(item)) {
            result.push(queryTreeSelectItem_As_ColumnMap(item));
        }
        else if (column_ref_1.ColumnRefUtil.isColumnRef(item)) {
            result.push(queryTreeSelectItem_As_ColumnRef(item));
        }
        else {
            throw new Error(`Unknown select item`);
        }
    }
    return [
        "SELECT",
        (query._distinct ? "DISTINCT" : ""),
        (query._sqlCalcFoundRows ? "SQL_CALC_FOUND_ROWS" : ""),
        result
    ];
}
exports.queryTreeSelects_As = queryTreeSelects_As;
function queryTreeJoins(query) {
    const joins = query._joins;
    if (joins == undefined || joins.length == 0) {
        return [];
    }
    const result = [];
    result.push(aliased_table_1.AliasedTableUtil.queryTree(joins[0].aliasedTable));
    for (let i = 1; i < joins.length; ++i) {
        const join = joins[i];
        result.push(`${join.joinType} JOIN`);
        result.push(aliased_table_1.AliasedTableUtil.queryTree(join.aliasedTable));
        if (join.from.length == 0) {
            continue;
        }
        result.push("ON");
        result.push(join.from
            .map((from, index) => {
            const to = join.to[index];
            return [
                column_1.ColumnUtil.queryTree(to),
                "=",
                column_1.ColumnUtil.queryTree(from),
            ].join(" ");
        })
            .join(" AND "));
    }
    return result;
}
exports.queryTreeJoins = queryTreeJoins;
function queryTreeFrom(query) {
    const result = queryTreeJoins(query);
    if (result.length == 0) {
        return result;
    }
    else {
        return ["FROM", result];
    }
}
exports.queryTreeFrom = queryTreeFrom;
function queryTreeWhere(query) {
    const where = query._where;
    if (where == undefined) {
        return [];
    }
    else {
        return ["WHERE", where.queryTree];
    }
}
exports.queryTreeWhere = queryTreeWhere;
function queryTreeGroupBy(query) {
    const grouped = query._grouped;
    if (grouped == undefined) {
        return [];
    }
    const selectsRef = column_identifier_ref_1.ColumnIdentifierRefUtil.fromSelectItemArray(query._selects == undefined ?
        [] :
        query._selects);
    const result = [];
    for (let item of grouped) {
        if (result.length > 0) {
            result.push(",");
        }
        if (column_identifier_ref_1.ColumnIdentifierRefUtil.hasColumnIdentifier(selectsRef, item)) {
            result.push(sqlstring_1.escapeId(`${item.tableAlias}${constants_1.SEPARATOR}${item.name}`));
        }
        else {
            //Probably from a JOIN'd table
            result.push(sqlstring_1.escapeId(item.tableAlias));
            result.push(".");
            result.push(sqlstring_1.escapeId(item.name));
        }
    }
    return ["GROUP BY", result];
}
exports.queryTreeGroupBy = queryTreeGroupBy;
function queryTreeHaving(query) {
    const having = query._having;
    if (having == undefined) {
        return [];
    }
    else {
        return ["HAVING", having.queryTree];
    }
}
exports.queryTreeHaving = queryTreeHaving;
function queryTreeOrderBy(query) {
    const orders = query._orders;
    if (orders == undefined) {
        return [];
    }
    const result = [];
    for (let order of orders) {
        if (result.length > 0) {
            result.push(",");
        }
        const orderExpr = order[0];
        if (column_1.ColumnUtil.isColumn(orderExpr)) {
            result.push(column_1.ColumnUtil.queryTree(orderExpr));
        }
        else if (expr_1.ExprUtil.isExpr(orderExpr)) {
            result.push(orderExpr.queryTree);
        }
        else {
            throw new Error(`Unknown OrderExpr`);
        }
        result.push(order[1]);
    }
    return ["ORDER BY", result];
}
exports.queryTreeOrderBy = queryTreeOrderBy;
/*
    The syntax is one of:

    + LIMIT maxRowCount
    + LIMIT maxRowCount OFFSET offset

    And,
    `LIMIT maxRowCount` is a synonym of
    `LIMIT maxRowCount OFFSET 0`
*/
function queryTreeLimit(query) {
    const limit = query._limit;
    if (limit == undefined) {
        return [];
    }
    if (limit.offset == 0) {
        return ["LIMIT", raw_expr_1.RawExprUtil.queryTree(limit.maxRowCount)];
    }
    else {
        return [
            "LIMIT", raw_expr_1.RawExprUtil.queryTree(limit.maxRowCount),
            "OFFSET", raw_expr_1.RawExprUtil.queryTree(limit.offset),
        ];
    }
}
exports.queryTreeLimit = queryTreeLimit;
function queryTree_RawExpr(query) {
    if (query._unions != undefined ||
        query._unionOrders != undefined ||
        query._unionLimit != undefined) {
        return [
            "(",
            "(",
            queryTreeSelects_RawExpr(query),
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
            ")",
            queryTreeUnion(query),
            queryTreeUnionOrderBy(query),
            queryTreeUnionLimit(query),
            ")",
        ];
    }
    else {
        //No UNION-related clauses
        return [
            "(",
            queryTreeSelects_RawExpr(query),
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
            ")",
        ];
    }
}
exports.queryTree_RawExpr = queryTree_RawExpr;
function queryTree_As(query) {
    if (query._unions != undefined ||
        query._unionOrders != undefined ||
        query._unionLimit != undefined) {
        return query_tree_1.Parentheses.Create([
            "(",
            queryTreeSelects_As(query),
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
            ")",
            queryTreeUnion(query),
            queryTreeUnionOrderBy(query),
            queryTreeUnionLimit(query),
        ]);
    }
    else {
        //No UNION-related clauses
        return query_tree_1.Parentheses.Create([
            queryTreeSelects_As(query),
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
        ]);
    }
}
exports.queryTree_As = queryTree_As;
function queryTree_SelectStar(query) {
    if (query._unions != undefined ||
        query._unionOrders != undefined ||
        query._unionLimit != undefined) {
        return query_tree_1.Parentheses.Create([
            "(",
            "SELECT *",
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
            ")",
            queryTreeUnion(query),
            queryTreeUnionOrderBy(query),
            queryTreeUnionLimit(query),
        ]);
    }
    else {
        //No UNION-related clauses
        return query_tree_1.Parentheses.Create([
            "SELECT *",
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
        ]);
    }
}
exports.queryTree_SelectStar = queryTree_SelectStar;
function queryTree(query) {
    if (query._unions != undefined ||
        query._unionOrders != undefined ||
        query._unionLimit != undefined) {
        return [
            "(",
            queryTreeSelects(query),
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
            ")",
            queryTreeUnion(query),
            queryTreeUnionOrderBy(query),
            queryTreeUnionLimit(query),
        ];
    }
    else {
        //No UNION-related clauses
        return [
            queryTreeSelects(query),
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
        ];
    }
}
exports.queryTree = queryTree;
function queryTreeUnion(query) {
    const unions = query._unions;
    if (unions == undefined) {
        return [];
    }
    const result = [];
    for (let union of unions) {
        result.push("UNION");
        //I think making this explicit is less confusing
        result.push(union.distinct ? "DISTINCT" : "ALL");
        result.push("(");
        result.push(queryTree(union.query));
        result.push(")");
    }
    return result;
}
exports.queryTreeUnion = queryTreeUnion;
function queryTreeUnionOrderBy(query) {
    const orders = query._unionOrders;
    if (orders == undefined) {
        return [];
    }
    const result = [];
    for (let order of orders) {
        if (result.length > 0) {
            result.push(",");
        }
        const orderExpr = order[0];
        if (column_1.ColumnUtil.isColumn(orderExpr)) {
            result.push(column_1.ColumnUtil.queryTree(orderExpr));
        }
        else if (expr_1.ExprUtil.isExpr(orderExpr)) {
            result.push(orderExpr.queryTree);
        }
        else {
            throw new Error(`Unknown OrderExpr`);
        }
        result.push(order[1]);
    }
    return ["ORDER BY", result];
}
exports.queryTreeUnionOrderBy = queryTreeUnionOrderBy;
/*
    The syntax is one of:

    + LIMIT maxRowCount
    + LIMIT maxRowCount OFFSET offset

    And,
    `LIMIT maxRowCount` is a synonym of
    `LIMIT maxRowCount OFFSET 0`
*/
function queryTreeUnionLimit(query) {
    const limit = query._unionLimit;
    if (limit == undefined) {
        return [];
    }
    if (limit.offset == 0) {
        return ["LIMIT", raw_expr_1.RawExprUtil.queryTree(limit.maxRowCount)];
    }
    else {
        return [
            "LIMIT", raw_expr_1.RawExprUtil.queryTree(limit.maxRowCount),
            "OFFSET", raw_expr_1.RawExprUtil.queryTree(limit.offset),
        ];
    }
}
exports.queryTreeUnionLimit = queryTreeUnionLimit;
function assertDelegate(rawExpr) {
    if (predicate_1.isOneRowQuery(rawExpr)) {
        return rawExpr._selects[0].assertDelegate;
    }
    else {
        return sd.nullable(rawExpr._selects[0].assertDelegate);
    }
}
exports.assertDelegate = assertDelegate;
function printSql(query) {
    const sql = query_tree_1.QueryTreeUtil.toSqlPretty(queryTree(query));
    console.log(sql);
}
exports.printSql = printSql;
//# sourceMappingURL=query.js.map