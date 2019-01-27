import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html#function_rand
//0 <= v < 1.0
export function rand () : (
    Expr<{
        usedColumns : never[],
        assertDelegate : sd.AssertDelegate<number>,
    }>
);
export function rand<RawExprT extends RawExpr<bigint>>(
    seed : RawExprT
) : (
    Expr<{
        usedColumns : RawExprUtil.UsedColumns<RawExprT>,
        assertDelegate : sd.AssertDelegate<number>,
    }>
);
export function rand (seed? : RawExpr<bigint>) : any {
    if (seed === undefined) {
        return new Expr(
            {
                usedColumns : [],
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
                usedColumns : RawExprUtil.usedColumns(seed),
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