import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_interval
export function interval<
    Arg0 extends RawExpr<number|bigint>,
    Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>,
    Args extends RawExpr<RawExprUtil.TypeOf<Arg0>>[]
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
        assertDelegate : sd.AssertDelegate<bigint>,
    }>
) {
    return new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns([
                arg0,
                arg1,
                ...args,
            ]),
            assertDelegate : dataType.bigint(),
        },
        new FunctionCall(
            "INTERVAL",
            [
                RawExprUtil.queryTree(arg0),
                RawExprUtil.queryTree(arg1),
                ...args.map(RawExprUtil.queryTree),
            ]
        )
    ) as any;
}