"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueryUtil = require("./util");
const constants_1 = require("../constants");
class Query {
    constructor(data) {
        this._distinct = data._distinct;
        this._sqlCalcFoundRows = data._sqlCalcFoundRows;
        this._joins = data._joins;
        this._parentJoins = data._parentJoins;
        this._selects = data._selects;
        this._where = data._where;
        this._grouped = data._grouped;
        this._having = data._having;
        this._orders = data._orders;
        this._limit = data._limit;
        this._unions = data._unions;
        this._unionOrders = data._unionOrders;
        this._unionLimit = data._unionLimit;
        this._mapDelegate = data._mapDelegate;
    }
    from(aliasedTable) {
        return QueryUtil.from(this, aliasedTable);
    }
    innerJoin(aliasedTable, fromDelegate, toDelegate) {
        return QueryUtil.innerJoin(this, aliasedTable, fromDelegate, toDelegate);
    }
    leftJoin(aliasedTable, fromDelegate, toDelegate) {
        return QueryUtil.leftJoin(this, aliasedTable, fromDelegate, toDelegate);
    }
    rightJoin(aliasedTable, fromDelegate, toDelegate) {
        return QueryUtil.rightJoin(this, aliasedTable, fromDelegate, toDelegate);
    }
    innerJoinUsing(aliasedTable, usingDelegate) {
        return QueryUtil.innerJoinUsing(this, aliasedTable, usingDelegate);
    }
    leftJoinUsing(aliasedTable, usingDelegate) {
        return QueryUtil.leftJoinUsing(this, aliasedTable, usingDelegate);
    }
    rightJoinUsing(aliasedTable, usingDelegate) {
        return QueryUtil.rightJoinUsing(this, aliasedTable, usingDelegate);
    }
    innerJoinCk(table, fromDelegate, toDelegate) {
        return QueryUtil.innerJoinCk(this, table, fromDelegate, toDelegate);
    }
    leftJoinCk(table, fromDelegate, toDelegate) {
        return QueryUtil.leftJoinCk(this, table, fromDelegate, toDelegate);
    }
    rightJoinCk(table, fromDelegate, toDelegate) {
        return QueryUtil.rightJoinCk(this, table, fromDelegate, toDelegate);
    }
    innerJoinCkUsing(table, usingDelegate) {
        return QueryUtil.innerJoinCkUsing(this, table, usingDelegate);
    }
    leftJoinCkUsing(table, usingDelegate) {
        return QueryUtil.leftJoinCkUsing(this, table, usingDelegate);
    }
    rightJoinCkUsing(table, usingDelegate) {
        return QueryUtil.rightJoinCkUsing(this, table, usingDelegate);
    }
    innerJoinPk(delegate, toTable) {
        return QueryUtil.innerJoinPk(this, delegate, toTable);
    }
    leftJoinPk(delegate, toTable) {
        return QueryUtil.leftJoinPk(this, delegate, toTable);
    }
    rightJoinPk(delegate, toTable) {
        return QueryUtil.rightJoinPk(this, delegate, toTable);
    }
    innerJoinFromPk(delegate, toTable) {
        return QueryUtil.innerJoinFromPk(this, delegate, toTable);
    }
    leftJoinFromPk(delegate, toTable) {
        return QueryUtil.leftJoinFromPk(this, delegate, toTable);
    }
    rightJoinFromPk(delegate, toTable) {
        return QueryUtil.rightJoinFromPk(this, delegate, toTable);
    }
    select(delegate) {
        return QueryUtil.select(this, delegate);
    }
    selectExpr(delegate) {
        return QueryUtil.selectExpr(this, delegate);
    }
    where(delegate) {
        return QueryUtil.where(this, delegate);
    }
    groupBy(delegate) {
        return QueryUtil.groupBy(this, delegate);
    }
    having(delegate) {
        return QueryUtil.having(this, delegate);
    }
    orderBy(delegate) {
        return QueryUtil.orderBy(this, delegate);
    }
    /*
        One should be careful about using LIMIT, OFFSET
        without an ORDER BY clause.

        In general, if your WHERE condition uniquely identifies
        the row, then LIMIT and OFFSET are not required
        and can be safely used without an ORDER BY.

        The problem is when the WHERE condition *does not*
        uniquely identify a row.

        Then, LIMIT and OFFSET can return inconsistent results.
    */
    limit(maxRowCount) {
        return QueryUtil.limit(this, maxRowCount);
    }
    offset(offset) {
        return QueryUtil.offset(this, offset);
    }
    union(arg0, arg1) {
        if (arg1 == undefined) {
            //Only two args
            const other = arg0;
            return QueryUtil.union(this, other, constants_1.DISTINCT);
        }
        else {
            //Three args
            //Yeap, it's arg*1*, then arg*0*.
            //Confusing. I know. I'm sorry.
            const other = arg1;
            const unionType = arg0;
            return QueryUtil.union(this, other, unionType);
        }
    }
    unionOrderBy(delegate) {
        return QueryUtil.unionOrderBy(this, delegate);
    }
    /*
        One should be careful about using UNION LIMIT, OFFSET
        without the UNION ORDER BY clause.
    */
    unionLimit(maxRowCount) {
        return QueryUtil.unionLimit(this, maxRowCount);
    }
    unionOffset(offset) {
        return QueryUtil.unionOffset(this, offset);
    }
    distinct() {
        return QueryUtil.distinct(this);
    }
    sqlCalcFoundRows() {
        return QueryUtil.sqlCalcFoundRows(this);
    }
    crossJoin(aliasedTable) {
        return QueryUtil.crossJoin(this, aliasedTable);
    }
    requireParentJoins(...arr) {
        return QueryUtil.requireParentJoins(this, false, 
        //TODO-UNHACK Figure out what's wrong
        ...arr);
    }
    requireNullableParentJoins(...arr) {
        return QueryUtil.requireParentJoins(this, true, 
        //TODO-UNHACK Figure out what's wrong
        ...arr);
    }
    as(alias) {
        return QueryUtil.as(this, alias);
    }
    coalesce(defaultExpr) {
        return QueryUtil.coalesce(this, defaultExpr);
    }
    map(delegate) {
        return QueryUtil.map(this, delegate);
    }
    whereIsNull(delegate) {
        return QueryUtil.whereIsNull(this, delegate);
    }
    whereIsNotNull(delegate) {
        return QueryUtil.whereIsNotNull(this, delegate);
    }
    whereEq(delegate, value) {
        return QueryUtil.whereEq(this, delegate, value);
    }
    whereNullSafeEq(delegate, value) {
        return QueryUtil.whereNullSafeEq(this, delegate, value);
    }
    whereEqCandidateKey(table, key) {
        return QueryUtil.whereEqCandidateKey(this, table, key);
    }
    useJoin(joinDecl) {
        return QueryUtil.useJoin(this, joinDecl);
    }
    useJoins(...arr) {
        return QueryUtil.useJoins(this, arr);
    }
    assertExists(connection) {
        return QueryUtil.assertExists(this, connection);
    }
    count(connection) {
        return QueryUtil.count(this, connection);
    }
    cursor(connection) {
        return QueryUtil.cursor(this, connection);
    }
    exists(connection) {
        return QueryUtil.exists(this, connection);
    }
    fetchAllUnmapped(connection) {
        return QueryUtil.fetchAllUnmapped(this, connection);
    }
    fetchAll(connection) {
        return QueryUtil.fetchAll(this, connection);
    }
    fetchOne(connection) {
        return QueryUtil.fetchOne(this, connection);
    }
    fetchValueArray(connection) {
        return QueryUtil.fetchValueArray(this, connection);
    }
    fetchValueOrUndefined(connection) {
        return QueryUtil.fetchValueOrUndefined(this, connection);
    }
    fetchValue(connection) {
        return QueryUtil.fetchValue(this, connection);
    }
    fetchZeroOrOne(connection) {
        return QueryUtil.fetchZeroOrOne(this, connection);
    }
    paginate(connection, rawArgs) {
        return QueryUtil.paginate(this, connection, rawArgs);
    }
    printSql() {
        QueryUtil.printSql(this);
        return this;
    }
    insertIgnoreInto(table, delegate) {
        return QueryUtil.insertIgnoreInto(this, table, delegate);
    }
    insertInto(table, delegate) {
        return QueryUtil.insertInto(this, table, delegate);
    }
    replaceInto(table, delegate) {
        return QueryUtil.replaceInto(this, table, delegate);
    }
    set(delegate) {
        return QueryUtil.set(this, delegate);
    }
}
exports.Query = Query;
function from(aliasedTable) {
    return QueryUtil.newInstance()
        .from(aliasedTable);
}
exports.from = from;
function select(delegate) {
    return QueryUtil.newInstance()
        .select(delegate);
}
exports.select = select;
function selectExpr(delegate) {
    return QueryUtil.newInstance()
        .selectExpr(delegate);
}
exports.selectExpr = selectExpr;
function requireParentJoins(...arr) {
    return QueryUtil.newInstance()
        .requireParentJoins(...arr);
}
exports.requireParentJoins = requireParentJoins;
function requireNullableParentJoins(...arr) {
    return QueryUtil.newInstance()
        .requireNullableParentJoins(...arr);
}
exports.requireNullableParentJoins = requireNullableParentJoins;
//# sourceMappingURL=query.js.map