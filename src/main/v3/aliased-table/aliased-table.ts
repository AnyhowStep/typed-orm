import {ColumnMap, ColumnMapUtil} from "../column-map";
import {escapeId} from "sqlstring";
import {ColumnRefUtil, ColumnRef} from "../column-ref";
import {QueryTree, QueryTreeUtil} from "../query-tree";

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
        return AliasedTable.queryTree(this);
    }
}
export namespace AliasedTable {
    /*
        `name`
        `name` AS `alias`
        (SELECT x) AS `alias`
    */
    export function queryTree (
        {
            alias,
            unaliasedQuery,
        } : IAliasedTable
    ) : QueryTree {
        const escapedAlias = escapeId(alias);

        if (unaliasedQuery === escapedAlias) {
            return unaliasedQuery;
        }

        return [
            unaliasedQuery,
            "AS",
            escapeId(alias),
        ];
    }
    export function isAliasedTable (raw : any) : raw is IAliasedTable {
        return (
            raw != undefined &&
            (raw instanceof Object) &&
            ("usedRef" in raw) &&
            ("alias" in raw) &&
            ("columns" in raw) &&
            ("unaliasedQuery" in raw) &&

            ColumnRefUtil.isColumnRef(raw.usedRef) &&
            (typeof raw.alias == "string") &&
            ColumnMapUtil.isColumnMap(raw.columns) &&
            QueryTreeUtil.isQueryTree(raw.unaliasedQuery)
        );
    }
}