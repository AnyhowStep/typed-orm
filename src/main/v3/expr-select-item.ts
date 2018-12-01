import * as sd from "schema-decorator";
import {ColumnRef} from "./column-ref";

export interface AliasedExprData {
    readonly usedRef : ColumnRef;
    readonly assertDelegate : sd.AssertDelegate<any>;

    readonly tableAlias : string;
    readonly alias : string;
}

export interface IExprSelectItem<DataT extends AliasedExprData=AliasedExprData> {
    readonly usedRef : DataT["usedRef"];
    readonly assertDelegate : DataT["assertDelegate"];

    readonly tableAlias : DataT["tableAlias"];
    readonly alias : DataT["alias"];

    readonly unaliasedQuery : string;
}

export type IAnonymousTypedExprSelectItem<TypeT> = (
    IExprSelectItem<{
        usedRef : ColumnRef,
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
            ("usedRef" in raw) &&
            ("assertDelegate" in raw) &&
            ("tableAlias" in raw) &&
            ("alias" in raw) &&
            ("unaliasedQuery" in raw) &&
            (raw.usedRef instanceof Object) &&
            (typeof raw.assertDelegate == "function") &&
            (typeof raw.tableAlias == "string") &&
            (typeof raw.alias == "string") &&
            (typeof raw.unaliasedQuery == "string")
        );
    }
}