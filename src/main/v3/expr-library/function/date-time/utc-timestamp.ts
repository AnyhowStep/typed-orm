import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {dateTime} from "../../../data-type";

const cache : {
    [index in 0|1|2|3]? : Expr<{
        usedRef : {},
        assertDelegate : sd.AssertDelegate<Date>
    }>
} = [undefined, undefined, undefined, undefined];
/*
    JavaScript's `Date` class only supports up to millisecond precision.
    This is equivalent to 3 fractional seconds precision.

    However, MySQL has up to 6 fractional seconds precision.
    This is equivalent to microsecond precision.
*/
export function utcTimestamp (fractionalSecondsPrecision : 0|1|2|3/*|4|5|6*/ = 0) {
    //Run-time check. To be safe.
    sd.literal(0, 1, 2, 3/*, 4, 5, 6*/)("fractionalSecondsPrecision", fractionalSecondsPrecision);
    let cached = cache[fractionalSecondsPrecision];
    if (cached == undefined) {
        cached = new Expr(
            {
                usedRef : {},
                assertDelegate : dateTime(fractionalSecondsPrecision),
            },
            `UTC_TIMESTAMP(${fractionalSecondsPrecision == 0 ? '' : fractionalSecondsPrecision})`
        );
        cache[fractionalSecondsPrecision] = cached;
    }
    return cached;
}
