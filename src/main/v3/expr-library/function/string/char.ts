import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import {Tuple} from "../../../tuple";
import {TranscodingName} from "../../constant";

//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_char
export function toChar<
    Arg0 extends RawExpr<number>,
    Args extends Tuple<RawExpr<number>>,
>(
    arg0 : Arg0,
    ...args : Args
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<Arg0> &
            RawExprUtil.IntersectUsedRefTuple<Args>
        ),
        assertDelegate : sd.AssertDelegate<Buffer>,
    }> &
    {
        using : (transcodingName : TranscodingName) => (
            Expr<{
                usedRef : (
                    RawExprUtil.UsedRef<Arg0> &
                    RawExprUtil.IntersectUsedRefTuple<Args>
                ),
                assertDelegate : sd.AssertDelegate<string>,
            }>
        )
    }
) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.intersectUsedRefTuple(
                arg0,
                ...(args as any)
            ),
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
                usedRef : result.usedRef,
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