"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const join_declaration_1 = require("../../../join-declaration");
function latestSubQuery(log) {
    return query_1.QueryUtil.newInstance()
        .requireParentJoins(...[log.entity])
        .from(log.table)
        .where(() => join_declaration_1.JoinDeclarationUtil.eq(log.joinDeclaration))
        .orderBy(() => [log.latestOrder])
        .limit(1);
}
exports.latestSubQuery = latestSubQuery;
//# sourceMappingURL=latest-sub-query.js.map