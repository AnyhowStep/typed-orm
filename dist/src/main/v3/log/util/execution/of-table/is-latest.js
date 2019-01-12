"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exprLib = require("../../../../expr-library");
const table_1 = require("../../../../table");
const query_1 = require("../../../../query");
const join_declaration_1 = require("../../../../join-declaration");
function isLatest(log) {
    const latest = table_1.TableUtil.as(log.table, "latest");
    const latestOrderSubQuery = query_1.QueryUtil.newInstance()
        .requireParentJoins(...[log.table])
        .from(latest)
        .select(() => [
        latest.columns[log.latestOrder[0].name]
    ])
        .where(() => {
        return join_declaration_1.JoinDeclarationUtil.innerJoinUsing(latest, log.table, c => {
            return log.entityIdentifier.map(columnName => c[columnName]);
        }).eq();
    })
        .orderBy(() => [
        [
            latest.columns[log.latestOrder[0].name],
            log.latestOrder[1]
        ]
    ])
        .limit(1);
    return exprLib.nullSafeEq(log.table.columns[log.latestOrder[0].name], latestOrderSubQuery).as("isLatest");
}
exports.isLatest = isLatest;
//# sourceMappingURL=is-latest.js.map