import {RawExpr, RawExprUtil} from "../../raw-expr";
import {ColumnReferencesUtil} from "../../column-references";
import {Expr} from "../../expr";
import * as variadicUtil from "../variadic-util";
import * as sd from "schema-decorator";

import {SelectBuilder} from "../../select-builder";
import {Column} from "../../column";
import {AliasedExpr} from "../../aliased-expr";
import {Join} from "../../join";
import {AliasedTable} from "../../aliased-table";
SelectBuilder;
Column;
AliasedExpr;
Join;
AliasedTable;

export function least<
    LeftT extends RawExpr<number>,
    RightT extends RawExpr<number>
> (left : LeftT, right : RightT) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        number
    >
);
export function least<
    LeftT extends RawExpr<number>,
    R0 extends RawExpr<number>,
    R1 extends RawExpr<number>
> (left : LeftT, r0 : R0, r1 : R1) : (
    Expr<
        ColumnReferencesUtil.Merge<
            ColumnReferencesUtil.Merge<
                RawExprUtil.UsedReferences<LeftT>,
                RawExprUtil.UsedReferences<R0>
            >,
            RawExprUtil.UsedReferences<R1>
        >,
        number
    >
);
export function least<
    LeftT extends RawExpr<number>,
    R0 extends RawExpr<number>,
    R1 extends RawExpr<number>,
    R2 extends RawExpr<number>
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
        number
    >
);
export function least<
    LeftT extends RawExpr<number>,
    R0 extends RawExpr<number>,
    R1 extends RawExpr<number>,
    R2 extends RawExpr<number>,
    R3 extends RawExpr<number>
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
        number
    >
);
export function least<
    LeftT extends RawExpr<number>,
    R0 extends RawExpr<number>,
    R1 extends RawExpr<number>,
    R2 extends RawExpr<number>,
    R3 extends RawExpr<number>,
    R4 extends RawExpr<number>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3) : (
    Expr<
        ColumnReferencesUtil.Merge<
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
            RawExprUtil.UsedReferences<R4>
        >,
        number
    >
);
export function least<
    LeftT extends RawExpr<number>,
    RightT extends RawExpr<number>
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        number
    >
);
export function least<
    LeftT extends RawExpr<number>,
    RightT extends RawExpr<number>
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        number
    >
) {
    const q = variadicUtil.querifyNonNullable(left, ...rightArr);

    return new Expr(
        q.used,
        sd.number(),
        `LEAST(${[q.leftQuery, ...q.rightQueries].join(", ")})`
    ) as any;
}