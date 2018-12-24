import { Expr, IExpr } from "../../expr";
import { IExprSelectItem } from "../../../expr-select-item";
import { ALIASED } from "../../../constants";
export declare type As<ExprT extends IExpr, AliasT extends string> = (Expr<{
    readonly usedRef: ExprT["usedRef"];
    readonly assertDelegate: ExprT["assertDelegate"];
}> & IExprSelectItem<{
    readonly usedRef: ExprT["usedRef"];
    readonly assertDelegate: ExprT["assertDelegate"];
    readonly tableAlias: typeof ALIASED;
    readonly alias: AliasT;
}>);
export declare function as<ExprT extends IExpr, AliasT extends string>(expr: ExprT, alias: AliasT): As<ExprT, AliasT>;
//# sourceMappingURL=as.d.ts.map