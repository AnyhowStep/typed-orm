import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import {NonNullPrimitiveExpr} from "../../../primitive-expr";
import {Tuple} from "../../../tuple";

//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_least
export function least<
    Arg0 extends RawExpr<NonNullPrimitiveExpr>,
    Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>,
    Args extends Tuple<RawExpr<RawExprUtil.TypeOf<Arg0>>>
>(
    arg0 : Arg0,
    arg1 : Arg1,
    ...args : Args
) : (
    //Not an exact typing but, in general, should work
    Expr<{
        usedColumns : (
            RawExprUtil.UsedColumns<Arg0>[number] |
            RawExprUtil.UsedColumns<Arg1>[number] |
            RawExprUtil.Array.UsedColumns<Args>[number]
        )[],
        assertDelegate : RawExprUtil.AssertDelegate<Arg0>,
    }>
) {
    return new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns([
                arg0,
                arg1,
                ...args,
            ]),
            assertDelegate : sd.or(
                RawExprUtil.assertDelegate(arg0),
                RawExprUtil.assertDelegate(arg1) as sd.AssertDelegate<any>,
                ...args.map(RawExprUtil.assertDelegate)
            ),
        },
        new FunctionCall(
            "LEAST",
            [
                RawExprUtil.queryTree(arg0),
                RawExprUtil.queryTree(arg1),
                ...args.map(RawExprUtil.queryTree),
            ]
        )
    ) as any;
}