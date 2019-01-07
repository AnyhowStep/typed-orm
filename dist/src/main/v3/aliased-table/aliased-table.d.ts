import { ColumnMap } from "../column-map";
import { ColumnRef } from "../column-ref";
import { QueryTree } from "../query-tree";
export interface AliasedTableData {
    readonly usedRef: ColumnRef;
    readonly alias: string;
    readonly columns: ColumnMap;
}
export interface IAliasedTable<DataT extends AliasedTableData = AliasedTableData> {
    readonly usedRef: DataT["usedRef"];
    readonly alias: DataT["alias"];
    readonly columns: DataT["columns"];
    readonly unaliasedQuery: QueryTree;
}
export declare class AliasedTable<DataT extends AliasedTableData> implements IAliasedTable<DataT> {
    readonly usedRef: DataT["usedRef"];
    readonly alias: DataT["alias"];
    readonly columns: DataT["columns"];
    readonly unaliasedQuery: QueryTree;
    constructor(data: DataT, { unaliasedQuery, }: {
        unaliasedQuery: QueryTree;
    });
    queryTree(): QueryTree;
}
//# sourceMappingURL=aliased-table.d.ts.map