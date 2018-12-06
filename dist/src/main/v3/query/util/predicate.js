"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../expr");
const join_array_1 = require("../../join-array");
const select_item_array_1 = require("../../select-item-array");
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
function isLimit(raw) {
    return (raw != undefined &&
        (raw instanceof Object) &&
        ("rowCount" in raw) &&
        ("offset" in raw) &&
        (typeof raw.rowCount == "number") &&
        (typeof raw.offset == "number"));
}
exports.isLimit = isLimit;
function isExtraQueryData(raw) {
    return (raw != undefined &&
        (raw instanceof Object) &&
        ("where" in raw) &&
        (raw.where == undefined ||
            expr_1.ExprUtil.isExpr(raw.where)));
}
exports.isExtraQueryData = isExtraQueryData;
function isQuery(raw) {
    return (raw != undefined &&
        (raw instanceof Object) &&
        ("joins" in raw) &&
        ("parentJoins" in raw) &&
        ("unions" in raw) &&
        ("selects" in raw) &&
        ("limit" in raw) &&
        ("unionLimit" in raw) &&
        ("extraData" in raw) &&
        (raw.joins == undefined ||
            join_array_1.JoinArrayUtil.isJoinArray(raw.joins)) &&
        (raw.parentJoins == undefined ||
            join_array_1.JoinArrayUtil.isJoinArray(raw.parentJoins)) &&
        (raw.unions == undefined ||
            isUnionQueryArray(raw.unions)) &&
        (raw.selects == undefined ||
            select_item_array_1.SelectItemArrayUtil.isSelectItemArray(raw.selects)) &&
        (raw.limit == undefined ||
            isLimit(raw.limit)) &&
        (raw.unionLimit == undefined ||
            isLimit(raw.unionLimit)) &&
        isExtraQueryData(raw.extraData));
}
exports.isQuery = isQuery;
function isBeforeFromClause(query) {
    return query.joins == undefined;
}
exports.isBeforeFromClause = isBeforeFromClause;
function isAfterFromClause(query) {
    return query.joins != undefined;
}
exports.isAfterFromClause = isAfterFromClause;
function isBeforeUnionClause(query) {
    return query.unions == undefined;
}
exports.isBeforeUnionClause = isBeforeUnionClause;
function isAfterUnionClause(query) {
    return query.unions != undefined;
}
exports.isAfterUnionClause = isAfterUnionClause;
function isBeforeSelectClause(query) {
    return query.selects == undefined;
}
exports.isBeforeSelectClause = isBeforeSelectClause;
function isAfterSelectClause(query) {
    return query.selects != undefined;
}
exports.isAfterSelectClause = isAfterSelectClause;
function isOneRowQuery(query) {
    return isBeforeFromClause(query) && isBeforeUnionClause(query);
}
exports.isOneRowQuery = isOneRowQuery;
function isZeroOrOneRowUnionQuery(query) {
    return (isAfterUnionClause(query) &&
        query.unionLimit != undefined &&
        (query.unionLimit.rowCount == 0 ||
            query.unionLimit.rowCount == 1));
}
exports.isZeroOrOneRowUnionQuery = isZeroOrOneRowUnionQuery;
function isZeroOrOneRowFromQuery(query) {
    return (isAfterFromClause(query) &&
        isBeforeUnionClause(query) &&
        ((query.limit != undefined &&
            (query.limit.rowCount == 0 ||
                query.limit.rowCount == 1)) ||
            (query.unionLimit != undefined &&
                (query.unionLimit.rowCount == 0 ||
                    query.unionLimit.rowCount == 1))));
}
exports.isZeroOrOneRowFromQuery = isZeroOrOneRowFromQuery;
function isZeroOrOneRowQuery(query) {
    return (isOneRowQuery(query) ||
        isZeroOrOneRowUnionQuery(query) ||
        isZeroOrOneRowFromQuery(query));
}
exports.isZeroOrOneRowQuery = isZeroOrOneRowQuery;
function assertUniqueJoinTarget(query, aliasedTable) {
    if (query.joins != undefined) {
        if (query.joins.some(j => j.aliasedTable.alias == aliasedTable.alias)) {
            throw new Error(`Alias ${aliasedTable.alias} already used in previous JOINs`);
        }
    }
    if (query.parentJoins != undefined) {
        if (query.parentJoins.some(j => j.aliasedTable.alias == aliasedTable.alias)) {
            throw new Error(`Alias ${aliasedTable.alias} already used in parent JOINs`);
        }
    }
}
exports.assertUniqueJoinTarget = assertUniqueJoinTarget;
//# sourceMappingURL=predicate.js.map