import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {dateTime} from "../../../data-type";

const now : Expr<{
    usedRef : {},
    assertDelegate : ReturnType<typeof dateTime>
}>[] = [
    new Expr(
        {
            usedRef : {},
            assertDelegate : dateTime(),
        },
        "NOW()"
    ),
];
for (let i=1; i<=6; ++i) {
    now.push(new Expr(
        {
            usedRef : {},
            assertDelegate : dateTime(),
        },
        `NOW(${i})`
    ));
}
/*
    JavaScript's `Date` class only supports up to millisecond precision.
    This is equivalent to 3 fractional seconds precision.

    However, MySQL has up to 6 fractional seconds precision.
    This is equivalent to microsecond precision.
*/
export function NOW (fractionalSecondsPrecision : 0|1|2|3|4|5|6 = 0) {
    //Run-time check. To be safe.
    sd.literal(0, 1, 2, 3, 4, 5, 6)("fractionalSecondsPrecision", fractionalSecondsPrecision);
    return now[fractionalSecondsPrecision];
}
