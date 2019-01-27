import {Expr, IExpr} from "../../expr";
import {IExprSelectItem} from "../../../expr-select-item";
import {ALIASED} from "../../../constants";

export type As<ExprT extends IExpr, AliasT extends string> = (
    Expr<{
        readonly usedColumns : ExprT["usedColumns"];
        readonly assertDelegate : ExprT["assertDelegate"];
    }> &
    IExprSelectItem<{
        readonly usedColumns : ExprT["usedColumns"];
        readonly assertDelegate : ExprT["assertDelegate"];

        //TODO-DEBATE Consider allowing tableAlias to change?
        //There doesn't seem to be any harm in it.
        readonly tableAlias : typeof ALIASED;
        readonly alias : AliasT;
    }>
);
export function as<ExprT extends IExpr, AliasT extends string> (
    expr : ExprT,
    alias : AliasT
) : As<ExprT, AliasT> {
    const result = new Expr(
        expr,
        expr.queryTree
    );
    (result as any).tableAlias = ALIASED;
    (result as any).alias = alias;
    (result as any).unaliasedQuery = expr.queryTree;
    return result as any;
}