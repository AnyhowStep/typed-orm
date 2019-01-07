import { IExprSelectItem } from "../../../expr-select-item";
export declare type FromExprSelectItem<ExprSelectItemT extends IExprSelectItem> = (ExprSelectItemT extends IExprSelectItem ? {
    readonly tableAlias: ExprSelectItemT["tableAlias"];
    readonly name: ExprSelectItemT["alias"];
} : never);
export declare function fromExprSelectItem<ExprSelectItemT extends IExprSelectItem>(exprSelectItem: ExprSelectItemT): FromExprSelectItem<ExprSelectItemT>;
//# sourceMappingURL=from-expr-select-item.d.ts.map