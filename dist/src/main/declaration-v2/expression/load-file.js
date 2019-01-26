"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../raw-expr");
const expr_1 = require("../expr/expr");
const sd = require("schema-decorator");
function loadFile(raw) {
    return new expr_1.Expr(raw_expr_1.RawExprUtil.usedReferences(raw), sd.nullable(sd.buffer()), `LOAD_FILE(${raw_expr_1.RawExprUtil.querify(raw)})`);
}
exports.loadFile = loadFile;
//# sourceMappingURL=load-file.js.map