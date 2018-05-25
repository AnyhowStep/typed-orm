"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../expr");
const sd = require("schema-decorator");
const variadicUtil = require("./variadic-util");
function coalesce(left, ...rightArr) {
    const q = variadicUtil.querifyNullable(left, ...rightArr);
    return new expr_1.Expr(q.used, sd.string(), `COALESCE(${q.leftQuery}, ${q.rightQueries.join(",")})`);
}
exports.coalesce = coalesce;
//# sourceMappingURL=coalesce.js.map