import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import {TemporalUnit} from "../../constant";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_timestampadd
export function timestampAdd<
    IntervalT extends RawExpr<bigint>,
    DateTimeT extends RawExpr<Date>
>(
    temporalUnit : TemporalUnit,
    interval : IntervalT,
    dateTime : DateTimeT
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<IntervalT> &
            RawExprUtil.UsedRef<DateTimeT>
        ),
        assertDelegate : sd.AssertDelegate<Date>,
    }>
) {
    //Defend ourself from invalid values during run-time
    sd.enumeration(TemporalUnit)("temporalUnit", temporalUnit);
    const result = new Expr(
        {
            usedRef : RawExprUtil.intersectUsedRefTuple(
                interval,
                dateTime
            ),
            assertDelegate : dataType.dateTime(3),
        },
        new FunctionCall(
            "TIMESTAMPADD",
            [
                temporalUnit,
                RawExprUtil.queryTree(interval),
                RawExprUtil.queryTree(dateTime),
            ]
        )
    );
    return result;
}