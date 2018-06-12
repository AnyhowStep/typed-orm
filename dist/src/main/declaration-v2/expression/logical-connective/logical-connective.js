"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_expr_1 = require("../boolean-expr");
const raw_expr_1 = require("../../raw-expr");
const column_references_1 = require("../../column-references");
const expr_1 = require("../../expr");
const sd = require("schema-decorator");
const or_1 = require("./or");
const select_builder_1 = require("../../select-builder");
const column_1 = require("../../column");
const aliased_expr_1 = require("../../aliased-expr");
const join_1 = require("../../join");
const aliased_table_1 = require("../../aliased-table");
select_builder_1.SelectBuilder;
column_1.Column;
aliased_expr_1.AliasedExpr;
join_1.Join;
aliased_table_1.AliasedTable;
function booleanBinaryOp(operator) {
    function result(left, right) {
        raw_expr_1.RawExprUtil.assertNonNullable(left);
        raw_expr_1.RawExprUtil.assertNonNullable(right);
        return boolean_expr_1.booleanExpr(column_references_1.ColumnReferencesUtil.merge(raw_expr_1.RawExprUtil.usedReferences(left), raw_expr_1.RawExprUtil.usedReferences(right)), 
        //TODO More readable queries
        `${raw_expr_1.RawExprUtil.querify(left)} ${operator}\n${raw_expr_1.RawExprUtil.querify(right)}`);
    }
    Object.defineProperty(result, "name", {
        value: operator,
    });
    return result;
}
exports.TRUE = new expr_1.Expr({}, (name, mixed) => {
    const b = sd.numberToBoolean()(name, mixed);
    return sd.oneOf(true)(name, b);
}, "TRUE");
exports.FALSE = new expr_1.Expr({}, (name, mixed) => {
    const b = sd.numberToBoolean()(name, mixed);
    return sd.oneOf(false)(name, b);
}, "FALSE");
//export const and = booleanBinaryOp("AND");
//export const or = booleanBinaryOp("OR");
exports.xor = booleanBinaryOp("XOR");
function not(raw) {
    return boolean_expr_1.booleanExpr(raw_expr_1.RawExprUtil.usedReferences(raw), `NOT (${raw_expr_1.RawExprUtil.querify(raw)})`);
}
exports.not = not;
function implies(left, right) {
    return or_1.or(not(left), right);
}
exports.implies = implies;
//Internally,
//expression = condition ?
//    expression :
//    not(expression);
function negateIfFalse(condition, raw) {
    if (condition) {
        return raw_expr_1.RawExprUtil.toExpr(raw);
    }
    else {
        return not(raw);
    }
}
exports.negateIfFalse = negateIfFalse;
//# sourceMappingURL=logical-connective.js.map