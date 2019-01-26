import {AnyRawExpr, RawExprUtil} from "../raw-expr";
import {Expr} from "../expr";
import * as sd from "schema-decorator";
import {ColumnReferencesUtil} from "../column-references";

import {SelectBuilder} from "../select-builder";
import {Column} from "../column";
SelectBuilder;
Column;

//IFNULL() is MySQL-specific, COALESCE() is more portable (standard)
export function ifNull<
    LeftT extends AnyRawExpr,
    RightT extends AnyRawExpr
> (left : LeftT, right : RightT) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        Exclude<RawExprUtil.Type<LeftT>, null>|
        RawExprUtil.Type<RightT>
    >
) {
    return new Expr(
        ColumnReferencesUtil.merge(
            RawExprUtil.usedReferences(left),
            RawExprUtil.usedReferences(right)
        ),
        sd.or(
            sd.notNullable(RawExprUtil.assertDelegate(left)),
            RawExprUtil.assertDelegate(right)
        ),
        `IFNULL(${RawExprUtil.querify(left)}, ${RawExprUtil.querify(right)})`
    ) as any;
}