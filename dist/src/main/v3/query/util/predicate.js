"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../expr");
const join_array_1 = require("../../join-array");
const select_item_array_1 = require("../../select-item-array");
const select_item_1 = require("../../select-item");
const type_1 = require("../../type");
const column_identifier_1 = require("../../column-identifier");
const order_1 = require("../../order");
const column_identifier_ref_1 = require("../../column-identifier-ref");
function isUnionQuery(raw) {
    return (raw != undefined &&
        (raw instanceof Object) &&
        ("distinct" in raw) &&
        ("query" in raw) &&
        (typeof raw.distinct == "boolean") &&
        isQuery(raw.query));
}
exports.isUnionQuery = isUnionQuery;
function isUnionQueryArray(raw) {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!isUnionQuery(item)) {
            return false;
        }
    }
    return true;
}
exports.isUnionQueryArray = isUnionQueryArray;
function isLimitData(raw) {
    return (raw != undefined &&
        (raw instanceof Object) &&
        ("maxRowCount" in raw) &&
        ("offset" in raw) &&
        (typeof raw.maxRowCount == "number") &&
        (typeof raw.offset == "number"));
}
exports.isLimitData = isLimitData;
function isQuery(raw) {
    if (!type_1.isObjectWithKeys(raw, [
        "_distinct",
        "_sqlCalcFoundRows",
        "_joins",
        "_parentJoins",
        "_selects",
        "_where",
        "_grouped",
        "_having",
        "_orders",
        "_limit",
        "_unions",
        "_unionOrders",
        "_unionLimit",
        "_mapDelegate"
    ])) {
        return false;
    }
    return ((typeof raw._distinct == "boolean") &&
        (typeof raw._sqlCalcFoundRows == "boolean") &&
        (raw._joins == undefined ||
            join_array_1.JoinArrayUtil.isJoinArray(raw._joins)) &&
        (raw._parentJoins == undefined ||
            join_array_1.JoinArrayUtil.isJoinArray(raw._parentJoins)) &&
        (raw._selects == undefined ||
            select_item_array_1.SelectItemArrayUtil.isSelectItemArray(raw._selects)) &&
        (
        //TODO Check if boolean expr
        raw._where == undefined ||
            expr_1.ExprUtil.isExpr(raw._where)) &&
        (raw._grouped == undefined ||
            column_identifier_1.ColumnIdentifierUtil.Array.isColumnIdentifierArray(raw._grouped)) &&
        (
        //TODO Check if boolean expr
        raw._having == undefined ||
            expr_1.ExprUtil.isExpr(raw._having)) &&
        (raw._orders == undefined ||
            order_1.OrderUtil.Array.isOrderArray(raw._orders)) &&
        (raw._limit == undefined ||
            isLimitData(raw._limit)) &&
        (raw._unions == undefined ||
            isUnionQueryArray(raw._unions)) &&
        (raw._unionOrders == undefined ||
            order_1.OrderUtil.Array.isOrderArray(raw._unionOrders)) &&
        (raw._unionLimit == undefined ||
            isLimitData(raw._unionLimit)) &&
        (raw._mapDelegate == undefined ||
            (typeof raw._mapDelegate == "function")));
}
exports.isQuery = isQuery;
function isBeforeFromClause(query) {
    return query._joins == undefined;
}
exports.isBeforeFromClause = isBeforeFromClause;
function isAfterFromClause(query) {
    return query._joins != undefined;
}
exports.isAfterFromClause = isAfterFromClause;
function isBeforeUnionClause(query) {
    return query._unions == undefined;
}
exports.isBeforeUnionClause = isBeforeUnionClause;
function isAfterUnionClause(query) {
    return query._unions != undefined;
}
exports.isAfterUnionClause = isAfterUnionClause;
function isBeforeSelectClause(query) {
    return query._selects == undefined;
}
exports.isBeforeSelectClause = isBeforeSelectClause;
function isAfterSelectClause(query) {
    return query._selects != undefined;
}
exports.isAfterSelectClause = isAfterSelectClause;
function isOneRowQuery(query) {
    return isBeforeFromClause(query) && isBeforeUnionClause(query);
}
exports.isOneRowQuery = isOneRowQuery;
function isZeroOrOneRowUnionQuery(query) {
    return (isAfterUnionClause(query) &&
        query._unionLimit != undefined &&
        (query._unionLimit.maxRowCount == 0 ||
            query._unionLimit.maxRowCount == 1));
}
exports.isZeroOrOneRowUnionQuery = isZeroOrOneRowUnionQuery;
function isZeroOrOneRowFromQuery(query) {
    return (isAfterFromClause(query) &&
        isBeforeUnionClause(query) &&
        ((query._limit != undefined &&
            (query._limit.maxRowCount == 0 ||
                query._limit.maxRowCount == 1)) ||
            (query._unionLimit != undefined &&
                (query._unionLimit.maxRowCount == 0 ||
                    query._unionLimit.maxRowCount == 1))));
}
exports.isZeroOrOneRowFromQuery = isZeroOrOneRowFromQuery;
function isZeroOrOneRowQuery(query) {
    return (isOneRowQuery(query) ||
        isZeroOrOneRowUnionQuery(query) ||
        isZeroOrOneRowFromQuery(query));
}
exports.isZeroOrOneRowQuery = isZeroOrOneRowQuery;
function isOneSelectItemQuery(query) {
    return (isAfterSelectClause(query) &&
        query._selects.length == 1 &&
        select_item_1.SelectItemUtil.isSingleValueSelectItem(query._selects[0]));
}
exports.isOneSelectItemQuery = isOneSelectItemQuery;
function assertValidJoinTarget(query, aliasedTable) {
    if (query._parentJoins == undefined) {
        column_identifier_ref_1.ColumnIdentifierRefUtil.assertHasColumnIdentifiers({}, column_identifier_1.ColumnIdentifierUtil.Array.fromColumnRef(aliasedTable.usedRef));
    }
    else {
        column_identifier_ref_1.ColumnIdentifierRefUtil.assertHasColumnIdentifiers(column_identifier_ref_1.ColumnIdentifierRefUtil.fromJoinArray(query._parentJoins), column_identifier_1.ColumnIdentifierUtil.Array.fromColumnRef(aliasedTable.usedRef));
    }
    if (query._joins != undefined) {
        if (query._joins.some(j => j.aliasedTable.alias == aliasedTable.alias)) {
            throw new Error(`Alias ${aliasedTable.alias} already used in previous JOINs`);
        }
    }
    if (query._parentJoins != undefined) {
        if (query._parentJoins.some(j => j.aliasedTable.alias == aliasedTable.alias)) {
            throw new Error(`Alias ${aliasedTable.alias} already used in parent JOINs`);
        }
    }
}
exports.assertValidJoinTarget = assertValidJoinTarget;
//# sourceMappingURL=predicate.js.map