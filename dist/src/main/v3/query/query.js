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
    select(delegate) {
        return QueryUtil.select(this, delegate);
    }
    selectExpr(delegate) {
        return QueryUtil.selectExpr(this, delegate);
    }
    andWhere(delegate) {
        return QueryUtil.andWhere(this, delegate);
    }
    groupBy(delegate) {
        return QueryUtil.groupBy(this, delegate);
    }
    andHaving(delegate) {
        return QueryUtil.andHaving(this, delegate);
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
        //TODO Figure out what's wrong
        ...arr);
    }
    requireNullableParentJoins(...arr) {
        return QueryUtil.requireParentJoins(this, true, 
        //TODO Figure out what's wrong
        ...arr);
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