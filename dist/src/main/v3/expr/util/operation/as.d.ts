import { IExpr } from "../../expr";
import { ALIASED } from "../../../constants";
import { QueryTree } from "../../../query-tree";
import { SortDirection } from "../../../order";
import { Asc, Desc, Sort } from "./sort";
export interface ExprLite<ExprT extends IExpr> {
    readonly queryTree: QueryTree;
    asc(): Asc<ExprT>;
    desc(): Desc<ExprT>;
    sort(sortDirection: SortDirection): Sort<ExprT>;
}
export declare type As<ExprT extends IExpr, AliasT extends string> = ({
    readonly queryTree: QueryTree;
    asc(): Asc<ExprT>;
    desc(): Desc<ExprT>;
    sort(sortDirection: SortDirection): Sort<ExprT>;
    readonly usedRef: ExprT["usedRef"];
    readonly assertDelegate: ExprT["assertDelegate"];
    readonly tableAlias: typeof ALIASED;
    readonly alias: AliasT;
    readonly unaliasedQuery: QueryTree;
});
export declare function as<ExprT extends IExpr, AliasT extends string>(expr: ExprT, alias: AliasT): As<ExprT, AliasT>;
