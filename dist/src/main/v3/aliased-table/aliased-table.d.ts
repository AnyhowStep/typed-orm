import { IColumn } from "../column";
import { ColumnMap } from "../column-map";
import { QueryTree } from "../query-tree";
export interface AliasedTableData {
    readonly usedColumns: IColumn[];
    readonly alias: string;
    readonly columns: ColumnMap;
}
export interface IAliasedTable<DataT extends AliasedTableData = AliasedTableData> {
    readonly usedColumns: DataT["usedColumns"];
    readonly alias: DataT["alias"];
    readonly columns: DataT["columns"];
    readonly unaliasedQuery: QueryTree;
}
export declare class AliasedTable<DataT extends AliasedTableData> implements IAliasedTable<DataT> {
    readonly usedColumns: DataT["usedColumns"];
    readonly alias: DataT["alias"];
    readonly columns: DataT["columns"];
    readonly unaliasedQuery: QueryTree;
    constructor(data: DataT, { unaliasedQuery, }: {
        unaliasedQuery: QueryTree;
    });
    queryTree(): QueryTree;
}
