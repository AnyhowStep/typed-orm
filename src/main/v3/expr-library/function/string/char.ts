import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import {TranscodingName} from "../../constant";

//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_char
export function toChar<
    Arg0 extends RawExpr<number>,
    Args extends RawExpr<number>[],
>(
    arg0 : Arg0,
    ...args : Args
) : (
    Expr<{
        usedColumns : (
            RawExprUtil.UsedColumns<Arg0>[number] |
            RawExprUtil.Array.UsedColumns<Args>[number]
        )[],
        assertDelegate : sd.AssertDelegate<Buffer>,
    }> &
    {
        using : (transcodingName : TranscodingName) => (
            Expr<{
                usedColumns : (
                    RawExprUtil.UsedColumns<Arg0>[number] |
                    RawExprUtil.Array.UsedColumns<Args>[number]
                )[],
                assertDelegate : sd.AssertDelegate<string>,
            }>
        )
    }
) {
    const result = new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns([
                arg0,
                ...args,
            ]),
            assertDelegate : sd.buffer(),
        },
        new FunctionCall(
            "CHAR",
            [
                RawExprUtil.queryTree(arg0),
                ...args.map(RawExprUtil.queryTree)
            ]
        )
    );
    (result as any).using = (transcodingName : TranscodingName) => {
        //Defend ourself against invalid values during run-time.
        sd.enumeration(TranscodingName)("transcodingName", transcodingName);
        const arr = [arg0, ...args];
        return new Expr(
            {
                usedColumns : result.usedColumns,
                assertDelegate : sd.string(),
            },
            new FunctionCall(
                "CHAR",
                [
                    ...arr.map((arg, index) => {
                        if (index == arr.length-1) {
                            return [
                                RawExprUtil.queryTree(arg),
                                "USING",
                                transcodingName
                            ];
                        } else {
                            return RawExprUtil.queryTree(arg);
                        }
                    }),
                ]
            )
        );
    };
    return result as any;
}