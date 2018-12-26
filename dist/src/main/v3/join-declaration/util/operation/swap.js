"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_declaration_1 = require("../../join-declaration");
function swap(joinDecl) {
    return new join_declaration_1.JoinDeclaration({
        fromTable: joinDecl.toTable,
        toTable: joinDecl.fromTable,
        nullable: joinDecl.nullable,
    }, joinDecl.joinType, joinDecl.to, joinDecl.from);
}
exports.swap = swap;
//# sourceMappingURL=swap.js.map