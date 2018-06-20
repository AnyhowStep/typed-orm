"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../expr");
const raw_expr_1 = require("../raw-expr");
const sd = require("schema-decorator");
const column_references_1 = require("../column-references");
//https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#operator_like
function like(str, pattern) {
    raw_expr_1.RawExprUtil.assertNonNullable(str);
    raw_expr_1.RawExprUtil.assertNonNullable(pattern);
    const usedReferences = column_references_1.ColumnReferencesUtil.merge(raw_expr_1.RawExprUtil.usedReferences(str), raw_expr_1.RawExprUtil.usedReferences(pattern));
    const query = `${raw_expr_1.RawExprUtil.querify(str)} LIKE ${raw_expr_1.RawExprUtil.querify(pattern)}`;
    const expr = new expr_1.Expr(usedReferences, sd.numberToBoolean(), query);
    expr.escape = (escapeChar) => {
        escapeChar = sd.varChar(0, 1)("escapeChar", escapeChar);
        return new expr_1.Expr(usedReferences, sd.numberToBoolean(), `${query} ESCAPE ${raw_expr_1.RawExprUtil.querify(escapeChar)}`);
    };
    return expr;
}
exports.like = like;
function likeUnsafe(str, pattern) {
    const usedReferences = column_references_1.ColumnReferencesUtil.merge(raw_expr_1.RawExprUtil.usedReferences(str), raw_expr_1.RawExprUtil.usedReferences(pattern));
    const query = `${raw_expr_1.RawExprUtil.querify(str)} LIKE ${raw_expr_1.RawExprUtil.querify(pattern)}`;
    const expr = new expr_1.Expr(usedReferences, sd.numberToBoolean(), query);
    expr.escape = (escapeChar) => {
        escapeChar = sd.varChar(0, 1)("escapeChar", escapeChar);
        return new expr_1.Expr(usedReferences, sd.numberToBoolean(), `${query} ESCAPE ${raw_expr_1.RawExprUtil.querify(escapeChar)}`);
    };
    return expr;
}
exports.likeUnsafe = likeUnsafe;
/*
With LIKE you can use the following two wildcard characters in the pattern:

+ % matches any number of characters, even zero characters.
+ _ matches exactly one character.

This function just prepends `escapeChar` to each of the above characters.

If no `escapeChar` is given, backslash is assumed.
*/
function escapeLikePattern(pattern, escapeChar = "\\") {
    return pattern.replace(/(\%|\_)/g, s => escapeChar + s);
}
exports.escapeLikePattern = escapeLikePattern;
//# sourceMappingURL=like.js.map