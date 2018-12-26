"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_library_1 = require("../../../expr-library");
function eq(joinDecl) {
    const arr = joinDecl.from.map((f, index) => expr_library_1.nullSafeEq(f, joinDecl.to[index]));
    return expr_library_1.and(...arr);
}
exports.eq = eq;
//# sourceMappingURL=eq.js.map