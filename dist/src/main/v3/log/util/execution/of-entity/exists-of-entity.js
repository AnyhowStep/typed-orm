"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../../query");
const join_declaration_1 = require("../../../../join-declaration");
const exprLib = require("../../../../expr-library");
function existsOfEntity(log) {
    const result = exprLib.exists(query_1.QueryUtil.newInstance()
        .requireParentJoins(...[log.entity])
        .from(log.table)
        .where(() => join_declaration_1.JoinDeclarationUtil.eq(log.joinDeclaration))).as("exists");
    return result;
}
exports.existsOfEntity = existsOfEntity;
//# sourceMappingURL=exists-of-entity.js.map