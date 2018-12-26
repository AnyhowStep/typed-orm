"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../operation");
const exprLib = require("../../../expr-library");
const fetch_value_1 = require("./fetch-value");
const constructor_1 = require("../constructor");
async function exists(query, connection) {
    return fetch_value_1.fetchValue(operation_1.selectExpr(constructor_1.newInstance(), () => exprLib.exists(query)), connection);
}
exports.exists = exists;
//# sourceMappingURL=exists.js.map