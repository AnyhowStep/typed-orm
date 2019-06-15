import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";

//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_export-set
export function exportSet<
    BitsT extends RawExpr<number>,
    OnT extends RawExpr<string>,
    OffT extends RawExpr<string>
>(
    bits : BitsT,
    on : OnT,
    off : OffT
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<BitsT> &
            RawExprUtil.UsedRef<OnT> &
            RawExprUtil.UsedRef<OffT>
        ),
        assertDelegate : sd.SafeMapper<string>,
    }>
);
export function exportSet<
    BitsT extends RawExpr<number>,
    OnT extends RawExpr<string>,
    OffT extends RawExpr<string>,
    SeparatorT extends RawExpr<string>,
>(
    bits : BitsT,
    on : OnT,
    off : OffT,
    separator : SeparatorT,
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<BitsT> &
            RawExprUtil.UsedRef<OnT> &
            RawExprUtil.UsedRef<OffT> &
            RawExprUtil.UsedRef<SeparatorT>
        ),
        assertDelegate : sd.SafeMapper<string>,
    }>
);
export function exportSet<
    BitsT extends RawExpr<number>,
    OnT extends RawExpr<string>,
    OffT extends RawExpr<string>,
    SeparatorT extends RawExpr<string>,
    NumberOfBitsT extends RawExpr<number>
>(
    bits : BitsT,
    on : OnT,
    off : OffT,
    separator : SeparatorT,
    numberOfBits : NumberOfBitsT
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<BitsT> &
            RawExprUtil.UsedRef<OnT> &
            RawExprUtil.UsedRef<OffT> &
            RawExprUtil.UsedRef<SeparatorT> &
            RawExprUtil.UsedRef<NumberOfBitsT>
        ),
        assertDelegate : sd.SafeMapper<string>,
    }>
);
export function exportSet (...args : RawExpr<any>[]) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.intersectUsedRefTuple(
                ...(args as any)
            ),
            assertDelegate : sd.string(),
        },
        new FunctionCall(
            "EXPORT_SET",
            [
                ...args.map(RawExprUtil.queryTree)
            ]
        )
    );
    return result as any;
}