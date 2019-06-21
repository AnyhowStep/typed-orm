import {Expr, IExpr} from "../../expr";
//import {IExprSelectItem} from "../../../expr-select-item";
import {ALIASED} from "../../../constants";
import { QueryTree } from "../../../query-tree";
import { SortDirection } from "../../../order";
import { Asc, Desc, Sort } from "./sort";

//Used as a hack, attempting to not hit the max instantiation depth problem
export interface ExprLite<ExprT extends IExpr> {
    readonly queryTree : QueryTree;

    asc () : Asc<ExprT>;
    desc () : Desc<ExprT>;
    sort (sortDirection : SortDirection) : Sort<ExprT>;
}
//Originally mean to be `Expr<> & IExprSelectItem<>`
export type As<ExprT extends IExpr, AliasT extends string> = (
    //This particular method has always given me problems
    //Always reaching the max instantiation depth.
    //https://github.com/microsoft/TypeScript/issues/29511
    //It seems like using `DataT & {queryTree : QueryTree}`
    //is better than using `this`.
    //I don't understand typescript
    //However, with enough calls to `as`, you still run into the max instantiation depth.
    //Better to just keep using `ExprUtil.as()` for now

    //Commenting this part of the type out because it seems to cause the max instantiation depth problem
    //however, in a perfect world, I would get to keep this
    /*Expr<{
        readonly usedRef : ExprT["usedRef"];
        readonly assertDelegate : ExprT["assertDelegate"];
    }> &*/
    //ExprLite<ExprT> &
    {
        //This is ExprLite<ExprT>
        readonly queryTree : QueryTree;

        asc () : Asc<ExprT>;
        desc () : Desc<ExprT>;
        sort (sortDirection : SortDirection) : Sort<ExprT>;

        //This is the same type as the commented IExpreSelectItem<> type...
        //However, when expressed this way, TS doesn't consume extra instantiation depth
        readonly usedRef: ExprT["usedRef"];
        readonly assertDelegate: ExprT["assertDelegate"];
        readonly tableAlias: typeof ALIASED;
        readonly alias: AliasT;
        readonly unaliasedQuery: QueryTree;
    }
    /*
    IExprSelectItem<{
        readonly usedRef : ExprT["usedRef"];
        readonly assertDelegate : ExprT["assertDelegate"];

        //TODO-DEBATE Consider allowing tableAlias to change?
        //There doesn't seem to be any harm in it.
        readonly tableAlias : typeof ALIASED;
        readonly alias : AliasT;
    }>
    */
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