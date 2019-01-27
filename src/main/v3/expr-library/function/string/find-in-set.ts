import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_find-in-set
export function findInSet<
    NeedleT extends RawExpr<string>,
    SetT extends RawExpr<string>
>(
    needle : NeedleT,
    set : SetT
) : (
    Expr<{
        usedColumns : (
            RawExprUtil.UsedColumns<NeedleT>[number] |
            RawExprUtil.UsedColumns<SetT>[number]
        )[],
        assertDelegate : sd.AssertDelegate<number>,
    }>
) {
    const result = new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns([
                needle,
                set,
            ]),
            assertDelegate : dataType.bigint(),
        },
        new FunctionCall(
            "FIND_IN_SET",
            [
                RawExprUtil.queryTree(needle),
                RawExprUtil.queryTree(set),
            ]
        )
    );
    return result as any;
}