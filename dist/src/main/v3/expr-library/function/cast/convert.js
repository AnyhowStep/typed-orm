"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const constant_1 = require("../../constant");
const query_tree_1 = require("../../../query-tree");
function convert(rawExpr, transcodingName) {
    //Defend ourself against invalid values during run-time.
    sd.enumeration(constant_1.TranscodingName)("transcodingName", transcodingName);
    return new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
        assertDelegate: sd.string(),
    }, new query_tree_1.FunctionCall("CONVERT", [
        [
            raw_expr_1.RawExprUtil.queryTree(rawExpr),
            "USING",
            transcodingName
        ]
    ]));
}
exports.convert = convert;
//# sourceMappingURL=convert.js.map