import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../raw-expr";
import {Expr} from "../expr";
import {ColumnReferencesUtil} from "../column-references";
import {NumericIntervalUnit} from "./interval-unit";

import {SelectBuilder} from "../select-builder";
import {Column} from "../column";
SelectBuilder;
Column;

//https://dev.mysql.com/doc/refman/5.5/en/date-and-time-functions.html#function_timestampdiff
//Returns SecondT - FirstT
//Not FirstT - SecondT
//Confusing. I know.
export function timestampDiff<
    FirstT extends RawExpr<Date>,
    SecondT extends RawExpr<Date>
> (
    intervalUnit : NumericIntervalUnit,
    first : FirstT,
    second : SecondT
) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<FirstT>,
            RawExprUtil.UsedReferences<SecondT>
        >,
        number
    >
) {
    return new Expr(
        ColumnReferencesUtil.merge(
            RawExprUtil.usedReferences(first),
            RawExprUtil.usedReferences(second)
        ),
        sd.number(),
        `TIMESTAMPDIFF(${intervalUnit}, ${RawExprUtil.querify(first)}, ${RawExprUtil.querify(second)})`
    ) as any;
}