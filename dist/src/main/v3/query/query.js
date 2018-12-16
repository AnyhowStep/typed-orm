"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueryUtil = require("./util");
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
    andWhere(delegate) {
        return QueryUtil.andWhere(this, delegate);
    }
    groupBy(delegate) {
        return QueryUtil.groupBy(this, delegate);
    }
    andHaving(delegate) {
        return QueryUtil.andHaving(this, delegate);
    }
}
exports.Query = Query;
function from(aliasedTable) {
    return QueryUtil.newInstance()
        .from(aliasedTable);
}
exports.from = from;
//# sourceMappingURL=query.js.map