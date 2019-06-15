import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import {TemporalUnit} from "../../constant";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_timestampdiff
export function timestampDiff<
    FromT extends RawExpr<Date>,
    ToT extends RawExpr<Date>
>(
    temporalUnit : TemporalUnit,
    from : FromT,
    to : ToT
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<FromT> &
            RawExprUtil.UsedRef<ToT>
        ),
        assertDelegate : sd.SafeMapper<bigint>,
    }>
) {
    //Defend ourself from invalid values during run-time
    sd.enumValue(TemporalUnit)("temporalUnit", temporalUnit);
    const result = new Expr(
        {
            usedRef : RawExprUtil.intersectUsedRefTuple(
                from,
                to
            ),
            assertDelegate : dataType.bigint(),
        },
        new FunctionCall(
            "TIMESTAMPDIFF",
            [
                temporalUnit,
                RawExprUtil.queryTree(from),
                RawExprUtil.queryTree(to),
            ]
        )
    );
    return result as any;
}