import {AnyRawExpr, RawExprUtil} from "../raw-expr";
import {ColumnReferencesUtil} from "../column-references";
import {Expr} from "../expr";
import * as sd from "schema-decorator";
import * as variadicUtil from "./variadic-util";

export function coalesce<
    LeftT extends AnyRawExpr,
    R0 extends AnyRawExpr
> (left : LeftT, r0 : R0) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<R0>
        >,
        Exclude<RawExprUtil.Type<LeftT>, null>|
        RawExprUtil.Type<R0>
    >
);
export function coalesce<
    LeftT extends AnyRawExpr,
    R0 extends AnyRawExpr,
    R1 extends AnyRawExpr
> (left : LeftT, r0 : R0, r1 : R1) : (
    Expr<
        ColumnReferencesUtil.Merge<
            ColumnReferencesUtil.Merge<
                RawExprUtil.UsedReferences<LeftT>,
                RawExprUtil.UsedReferences<R0>
            >,
            RawExprUtil.UsedReferences<R1>
        >,
        Exclude<RawExprUtil.Type<LeftT>, null>|
        Exclude<RawExprUtil.Type<R0>, null>|
        RawExprUtil.Type<R1>
    >
);
export function coalesce<
    LeftT extends AnyRawExpr,
    R0 extends AnyRawExpr,
    R1 extends AnyRawExpr,
    R2 extends AnyRawExpr
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
        Exclude<RawExprUtil.Type<LeftT>, null>|
        Exclude<RawExprUtil.Type<R0>, null>|
        Exclude<RawExprUtil.Type<R1>, null>|
        RawExprUtil.Type<R2>
    >
);
export function coalesce<
    LeftT extends AnyRawExpr,
    RightT extends AnyRawExpr
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        Exclude<RawExprUtil.Type<LeftT>, null>|RawExprUtil.Type<RightT>
    >
);
export function coalesce<
    LeftT extends AnyRawExpr,
    RightT extends AnyRawExpr
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        Exclude<RawExprUtil.Type<LeftT>, null>|RawExprUtil.Type<RightT>
    >
) {
    const q = variadicUtil.querifyNullable(left, ...rightArr);

    return new Expr(
        q.used,
        sd.or(
            sd.notNullable(RawExprUtil.assertDelegate(left)),
            ...(rightArr.map((expr, index) => {
                if (index == rightArr.length-1) {
                    return RawExprUtil.assertDelegate(expr);
                } else {
                    return sd.notNullable(RawExprUtil.assertDelegate(expr));
                }
            }) as any)
        ),
        `COALESCE(${q.leftQuery}, ${q.rightQueries.join(",")})`
    ) as any;
}
