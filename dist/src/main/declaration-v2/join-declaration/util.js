"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../join");
const join_declaration_1 = require("./join-declaration");
var JoinDeclarationUtil;
(function (JoinDeclarationUtil) {
    function isImplicitJoinDeclarationUsage(t) {
        return (t instanceof join_declaration_1.JoinDeclaration);
    }
    function isInnerOrLeftJoinDeclarationUsage(t) {
        return (!isImplicitJoinDeclarationUsage(t) && t[1] instanceof join_declaration_1.JoinDeclaration);
    }
    function isCrossJoinDeclarationUsage(t) {
        return (!isImplicitJoinDeclarationUsage(t) && !isInnerOrLeftJoinDeclarationUsage(t));
    }
    function toTableOf(t) {
        if (isImplicitJoinDeclarationUsage(t)) {
            return t.toTable;
        }
        else if (isInnerOrLeftJoinDeclarationUsage(t)) {
            return t[1].toTable;
        }
        else if (isCrossJoinDeclarationUsage(t)) {
            return t[1];
        }
        else {
            throw new Error(`Unknown JoinDeclarationUsage`);
        }
    }
    JoinDeclarationUtil.toTableOf = toTableOf;
    function fromColumnsOf(t) {
        if (isImplicitJoinDeclarationUsage(t)) {
            return t.fromColumns;
        }
        else if (isInnerOrLeftJoinDeclarationUsage(t)) {
            return t[1].fromColumns;
        }
        else {
            return [];
        }
    }
    JoinDeclarationUtil.fromColumnsOf = fromColumnsOf;
    function toColumnsOf(t) {
        if (isImplicitJoinDeclarationUsage(t)) {
            return t.toColumns;
        }
        else if (isInnerOrLeftJoinDeclarationUsage(t)) {
            return t[1].toColumns;
        }
        else {
            return [];
        }
    }
    JoinDeclarationUtil.toColumnsOf = toColumnsOf;
    function joinTypeOf(t) {
        if (isImplicitJoinDeclarationUsage(t)) {
            return t.defaultJoinType;
        }
        else if (isInnerOrLeftJoinDeclarationUsage(t)) {
            return t[0];
        }
        else {
            return join_1.JoinType.CROSS;
        }
    }
    JoinDeclarationUtil.joinTypeOf = joinTypeOf;
})(JoinDeclarationUtil = exports.JoinDeclarationUtil || (exports.JoinDeclarationUtil = {}));
//# sourceMappingURL=util.js.map