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

/*
function gen (n) {
let args0 = [];
let args1 = [];
let args2 = [];
let args3 = [];
let args4 = [];
for (let i=0; i<n; ++i) {
    args0.push(`R${i} extends RawExpr<boolean>`);
    args1.push(`r${i} : R${i}`);
    args2.push(`RawExprUtil.UsedReferences<R${i}>`);
}
return `export function and<
    LeftT extends RawExpr<boolean>,
	${args0.join(",\n\t")}
> (left : LeftT, ${args1.join(", ")}) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            ${args2.join(" &\n\t\t\t")}
        >,
        boolean
    >
);`;
}
arr = [];
for (let i=1; i<21; ++i) {
arr.push(gen(i));
}
arr.join("\n").replace(/\t/g, "    ");
*/
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>
> (left : LeftT, r0 : R0) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4> &
            RawExprUtil.UsedReferences<R5>
        >,
        boolean
    >
);
export function and<
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
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4> &
            RawExprUtil.UsedReferences<R5> &
            RawExprUtil.UsedReferences<R6>
        >,
        boolean
    >
);
export function and<
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
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4> &
            RawExprUtil.UsedReferences<R5> &
            RawExprUtil.UsedReferences<R6> &
            RawExprUtil.UsedReferences<R7>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>,
    R6 extends RawExpr<boolean>,
    R7 extends RawExpr<boolean>,
    R8 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5, r6 : R6, r7 : R7, r8 : R8) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4> &
            RawExprUtil.UsedReferences<R5> &
            RawExprUtil.UsedReferences<R6> &
            RawExprUtil.UsedReferences<R7> &
            RawExprUtil.UsedReferences<R8>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>,
    R6 extends RawExpr<boolean>,
    R7 extends RawExpr<boolean>,
    R8 extends RawExpr<boolean>,
    R9 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5, r6 : R6, r7 : R7, r8 : R8, r9 : R9) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4> &
            RawExprUtil.UsedReferences<R5> &
            RawExprUtil.UsedReferences<R6> &
            RawExprUtil.UsedReferences<R7> &
            RawExprUtil.UsedReferences<R8> &
            RawExprUtil.UsedReferences<R9>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>,
    R6 extends RawExpr<boolean>,
    R7 extends RawExpr<boolean>,
    R8 extends RawExpr<boolean>,
    R9 extends RawExpr<boolean>,
    R10 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5, r6 : R6, r7 : R7, r8 : R8, r9 : R9, r10 : R10) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4> &
            RawExprUtil.UsedReferences<R5> &
            RawExprUtil.UsedReferences<R6> &
            RawExprUtil.UsedReferences<R7> &
            RawExprUtil.UsedReferences<R8> &
            RawExprUtil.UsedReferences<R9> &
            RawExprUtil.UsedReferences<R10>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>,
    R6 extends RawExpr<boolean>,
    R7 extends RawExpr<boolean>,
    R8 extends RawExpr<boolean>,
    R9 extends RawExpr<boolean>,
    R10 extends RawExpr<boolean>,
    R11 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5, r6 : R6, r7 : R7, r8 : R8, r9 : R9, r10 : R10, r11 : R11) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4> &
            RawExprUtil.UsedReferences<R5> &
            RawExprUtil.UsedReferences<R6> &
            RawExprUtil.UsedReferences<R7> &
            RawExprUtil.UsedReferences<R8> &
            RawExprUtil.UsedReferences<R9> &
            RawExprUtil.UsedReferences<R10> &
            RawExprUtil.UsedReferences<R11>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>,
    R6 extends RawExpr<boolean>,
    R7 extends RawExpr<boolean>,
    R8 extends RawExpr<boolean>,
    R9 extends RawExpr<boolean>,
    R10 extends RawExpr<boolean>,
    R11 extends RawExpr<boolean>,
    R12 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5, r6 : R6, r7 : R7, r8 : R8, r9 : R9, r10 : R10, r11 : R11, r12 : R12) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4> &
            RawExprUtil.UsedReferences<R5> &
            RawExprUtil.UsedReferences<R6> &
            RawExprUtil.UsedReferences<R7> &
            RawExprUtil.UsedReferences<R8> &
            RawExprUtil.UsedReferences<R9> &
            RawExprUtil.UsedReferences<R10> &
            RawExprUtil.UsedReferences<R11> &
            RawExprUtil.UsedReferences<R12>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>,
    R6 extends RawExpr<boolean>,
    R7 extends RawExpr<boolean>,
    R8 extends RawExpr<boolean>,
    R9 extends RawExpr<boolean>,
    R10 extends RawExpr<boolean>,
    R11 extends RawExpr<boolean>,
    R12 extends RawExpr<boolean>,
    R13 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5, r6 : R6, r7 : R7, r8 : R8, r9 : R9, r10 : R10, r11 : R11, r12 : R12, r13 : R13) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4> &
            RawExprUtil.UsedReferences<R5> &
            RawExprUtil.UsedReferences<R6> &
            RawExprUtil.UsedReferences<R7> &
            RawExprUtil.UsedReferences<R8> &
            RawExprUtil.UsedReferences<R9> &
            RawExprUtil.UsedReferences<R10> &
            RawExprUtil.UsedReferences<R11> &
            RawExprUtil.UsedReferences<R12> &
            RawExprUtil.UsedReferences<R13>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>,
    R6 extends RawExpr<boolean>,
    R7 extends RawExpr<boolean>,
    R8 extends RawExpr<boolean>,
    R9 extends RawExpr<boolean>,
    R10 extends RawExpr<boolean>,
    R11 extends RawExpr<boolean>,
    R12 extends RawExpr<boolean>,
    R13 extends RawExpr<boolean>,
    R14 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5, r6 : R6, r7 : R7, r8 : R8, r9 : R9, r10 : R10, r11 : R11, r12 : R12, r13 : R13, r14 : R14) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4> &
            RawExprUtil.UsedReferences<R5> &
            RawExprUtil.UsedReferences<R6> &
            RawExprUtil.UsedReferences<R7> &
            RawExprUtil.UsedReferences<R8> &
            RawExprUtil.UsedReferences<R9> &
            RawExprUtil.UsedReferences<R10> &
            RawExprUtil.UsedReferences<R11> &
            RawExprUtil.UsedReferences<R12> &
            RawExprUtil.UsedReferences<R13> &
            RawExprUtil.UsedReferences<R14>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>,
    R6 extends RawExpr<boolean>,
    R7 extends RawExpr<boolean>,
    R8 extends RawExpr<boolean>,
    R9 extends RawExpr<boolean>,
    R10 extends RawExpr<boolean>,
    R11 extends RawExpr<boolean>,
    R12 extends RawExpr<boolean>,
    R13 extends RawExpr<boolean>,
    R14 extends RawExpr<boolean>,
    R15 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5, r6 : R6, r7 : R7, r8 : R8, r9 : R9, r10 : R10, r11 : R11, r12 : R12, r13 : R13, r14 : R14, r15 : R15) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4> &
            RawExprUtil.UsedReferences<R5> &
            RawExprUtil.UsedReferences<R6> &
            RawExprUtil.UsedReferences<R7> &
            RawExprUtil.UsedReferences<R8> &
            RawExprUtil.UsedReferences<R9> &
            RawExprUtil.UsedReferences<R10> &
            RawExprUtil.UsedReferences<R11> &
            RawExprUtil.UsedReferences<R12> &
            RawExprUtil.UsedReferences<R13> &
            RawExprUtil.UsedReferences<R14> &
            RawExprUtil.UsedReferences<R15>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>,
    R6 extends RawExpr<boolean>,
    R7 extends RawExpr<boolean>,
    R8 extends RawExpr<boolean>,
    R9 extends RawExpr<boolean>,
    R10 extends RawExpr<boolean>,
    R11 extends RawExpr<boolean>,
    R12 extends RawExpr<boolean>,
    R13 extends RawExpr<boolean>,
    R14 extends RawExpr<boolean>,
    R15 extends RawExpr<boolean>,
    R16 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5, r6 : R6, r7 : R7, r8 : R8, r9 : R9, r10 : R10, r11 : R11, r12 : R12, r13 : R13, r14 : R14, r15 : R15, r16 : R16) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4> &
            RawExprUtil.UsedReferences<R5> &
            RawExprUtil.UsedReferences<R6> &
            RawExprUtil.UsedReferences<R7> &
            RawExprUtil.UsedReferences<R8> &
            RawExprUtil.UsedReferences<R9> &
            RawExprUtil.UsedReferences<R10> &
            RawExprUtil.UsedReferences<R11> &
            RawExprUtil.UsedReferences<R12> &
            RawExprUtil.UsedReferences<R13> &
            RawExprUtil.UsedReferences<R14> &
            RawExprUtil.UsedReferences<R15> &
            RawExprUtil.UsedReferences<R16>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>,
    R6 extends RawExpr<boolean>,
    R7 extends RawExpr<boolean>,
    R8 extends RawExpr<boolean>,
    R9 extends RawExpr<boolean>,
    R10 extends RawExpr<boolean>,
    R11 extends RawExpr<boolean>,
    R12 extends RawExpr<boolean>,
    R13 extends RawExpr<boolean>,
    R14 extends RawExpr<boolean>,
    R15 extends RawExpr<boolean>,
    R16 extends RawExpr<boolean>,
    R17 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5, r6 : R6, r7 : R7, r8 : R8, r9 : R9, r10 : R10, r11 : R11, r12 : R12, r13 : R13, r14 : R14, r15 : R15, r16 : R16, r17 : R17) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4> &
            RawExprUtil.UsedReferences<R5> &
            RawExprUtil.UsedReferences<R6> &
            RawExprUtil.UsedReferences<R7> &
            RawExprUtil.UsedReferences<R8> &
            RawExprUtil.UsedReferences<R9> &
            RawExprUtil.UsedReferences<R10> &
            RawExprUtil.UsedReferences<R11> &
            RawExprUtil.UsedReferences<R12> &
            RawExprUtil.UsedReferences<R13> &
            RawExprUtil.UsedReferences<R14> &
            RawExprUtil.UsedReferences<R15> &
            RawExprUtil.UsedReferences<R16> &
            RawExprUtil.UsedReferences<R17>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>,
    R6 extends RawExpr<boolean>,
    R7 extends RawExpr<boolean>,
    R8 extends RawExpr<boolean>,
    R9 extends RawExpr<boolean>,
    R10 extends RawExpr<boolean>,
    R11 extends RawExpr<boolean>,
    R12 extends RawExpr<boolean>,
    R13 extends RawExpr<boolean>,
    R14 extends RawExpr<boolean>,
    R15 extends RawExpr<boolean>,
    R16 extends RawExpr<boolean>,
    R17 extends RawExpr<boolean>,
    R18 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5, r6 : R6, r7 : R7, r8 : R8, r9 : R9, r10 : R10, r11 : R11, r12 : R12, r13 : R13, r14 : R14, r15 : R15, r16 : R16, r17 : R17, r18 : R18) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4> &
            RawExprUtil.UsedReferences<R5> &
            RawExprUtil.UsedReferences<R6> &
            RawExprUtil.UsedReferences<R7> &
            RawExprUtil.UsedReferences<R8> &
            RawExprUtil.UsedReferences<R9> &
            RawExprUtil.UsedReferences<R10> &
            RawExprUtil.UsedReferences<R11> &
            RawExprUtil.UsedReferences<R12> &
            RawExprUtil.UsedReferences<R13> &
            RawExprUtil.UsedReferences<R14> &
            RawExprUtil.UsedReferences<R15> &
            RawExprUtil.UsedReferences<R16> &
            RawExprUtil.UsedReferences<R17> &
            RawExprUtil.UsedReferences<R18>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>,
    R2 extends RawExpr<boolean>,
    R3 extends RawExpr<boolean>,
    R4 extends RawExpr<boolean>,
    R5 extends RawExpr<boolean>,
    R6 extends RawExpr<boolean>,
    R7 extends RawExpr<boolean>,
    R8 extends RawExpr<boolean>,
    R9 extends RawExpr<boolean>,
    R10 extends RawExpr<boolean>,
    R11 extends RawExpr<boolean>,
    R12 extends RawExpr<boolean>,
    R13 extends RawExpr<boolean>,
    R14 extends RawExpr<boolean>,
    R15 extends RawExpr<boolean>,
    R16 extends RawExpr<boolean>,
    R17 extends RawExpr<boolean>,
    R18 extends RawExpr<boolean>,
    R19 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2, r3 : R3, r4 : R4, r5 : R5, r6 : R6, r7 : R7, r8 : R8, r9 : R9, r10 : R10, r11 : R11, r12 : R12, r13 : R13, r14 : R14, r15 : R15, r16 : R16, r17 : R17, r18 : R18, r19 : R19) : (
    Expr<
        ColumnReferencesUtil.MergeIntersected<
            RawExprUtil.UsedReferences<LeftT> &
            RawExprUtil.UsedReferences<R0> &
            RawExprUtil.UsedReferences<R1> &
            RawExprUtil.UsedReferences<R2> &
            RawExprUtil.UsedReferences<R3> &
            RawExprUtil.UsedReferences<R4> &
            RawExprUtil.UsedReferences<R5> &
            RawExprUtil.UsedReferences<R6> &
            RawExprUtil.UsedReferences<R7> &
            RawExprUtil.UsedReferences<R8> &
            RawExprUtil.UsedReferences<R9> &
            RawExprUtil.UsedReferences<R10> &
            RawExprUtil.UsedReferences<R11> &
            RawExprUtil.UsedReferences<R12> &
            RawExprUtil.UsedReferences<R13> &
            RawExprUtil.UsedReferences<R14> &
            RawExprUtil.UsedReferences<R15> &
            RawExprUtil.UsedReferences<R16> &
            RawExprUtil.UsedReferences<R17> &
            RawExprUtil.UsedReferences<R18> &
            RawExprUtil.UsedReferences<R19>
        >,
        boolean
    >
);
export function and<
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
export function and<
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
        `\n\t${[q.leftQuery, ...q.rightQueries].join(" AND\n\t")}\n`
    ) as any;
}