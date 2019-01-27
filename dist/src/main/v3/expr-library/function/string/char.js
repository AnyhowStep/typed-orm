"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
const constant_1 = require("../../constant");
//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_char
function toChar(arg0, ...args) {
    const result = new expr_1.Expr({
        usedColumns: raw_expr_1.RawExprUtil.Array.usedColumns([
            arg0,
            ...args,
        ]),
        assertDelegate: sd.buffer(),
    }, new query_tree_1.FunctionCall("CHAR", [
        raw_expr_1.RawExprUtil.queryTree(arg0),
        ...args.map(raw_expr_1.RawExprUtil.queryTree)
    ]));
    result.using = (transcodingName) => {
        //Defend ourself against invalid values during run-time.
        sd.enumeration(constant_1.TranscodingName)("transcodingName", transcodingName);
        const arr = [arg0, ...args];
        return new expr_1.Expr({
            usedColumns: result.usedColumns,
            assertDelegate: sd.string(),
        }, new query_tree_1.FunctionCall("CHAR", [
            ...arr.map((arg, index) => {
                if (index == arr.length - 1) {
                    return [
                        raw_expr_1.RawExprUtil.queryTree(arg),
                        "USING",
                        transcodingName
                    ];
                }
                else {
                    return raw_expr_1.RawExprUtil.queryTree(arg);
                }
            }),
        ]));
    };
    return result;
}
exports.toChar = toChar;
//# sourceMappingURL=char.js.map