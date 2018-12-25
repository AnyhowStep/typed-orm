"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JoinDeclaration {
    constructor(data, joinType, from, to) {
        this.fromTable = data.fromTable;
        this.toTable = data.toTable;
        this.nullable = data.nullable;
        this.joinType = joinType;
        this.from = from;
        this.to = to;
    }
}
exports.JoinDeclaration = JoinDeclaration;
//# sourceMappingURL=join-declaration.js.map