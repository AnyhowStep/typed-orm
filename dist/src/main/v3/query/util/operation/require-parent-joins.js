"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const join_1 = require("../../../join");
const predicate_1 = require("../predicate");
/*
    Although not necessary, prevent duplicates in this ArrT?
*/
function requireParentJoins(query, nullable, ...arr) {
    for (let aliasedTable of arr) {
        predicate_1.assertUniqueJoinTarget(query, aliasedTable);
    }
    const parentJoins = arr.map(aliasedTable => new join_1.Join({
        aliasedTable,
        columns: aliasedTable.columns,
        nullable,
    }, 
    //It doesn't matter what type of Join this is.
    //It should never affect output.
    join_1.JoinType.INNER, [], []));
    return new query_1.Query({
        ...query,
        _parentJoins: ((query._parentJoins == undefined) ?
            parentJoins :
            [...query._parentJoins, ...parentJoins])
    });
}
exports.requireParentJoins = requireParentJoins;
//# sourceMappingURL=require-parent-joins.js.map