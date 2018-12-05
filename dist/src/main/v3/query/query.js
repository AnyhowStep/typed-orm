"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueryUtil = require("./util");
class Query {
    constructor(data, extraData) {
        this.joins = data.joins;
        this.parentJoins = data.parentJoins;
        this.unions = data.unions;
        this.selects = data.selects;
        this.limit = data.limit;
        this.unionLimit = data.unionLimit;
        this.extraData = extraData;
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
}
exports.Query = Query;
function from(aliasedTable) {
    return QueryUtil.newInstance()
        .from(aliasedTable);
}
exports.from = from;
//# sourceMappingURL=query.js.map