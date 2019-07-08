"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
//import {Tuple} from "../../../tuple";
/**
 * https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_concat-ws
 *
 * + If all arguments are nonbinary strings, the result is a nonbinary string.
 * + If the arguments include any binary strings, the result is a binary string.
 *
 * @param separator
 * @param arg0
 * @param args
 * @todo Add support for `Buffer`
 */
function concatWs(separator, arg0, ...args) {
    const result = new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.intersectUsedRefTuple(separator, arg0, ...args),
        assertDelegate: sd.string(),
    }, new query_tree_1.FunctionCall("CONCAT_WS", [
        raw_expr_1.RawExprUtil.queryTree(separator),
        raw_expr_1.RawExprUtil.queryTree(arg0),
        ...args.map(raw_expr_1.RawExprUtil.queryTree)
    ]));
    return result;
}
exports.concatWs = concatWs;
/**
 * Like `concatWs()` but throws an error if zero `args` is given.
 *
 * @param separator
 * @param args
 */
function unsafeConcatWs(separator, ...args) {
    if (args.length == 0) {
        throw new Error(`Cannot CONCAT_WS() zero arguments`);
    }
    const result = new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.intersectUsedRefTuple(separator, ...args),
        assertDelegate: sd.string(),
    }, new query_tree_1.FunctionCall("CONCAT_WS", [
        raw_expr_1.RawExprUtil.queryTree(separator),
        ...args.map(raw_expr_1.RawExprUtil.queryTree)
    ]));
    return result;
}
exports.unsafeConcatWs = unsafeConcatWs;
//# sourceMappingURL=concat-ws.js.map