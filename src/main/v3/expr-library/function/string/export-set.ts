import * as sd from "schema-decorator";
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
        usedColumns : (
            RawExprUtil.UsedColumns<BitsT>[number] |
            RawExprUtil.UsedColumns<OnT>[number] |
            RawExprUtil.UsedColumns<OffT>[number]
        )[],
        assertDelegate : sd.AssertDelegate<string>,
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
        usedColumns : (
            RawExprUtil.UsedColumns<BitsT>[number] |
            RawExprUtil.UsedColumns<OnT>[number] |
            RawExprUtil.UsedColumns<OffT>[number] |
            RawExprUtil.UsedColumns<SeparatorT>[number]
        )[],
        assertDelegate : sd.AssertDelegate<string>,
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
        usedColumns : (
            RawExprUtil.UsedColumns<BitsT>[number] |
            RawExprUtil.UsedColumns<OnT>[number] |
            RawExprUtil.UsedColumns<OffT>[number] |
            RawExprUtil.UsedColumns<SeparatorT>[number] |
            RawExprUtil.UsedColumns<NumberOfBitsT>[number]
        )[],
        assertDelegate : sd.AssertDelegate<string>,
    }>
);
export function exportSet (...args : RawExpr<any>[]) {
    const result = new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns(
                args
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