import * as sd from "schema-decorator";
import { IColumn } from "./column";
import { QueryTreeArray, QueryTree } from "./query-tree";
export interface ExprSelectItemData {
    readonly usedColumns: IColumn[];
    readonly assertDelegate: sd.AssertDelegate<any>;
    readonly tableAlias: string;
    readonly alias: string;
}
export interface IExprSelectItem<DataT extends ExprSelectItemData = ExprSelectItemData> {
    readonly usedColumns: DataT["usedColumns"];
    readonly assertDelegate: DataT["assertDelegate"];
    readonly tableAlias: DataT["tableAlias"];
    readonly alias: DataT["alias"];
    readonly unaliasedQuery: QueryTree;
}
export declare type IAnonymousTypedExprSelectItem<TypeT> = (IExprSelectItem<{
    usedColumns: IColumn[];
    assertDelegate: sd.AssertDelegate<TypeT>;
    tableAlias: string;
    alias: string;
}>);
export declare namespace ExprSelectItemUtil {
    function isExprSelectItem(raw: any): raw is IExprSelectItem;
    function queryTree(exprSelectItem: IExprSelectItem): QueryTreeArray;
}
