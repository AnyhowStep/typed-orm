"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logical_1 = require("../logical");
const null_safe_eq_1 = require("./null-safe-eq");
/*
    Internally,

    NOT (a <=> b)
*/
function nullSafeNotEq(left, right) {
    return logical_1.not(null_safe_eq_1.nullSafeEq(left, right));
}
exports.nullSafeNotEq = nullSafeNotEq;
//# sourceMappingURL=null-safe-not-eq.js.map