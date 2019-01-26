import {RawExpr, RawExprUtil} from "../raw-expr";
import {Expr} from "../expr";
import {ColumnReferencesUtil} from "../column-references";
import {NumericIntervalUnit} from "./interval-unit";

import {SelectBuilder} from "../select-builder";
import {Column} from "../column";
SelectBuilder;
Column;

export function timestampAdd<
    IntervalT extends RawExpr<number>,
    DateTimeT extends RawExpr<Date>
> (
    intervalUnit : NumericIntervalUnit,
    interval : IntervalT,
    dateTime : DateTimeT
) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<IntervalT>,
            RawExprUtil.UsedReferences<DateTimeT>
        >,
        Date
    >
) {
    return new Expr(
        ColumnReferencesUtil.merge(
            RawExprUtil.usedReferences(interval),
            RawExprUtil.usedReferences(dateTime)
        ),
        //Not totally sure this is correct, maybe make it just dateTimeWithMillisecond() ?
        //Or should it resolve to a string because MySQL supports microseconds but JS' Date does not...
        RawExprUtil.assertDelegate(dateTime),
        `TIMESTAMPADD(${intervalUnit}, ${RawExprUtil.querify(interval)}, ${RawExprUtil.querify(dateTime)})`
    ) as any;
}