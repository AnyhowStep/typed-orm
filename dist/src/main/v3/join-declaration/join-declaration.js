"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoinDeclarationUtil = require("./util");
class JoinDeclaration {
    constructor(data, joinType, from, to) {
        this.fromTable = data.fromTable;
        this.toTable = data.toTable;
        this.nullable = data.nullable;
        this.joinType = joinType;
        this.from = from;
        this.to = to;
    }
    swap() {
        return JoinDeclarationUtil.swap(this);
    }
    eq() {
        return JoinDeclarationUtil.eq(this);
    }
}
exports.JoinDeclaration = JoinDeclaration;
//# sourceMappingURL=join-declaration.js.map