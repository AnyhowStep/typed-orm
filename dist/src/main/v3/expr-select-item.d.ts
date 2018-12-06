import * as sd from "schema-decorator";
import { ColumnRef } from "./column-ref";
import { QueryTreeArray, QueryTree } from "./query-tree";
export interface AliasedExprData {
    readonly usedRef: ColumnRef;
    readonly assertDelegate: sd.AssertDelegate<any>;
    readonly tableAlias: string;
    readonly alias: string;
}
export interface IExprSelectItem<DataT extends AliasedExprData = AliasedExprData> {
    readonly usedRef: DataT["usedRef"];
    readonly assertDelegate: DataT["assertDelegate"];
    readonly tableAlias: DataT["tableAlias"];
    readonly alias: DataT["alias"];
    readonly unaliasedQuery: QueryTree;
}
export declare type IAnonymousTypedExprSelectItem<TypeT> = (IExprSelectItem<{
    usedRef: ColumnRef;
    assertDelegate: sd.AssertDelegate<TypeT>;
    tableAlias: string;
    alias: string;
}>);
export declare namespace ExprSelectItemUtil {
    function isExprSelectItem(raw: any): raw is IExprSelectItem;
    function queryTree(exprSelectItem: IExprSelectItem): QueryTreeArray;
}
//# sourceMappingURL=expr-select-item.d.ts.map