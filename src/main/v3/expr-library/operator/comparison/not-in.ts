import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {NonNullPrimitiveExpr, PrimitiveExprUtil} from "../../../primitive-expr";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//value IN (/*Empty list*/) should be `false`
//value NOT IN (/*Empty list*/) should be `true`
//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_not-in
function notInPrimitiveList<
    LeftT extends RawExpr<NonNullPrimitiveExpr>
> (
    left : LeftT,
    ...args : RawExprUtil.TypeOf<LeftT>[]
) : (
    Expr<{
        usedColumns : RawExprUtil.UsedColumns<LeftT>,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    if (args.length == 0) {
        return new Expr(
            {
                usedColumns : RawExprUtil.usedColumns(left),
                assertDelegate : dataType.boolean(),
            },
            RawExprUtil.queryTree(true)
        );
    } else {
        return new Expr(
            {
                usedColumns : RawExprUtil.usedColumns(left),
                assertDelegate : dataType.boolean(),
            },
            [
                RawExprUtil.queryTree(left),
                new FunctionCall(
                    "NOT IN",
                    [
                        ...args.map(RawExprUtil.queryTree),
                    ]
                ),
            ]
        );
    }
}

//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_not-in
function notInExprList<
    LeftT extends RawExpr<NonNullPrimitiveExpr>,
    Arg0 extends RawExpr<RawExprUtil.TypeOf<LeftT>>,
    Args extends RawExpr<RawExprUtil.TypeOf<LeftT>>[]
>(
    left : LeftT,
    arg0 : Arg0,
    ...args : Args
) : (
    //Not an exact typing but, in general, should work
    Expr<{
        usedColumns : (
            RawExprUtil.UsedColumns<LeftT>[number] |
            RawExprUtil.UsedColumns<Arg0>[number] |
            RawExprUtil.Array.UsedColumns<Args>[number]
        )[],
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    return new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns([
                left,
                arg0,
                ...args,
            ]),
            assertDelegate : dataType.boolean(),
        },
        [
            RawExprUtil.queryTree(left),
            new FunctionCall(
                "NOT IN",
                [
                    RawExprUtil.queryTree(arg0),
                    ...args.map(RawExprUtil.queryTree),
                ]
            ),
        ]
    ) as any;
}

export function notIn<
    LeftT extends RawExpr<NonNullPrimitiveExpr>
> (
    left : LeftT,
    ...args : RawExprUtil.TypeOf<LeftT>[]
) : (
    Expr<{
        usedColumns : RawExprUtil.UsedColumns<LeftT>,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
);
export function notIn<
    LeftT extends RawExpr<NonNullPrimitiveExpr>,
    Arg0 extends RawExpr<RawExprUtil.TypeOf<LeftT>>,
    Args extends RawExpr<RawExprUtil.TypeOf<LeftT>>[]
>(
    left : LeftT,
    arg0 : Arg0,
    ...args : Args
) : (
    //Not an exact typing but, in general, should work
    Expr<{
        usedColumns : (
            RawExprUtil.UsedColumns<LeftT>[number] |
            RawExprUtil.UsedColumns<Arg0>[number] |
            RawExprUtil.Array.UsedColumns<Args>[number]
        )[],
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
);
export function notIn (left : RawExpr<NonNullPrimitiveExpr>, ...args : any[]) {
    if (PrimitiveExprUtil.isNonNullPrimitiveExprArray(args)) {
        return notInPrimitiveList(left, ...args);
    } else {
        return notInExprList(left, args[0], ...(args.slice(1) as any));
    }
}