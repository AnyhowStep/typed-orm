import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html#function_rand
//0 <= v < 1.0
export function rand () : (
    Expr<{
        usedRef : {},
        assertDelegate : sd.SafeMapper<number>,
    }>
);
export function rand<RawExprT extends RawExpr<bigint>>(
    seed : RawExprT
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        assertDelegate : sd.SafeMapper<number>,
    }>
);
export function rand (seed? : RawExpr<bigint>) {
    if (seed === undefined) {
        return new Expr(
            {
                usedRef : {},
                assertDelegate : dataType.double(),
            },
            new FunctionCall(
                "RAND",
                []
            )
        );
    } else {
        return new Expr(
            {
                usedRef : RawExprUtil.usedRef(seed),
                assertDelegate : dataType.double(),
            },
            new FunctionCall(
                "RAND",
                [
                    RawExprUtil.queryTree(seed)
                ]
            )
        );
    }
}