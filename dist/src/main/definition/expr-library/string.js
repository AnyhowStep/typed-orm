"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../expr");
const sd = require("schema-decorator");
const expr_operation_1 = require("../expr-operation");
const column_references_operation_1 = require("../column-references-operation");
function concat(left, ...rightArr) {
    const rightQuery = [];
    let used = column_references_operation_1.copyReferences(expr_operation_1.usedColumns(left));
    for (let r of rightArr) {
        rightQuery.push(expr_operation_1.querify(r));
        used = column_references_operation_1.combineReferences(used, expr_operation_1.usedColumns(r));
    }
    return new expr_1.Expr(used, sd.string(), `CONCAT(${expr_operation_1.querify(left)}, ${rightQuery.join(",")})`);
}
exports.concat = concat;
//# sourceMappingURL=string.js.map