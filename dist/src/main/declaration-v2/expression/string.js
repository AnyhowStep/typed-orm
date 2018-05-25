"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../expr");
const sd = require("schema-decorator");
const variadicUtil = require("./variadic-util");
function concat(left, ...rightArr) {
    const q = variadicUtil.querifyNonNullable(left, ...rightArr);
    return new expr_1.Expr(q.used, sd.string(), `CONCAT(${q.leftQuery}, ${q.rightQueries.join(",")})`);
}
exports.concat = concat;
//# sourceMappingURL=string.js.map