import * as sd from "type-mapping";
import {ColumnRef, ColumnRefUtil} from "./column-ref";
import {QueryTreeArray, Parentheses, QueryTree, QueryTreeUtil} from "./query-tree";
import {escapeId} from "sqlstring";
import {SEPARATOR} from "./constants";

export interface ExprSelectItemData {
    readonly usedRef : ColumnRef;
    readonly assertDelegate : sd.SafeMapper<any>;

    readonly tableAlias : string;
    readonly alias : string;
}

//There doesn't seem to be a point in making a class for this...
export interface IExprSelectItem<DataT extends ExprSelectItemData=ExprSelectItemData> {
    readonly usedRef : DataT["usedRef"];
    readonly assertDelegate : DataT["assertDelegate"];

    readonly tableAlias : DataT["tableAlias"];
    readonly alias : DataT["alias"];

    readonly unaliasedQuery : QueryTree;
}

export type IAnonymousTypedExprSelectItem<TypeT> = (
    IExprSelectItem<{
        usedRef : ColumnRef,
        assertDelegate : sd.SafeMapper<TypeT>,

        tableAlias : string,
        alias : string,
    }>
);

export namespace ExprSelectItemUtil {
    export function isExprSelectItem (raw : any) : raw is IExprSelectItem {
        return (
            raw != undefined &&
            (raw instanceof Object) &&
            ("usedRef" in raw) &&
            ("assertDelegate" in raw) &&
            ("tableAlias" in raw) &&
            ("alias" in raw) &&
            ("unaliasedQuery" in raw) &&
            (ColumnRefUtil.isColumnRef(raw.usedRef)) &&
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