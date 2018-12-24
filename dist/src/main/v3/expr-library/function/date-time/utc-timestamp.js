"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const data_type_1 = require("../../../data-type");
const cache = [undefined, undefined, undefined, undefined];
/*
    JavaScript's `Date` class only supports up to millisecond precision.
    This is equivalent to 3 fractional seconds precision.

    However, MySQL has up to 6 fractional seconds precision.
    This is equivalent to microsecond precision.
*/
function utcTimestamp(fractionalSecondsPrecision = 0) {
    //Run-time check. To be safe.
    sd.literal(0, 1, 2, 3 /*, 4, 5, 6*/)("fractionalSecondsPrecision", fractionalSecondsPrecision);
    let cached = cache[fractionalSecondsPrecision];
    if (cached == undefined) {
        cached = new expr_1.Expr({
            usedRef: {},
            assertDelegate: data_type_1.dateTime(fractionalSecondsPrecision),
        }, `UTC_TIMESTAMP(${fractionalSecondsPrecision == 0 ? '' : fractionalSecondsPrecision})`);
        cache[fractionalSecondsPrecision] = cached;
    }
    return cached;
}
exports.utcTimestamp = utcTimestamp;
//# sourceMappingURL=utc-timestamp.js.map