import * as d from "../../declaration";
import {Expr} from "../expr";
import * as sd from "schema-decorator";
import {usedColumns, querify} from "../expr-operation";
import {combineReferences, copyReferences} from "../column-references-operation";

export function coalesce<
    LeftT extends d.RawExpr<any>,
    R0 extends d.RawExpr<any>
> (left : LeftT, r0 : R0) : (
    Expr<
        d.ExprUsedColumns<LeftT> &
        d.ExprUsedColumns<R0>,
        Exclude<d.ExprType<LeftT>, null>|
        d.ExprType<R0>
    >
);
export function coalesce<
    LeftT extends d.RawExpr<any>,
    R0 extends d.RawExpr<any>,
    R1 extends d.RawExpr<any>
> (left : LeftT, r0 : R0, r1 : R1) : (
    Expr<
        d.ExprUsedColumns<LeftT> &
        d.ExprUsedColumns<R0> &
        d.ExprUsedColumns<R1>,
        Exclude<d.ExprType<LeftT>, null>|
        Exclude<d.ExprType<R0>, null>|
        d.ExprType<R1>
    >
);
export function coalesce<
    LeftT extends d.RawExpr<any>,
    R0 extends d.RawExpr<any>,
    R1 extends d.RawExpr<any>,
    R2 extends d.RawExpr<any>
> (left : LeftT, r0 : R0, r1 : R1, r2 : R2) : (
    Expr<
        d.ExprUsedColumns<LeftT> &
        d.ExprUsedColumns<R0> &
        d.ExprUsedColumns<R1> &
        d.ExprUsedColumns<R2>,
        Exclude<d.ExprType<LeftT>, null>|
        Exclude<d.ExprType<R0>, null>|
        Exclude<d.ExprType<R1>, null>|
        d.ExprType<R2>
    >
);
export function coalesce<
    LeftT extends d.RawExpr<any>,
    RightT extends d.RawExpr<any>
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>,
        Exclude<d.ExprType<LeftT>, null>|d.ExprType<RightT>
    >
);
export function coalesce<
    LeftT extends d.RawExpr<any>,
    RightT extends d.RawExpr<any>
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>,
        d.ExprType<LeftT>|d.ExprType<RightT>|null
    >
) {
    const rightQuery : string[] = [];
    let used : any = copyReferences(usedColumns(left));
    for (let r of rightArr) {
        rightQuery.push(querify(r));
        used = combineReferences(used, usedColumns(r));
    }

    return new Expr(
        used,
        sd.string(),
        `COALESCE(${querify(left)}, ${rightQuery.join(",")})`
    ) as any;
}
