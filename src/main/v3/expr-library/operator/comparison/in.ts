import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {NonNullPrimitiveExpr} from "../../../primitive-expr";
import {Tuple} from "../../../tuple";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_in
function In<
    LeftT extends RawExpr<NonNullPrimitiveExpr>,
    Arg0 extends RawExpr<RawExprUtil.TypeOf<LeftT>>,
    Args extends Tuple<RawExpr<RawExprUtil.TypeOf<LeftT>>>
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
                "IN",
                [
                    RawExprUtil.queryTree(arg0),
                    ...args.map(RawExprUtil.queryTree),
                ]
            ),
        ]
    ) as any;
}
export {In as in};