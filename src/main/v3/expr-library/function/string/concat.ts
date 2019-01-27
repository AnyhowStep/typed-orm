import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import {Tuple} from "../../../tuple";

//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_concat
//TODO-FEATURE Add support for Buffer
//If all arguments are nonbinary strings, the result is a nonbinary string.
//If the arguments include any binary strings, the result is a binary string.
export function concat<
    Arg0 extends RawExpr<string>,
    Args extends Tuple<RawExpr<string>>,
>(
    arg0 : Arg0,
    ...args : Args
) : (
    Expr<{
        usedColumns : (
            RawExprUtil.UsedColumns<Arg0>[number] |
            RawExprUtil.Array.UsedColumns<Args>[number]
        )[],
        assertDelegate : sd.AssertDelegate<string>,
    }>
) {
    const result = new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns([
                arg0,
                ...args,
            ]),
            assertDelegate : sd.string(),
        },
        new FunctionCall(
            "CONCAT",
            [
                RawExprUtil.queryTree(arg0),
                ...args.map(RawExprUtil.queryTree)
            ]
        )
    );
    return result as any;
}