import * as sd from "schema-decorator";
import {IColumn, ColumnUtil} from "./column";
import {QueryTreeArray, Parentheses, QueryTree, QueryTreeUtil} from "./query-tree";
import {escapeId} from "sqlstring";
import {SEPARATOR} from "./constants";

export interface ExprSelectItemData {
    readonly usedColumns : IColumn[];
    readonly assertDelegate : sd.AssertDelegate<any>;

    readonly tableAlias : string;
    readonly alias : string;
}

//There doesn't seem to be a point in making a class for this...
export interface IExprSelectItem<DataT extends ExprSelectItemData=ExprSelectItemData> {
    readonly usedColumns : DataT["usedColumns"];
    readonly assertDelegate : DataT["assertDelegate"];

    readonly tableAlias : DataT["tableAlias"];
    readonly alias : DataT["alias"];

    readonly unaliasedQuery : QueryTree;
}


export type IAnonymousTypedExprSelectItem<TypeT> = (
    IExprSelectItem<{
        usedColumns : IColumn[],
        assertDelegate : sd.AssertDelegate<TypeT>,

        tableAlias : string,
        alias : string,
    }>
);

export namespace ExprSelectItemUtil {
    export function isExprSelectItem (raw : any) : raw is IExprSelectItem {
        return (
            raw != undefined &&
            (raw instanceof Object) &&
            ("usedColumns" in raw) &&
            ("assertDelegate" in raw) &&
            ("tableAlias" in raw) &&
            ("alias" in raw) &&
            ("unaliasedQuery" in raw) &&
            (ColumnUtil.Array.isColumnArray(raw.usedColumns)) &&
            (typeof raw.assertDelegate == "function") &&
            (typeof raw.tableAlias == "string") &&
            (typeof raw.alias == "string") &&
            (QueryTreeUtil.isQueryTree(raw.unaliasedQuery))
        );
    }
    export function queryTree (exprSelectItem : IExprSelectItem) : QueryTreeArray {
        return [
            Parentheses.Create(exprSelectItem.unaliasedQuery),
            "AS",
            escapeId(`${exprSelectItem.tableAlias}${SEPARATOR}${exprSelectItem.alias}`)
        ];
    }
}