import {ColumnMap} from "../column-map";
import {ColumnRef} from "../column-ref";
import {QueryTree} from "../query-tree";
import * as AliasedTableUtil from "./util";

export interface AliasedTableData {
    readonly usedRef : ColumnRef;
    readonly alias : string;
    readonly columns : ColumnMap;
}

export interface IAliasedTable<DataT extends AliasedTableData=AliasedTableData> {
    readonly usedRef : DataT["usedRef"];
    readonly alias : DataT["alias"];
    readonly columns : DataT["columns"];

    //Called `unaliasedQuery` to be consistent with IExprSelectItem
    //TODO-DEBATE, change both to unaliasedQueryTree?
    readonly unaliasedQuery : QueryTree;
}

export class AliasedTable<DataT extends AliasedTableData> implements IAliasedTable<DataT> {
    readonly usedRef : DataT["usedRef"];
    readonly alias : DataT["alias"];
    readonly columns : DataT["columns"];

    readonly unaliasedQuery : QueryTree;

    constructor (
        data : DataT,
        {
            unaliasedQuery,
        } :
        {
            unaliasedQuery : QueryTree,
        }
    ) {
        this.usedRef = data.usedRef;
        this.alias = data.alias;
        this.columns = data.columns;

        this.unaliasedQuery = unaliasedQuery;
    }

    queryTree () {
        return AliasedTableUtil.queryTree(this);
    }
}