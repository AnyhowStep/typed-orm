"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("./expr");
const expr_operation_1 = require("./expr-operation");
const expr_factory_1 = require("./expr-factory");
const column_references_operation_1 = require("./column-references-operation");
function isNull(expr) {
    return expr_factory_1.booleanExpr(expr_operation_1.usedColumns(expr), `${expr_operation_1.querify(expr)} IS NULL`);
}
exports.isNull = isNull;
function isNotNull(expr) {
    return expr_factory_1.booleanExpr(expr_operation_1.usedColumns(expr), `${expr_operation_1.querify(expr)} IS NOT NULL`);
}
exports.isNotNull = isNotNull;
//Does not allow NULL but only during compile time...
function eq(left, right) {
    return expr_factory_1.booleanExpr(column_references_operation_1.combineReferences(expr_operation_1.usedColumns(left), expr_operation_1.usedColumns(right)), `${expr_operation_1.querify(left)} = ${expr_operation_1.querify(right)}`);
}
exports.eq = eq;
//Does not allow NULL but only during compile time...
function notEq(left, right) {
    return expr_factory_1.booleanExpr(column_references_operation_1.combineReferences(expr_operation_1.usedColumns(left), expr_operation_1.usedColumns(right)), `${expr_operation_1.querify(left)} != ${expr_operation_1.querify(right)}`);
}
exports.notEq = notEq;
//Equality check with NULL yields NULL
function eqAllowNull(left, right) {
    return new expr_1.Expr(column_references_operation_1.combineReferences(expr_operation_1.usedColumns(left), expr_operation_1.usedColumns(right)), sd.nullable(sd.numberToBoolean()), `${expr_operation_1.querify(left)} = ${expr_operation_1.querify(right)}`);
}
exports.eqAllowNull = eqAllowNull;
//Equality check with NULL yields NULL
function notEqAllowNull(left, right) {
    return new expr_1.Expr(column_references_operation_1.combineReferences(expr_operation_1.usedColumns(left), expr_operation_1.usedColumns(right)), sd.nullable(sd.numberToBoolean()), `${expr_operation_1.querify(left)} != ${expr_operation_1.querify(right)}`);
}
exports.notEqAllowNull = notEqAllowNull;
//`in` is a reserved keyword
function isIn(left, ...rightArr) {
    const rightQuery = [];
    let used = column_references_operation_1.copyReferences(expr_operation_1.usedColumns(left));
    for (let r of rightArr) {
        rightQuery.push(expr_operation_1.querify(r));
        used = column_references_operation_1.combineReferences(used, expr_operation_1.usedColumns(r));
    }
    return new expr_1.Expr(used, sd.numberToBoolean(), `${expr_operation_1.querify(left)} IN(${rightQuery.join(",")})`);
}
exports.isIn = isIn;
//`in` is a reserved keyword
function isInAllowNull(left, ...rightArr) {
    const rightQuery = [];
    let used = column_references_operation_1.copyReferences(expr_operation_1.usedColumns(left));
    for (let r of rightArr) {
        rightQuery.push(expr_operation_1.querify(r));
        used = column_references_operation_1.combineReferences(used, expr_operation_1.usedColumns(r));
    }
    return new expr_1.Expr(used, sd.nullable(sd.numberToBoolean()), `${expr_operation_1.querify(left)} IN(${rightQuery.join(",")})`);
}
exports.isInAllowNull = isInAllowNull;
//# sourceMappingURL=expr-comparison.js.map