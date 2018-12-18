"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("../../aliased-table");
const column_1 = require("../../column");
const expr_select_item_1 = require("../../expr-select-item");
const column_map_1 = require("../../column-map");
const constants_1 = require("../../constants");
const sqlstring_1 = require("sqlstring");
const column_identifier_ref_1 = require("../../column-identifier-ref");
const expr_1 = require("../../expr");
const raw_expr_1 = require("../../raw-expr");
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
    }
    return ["SELECT", result];
}
exports.queryTreeSelects = queryTreeSelects;
function queryTreeJoins(query) {
    const joins = query._joins;
    if (joins == undefined || joins.length == 0) {
        return [];
    }
    const result = [];
    result.push(aliased_table_1.AliasedTable.queryTree(joins[0].aliasedTable));
    for (let i = 1; i < joins.length; ++i) {
        const join = joins[i];
        result.push(`${join.joinType} JOIN`);
        result.push(aliased_table_1.AliasedTable.queryTree(join.aliasedTable));
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
function queryTree(query) {
    return [
        queryTreeSelects(query),
        queryTreeFrom(query),
        queryTreeWhere(query),
        queryTreeGroupBy(query),
        queryTreeHaving(query),
        queryTreeOrderBy(query),
        queryTreeLimit(query),
        queryTreeUnion(query),
    ];
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
//# sourceMappingURL=query.js.map