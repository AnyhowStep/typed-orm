import * as sd from "type-mapping";
import { ColumnRef } from "./column-ref";
import { QueryTreeArray, QueryTree } from "./query-tree";
export interface ExprSelectItemData {
    readonly usedRef: ColumnRef;
    readonly assertDelegate: sd.SafeMapper<any>;
    readonly tableAlias: string;
    readonly alias: string;
}
export interface IExprSelectItem<DataT extends ExprSelectItemData = ExprSelectItemData> {
    readonly usedRef: DataT["usedRef"];
    readonly assertDelegate: DataT["assertDelegate"];
    readonly tableAlias: DataT["tableAlias"];
    readonly alias: DataT["alias"];
    readonly unaliasedQuery: QueryTree;
}
export declare type IAnonymousTypedExprSelectItem<TypeT> = (IExprSelectItem<{
    usedRef: ColumnRef;
    assertDelegate: sd.SafeMapper<TypeT>;
    tableAlias: string;
    alias: string;
}>);
export declare namespace ExprSelectItemUtil {
    function isExprSelectItem(raw: any): raw is IExprSelectItem;
    function queryTree(exprSelectItem: IExprSelectItem): QueryTreeArray;
}
