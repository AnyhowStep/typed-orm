import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import {Tuple} from "../../../tuple";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_field
export function field<
    NeedleT extends RawExpr<string>,
    Arg0 extends RawExpr<string>,
    Args extends Tuple<RawExpr<string>>,
>(
    needle : NeedleT,
    arg0 : Arg0,
    ...args : Args
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<NeedleT> &
            RawExprUtil.UsedRef<Arg0> &
            RawExprUtil.IntersectUsedRefTuple<Args>
        ),
        assertDelegate : sd.SafeMapper<number>,
    }>
) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.intersectUsedRefTuple(
                needle,
                arg0,
                ...(args as any)
            ),
            assertDelegate : dataType.bigint(),
        },
        new FunctionCall(
            "FIELD",
            [
                RawExprUtil.queryTree(needle),
                RawExprUtil.queryTree(arg0),
                ...args.map(RawExprUtil.queryTree)
            ]
        )
    );
    return result as any;
}