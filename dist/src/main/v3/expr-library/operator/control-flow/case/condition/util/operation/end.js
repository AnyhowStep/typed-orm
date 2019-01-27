"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../../../../../expr");
function EndFunction(builder) {
    return new expr_1.Expr({
        usedColumns: builder.usedColumns,
        assertDelegate: sd.nullable(builder.result),
    }, [
        ...builder.queryTree,
        "END",
    ]);
}
exports.end = EndFunction;
//# sourceMappingURL=end.js.map