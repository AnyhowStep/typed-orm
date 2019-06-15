"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const expr_1 = require("../../../../../../../expr");
function EndFunction(builder) {
    return new expr_1.Expr({
        usedRef: builder.usedRef,
        assertDelegate: sd.orNull(builder.result),
    }, [
        ...builder.queryTree,
        "END",
    ]);
}
exports.end = EndFunction;
//# sourceMappingURL=end.js.map