import {booleanExpr} from "../boolean-expr";
import {RawExpr, RawExprUtil} from "../../raw-expr";
import {ColumnReferencesUtil} from "../../column-references";
import {Expr} from "../../expr";
import * as variadicUtil from "../variadic-util";

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

export function or<
    LeftT extends RawExpr<boolean>,
    RightT extends RawExpr<boolean>
> (left : LeftT, right : RightT) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        boolean
    >
);
export function or<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1) : (
    Expr<
        ColumnReferencesUtil.Merge<
            ColumnReferencesUtil.Merge<
                RawExprUtil.UsedReferences<LeftT>,
                RawExprUtil.UsedReferences<R0>
            >,
            RawExprUtil.UsedReferences<R1>
        >,
        boolean
    >
);
export function or<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>
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
        boolean
    >
);
export function or<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>
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
        boolean
    >
);
export function or<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4) : (
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
        boolean
    >
);
export function or<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5) : (
    Expr<
        ColumnReferencesUtil.Merge<
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
            RawExprUtil.UsedReferences<R5>
        >,
        boolean
    >
);
export function or<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>,
    R6 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5, r6 : R6) : (
    Expr<
        ColumnReferencesUtil.Merge<
            ColumnReferencesUtil.Merge<
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
                RawExprUtil.UsedReferences<R5>
            >,
            RawExprUtil.UsedReferences<R6>
        >,
        boolean
    >
);
export function or<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>,
    R6 extends RawExpr<boolean>,
    R7 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5, r6 : R6, r7 : R7) : (
    Expr<
        ColumnReferencesUtil.Merge<
            ColumnReferencesUtil.Merge<
                ColumnReferencesUtil.Merge<
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
                    RawExprUtil.UsedReferences<R5>
                >,
                RawExprUtil.UsedReferences<R6>
            >,
            RawExprUtil.UsedReferences<R7>
        >,
        boolean
    >
);
export function or<
    LeftT extends RawExpr<boolean>,
    RightT extends RawExpr<boolean>
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        boolean
    >
);
export function or<
    LeftT extends RawExpr<boolean>,
    RightT extends RawExpr<boolean>
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        boolean
    >
) {
    const q = variadicUtil.querifyNonNullable(left, ...rightArr);

    return booleanExpr(
        q.used,
        `\n\t${[q.leftQuery, ...q.rightQueries].join(" OR\n\t")}\n`
    ) as any;
}