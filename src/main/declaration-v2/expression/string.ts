import {Expr} from "../expr";
import {RawExpr, RawExprUtil} from "../raw-expr";
import * as sd from "schema-decorator";
import {ColumnReferencesUtil} from "../column-references";
import * as variadicUtil from "./variadic-util";

export function concat<
    LeftT extends RawExpr<boolean|number|string|Date>,
    R0 extends RawExpr<boolean|number|string|Date>
> (left : LeftT, r0 : R0) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<R0>
        >,
        string
    >
);
export function concat<
    LeftT extends RawExpr<boolean|number|string|Date>,
    R0 extends RawExpr<boolean|number|string|Date>,
    R1 extends RawExpr<boolean|number|string|Date>
> (left : LeftT, r0 : R0, r1 : R1) : (
    Expr<
        ColumnReferencesUtil.Merge<
            ColumnReferencesUtil.Merge<
                RawExprUtil.UsedReferences<LeftT>,
                RawExprUtil.UsedReferences<R0>
            >,
            RawExprUtil.UsedReferences<R1>
        >,
        string
    >
);
export function concat<
    LeftT extends RawExpr<boolean|number|string|Date>,
    R0 extends RawExpr<boolean|number|string|Date>,
    R1 extends RawExpr<boolean|number|string|Date>,
    R2 extends RawExpr<boolean|number|string|Date>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2) : (
    Expr<
        ColumnReferencesUtil.Merge<
            ColumnReferencesUtil.Merge<
                ColumnReferencesUtil.Merge<
                    RawExprUtil.UsedReferences<LeftT>,
                    RawExprUtil.UsedReferences<R0>
                >,
                RawExprUtil.UsedReferences<R1>
            >,
            RawExprUtil.UsedReferences<R2>
        >,
        string
    >
);
export function concat<
    LeftT extends RawExpr<boolean|number|string|Date>,
    R0 extends RawExpr<boolean|number|string|Date>,
    R1 extends RawExpr<boolean|number|string|Date>,
    R2 extends RawExpr<boolean|number|string|Date>,
    R3 extends RawExpr<boolean|number|string|Date>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3) : (
    Expr<
        ColumnReferencesUtil.Merge<
            ColumnReferencesUtil.Merge<
                ColumnReferencesUtil.Merge<
                    ColumnReferencesUtil.Merge<
                        RawExprUtil.UsedReferences<LeftT>,
                        RawExprUtil.UsedReferences<R0>
                    >,
                    RawExprUtil.UsedReferences<R1>
                >,
                RawExprUtil.UsedReferences<R2>
            >,
            RawExprUtil.UsedReferences<R3>
        >,
        string
    >
);
export function concat<
    LeftT extends RawExpr<boolean|number|string|Date>,
    RightT extends RawExpr<boolean|number|string|Date>
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        string
    >
);
export function concat<
    LeftT extends RawExpr<boolean|number|string|Date>,
    RightT extends RawExpr<boolean|number|string|Date>
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        string
    >
) {
    const q = variadicUtil.querifyNonNullable(left, ...rightArr);

    return new Expr(
        q.used,
        sd.string(),
        `CONCAT(${q.leftQuery}, ${q.rightQueries.join(",")})`
    ) as any;
}
