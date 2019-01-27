import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_field
export function field<
    NeedleT extends RawExpr<string>,
    Arg0 extends RawExpr<string>,
    Args extends RawExpr<string>[],
>(
    needle : NeedleT,
    arg0 : Arg0,
    ...args : Args
) : (
    Expr<{
        usedColumns : (
            RawExprUtil.UsedColumns<NeedleT>[number] |
            RawExprUtil.UsedColumns<Arg0>[number] |
            RawExprUtil.Array.UsedColumns<Args>[number]
        )[],
        assertDelegate : sd.AssertDelegate<number>,
    }>
) {
    const result = new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns([
                needle,
                arg0,
                ...args,
            ]),
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