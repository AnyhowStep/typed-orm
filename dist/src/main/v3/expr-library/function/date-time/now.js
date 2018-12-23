"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const data_type_1 = require("../../../data-type");
const nowArr = [
    new expr_1.Expr({
        usedRef: {},
        assertDelegate: data_type_1.dateTime,
    }, "NOW()"),
];
for (let i = 1; i <= 6; ++i) {
    nowArr.push(new expr_1.Expr({
        usedRef: {},
        assertDelegate: data_type_1.dateTime,
    }, `NOW(${i})`));
}
/*
    JavaScript's `Date` class only supports up to millisecond precision.
    This is equivalent to 3 fractional seconds precision.

    However, MySQL has up to 6 fractional seconds precision.
    This is equivalent to microsecond precision.
*/
function now(fractionalSecondsPrecision = 0) {
    //Run-time check. To be safe.
    sd.literal(0, 1, 2, 3, 4, 5, 6)("fractionalSecondsPrecision", fractionalSecondsPrecision);
    return nowArr[fractionalSecondsPrecision];
}
exports.now = now;
//# sourceMappingURL=now.js.map