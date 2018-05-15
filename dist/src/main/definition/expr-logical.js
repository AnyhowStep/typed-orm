"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_factory_1 = require("./expr-factory");
const expr_operation_1 = require("./expr-operation");
const column_references_operation_1 = require("./column-references-operation");
const expr_1 = require("./expr");
function booleanBinaryOp(operator) {
    function result(left, right) {
        return expr_factory_1.booleanExpr(column_references_operation_1.combineReferences(expr_operation_1.usedColumns(left), expr_operation_1.usedColumns(right)), 
        //TODO More readable queries
        `${expr_operation_1.querify(left)} ${operator}\n${expr_operation_1.querify(right)}`);
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
exports.and = booleanBinaryOp("AND");
exports.or = booleanBinaryOp("OR");
exports.xor = booleanBinaryOp("XOR");
function not(raw) {
    return new expr_1.Expr(expr_operation_1.usedColumns(raw), sd.numberToBoolean(), `NOT ${expr_operation_1.querify(raw)}`);
}
exports.not = not;
//# sourceMappingURL=expr-logical.js.map