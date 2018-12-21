import { ColumnMap } from "../column-map";
import { ColumnRef } from "../column-ref";
export interface AliasedTableData {
    readonly usedRef: ColumnRef;
    readonly alias: string;
    readonly name: string;
    readonly columns: ColumnMap;
}
export interface IAliasedTable<DataT extends AliasedTableData = AliasedTableData> {
    readonly usedRef: DataT["usedRef"];
    readonly alias: DataT["alias"];
    readonly name: DataT["name"];
    readonly columns: DataT["columns"];
    readonly __databaseName?: string | undefined;
}
export declare class AliasedTable<DataT extends AliasedTableData> implements IAliasedTable<DataT> {
    readonly usedRef: DataT["usedRef"];
    readonly alias: DataT["alias"];
    readonly name: DataT["name"];
    readonly columns: DataT["columns"];
    __databaseName?: string | undefined;
    constructor(data: DataT, __databaseName?: string | undefined);
    queryTree(): string;
}
export declare namespace AliasedTable {
    function queryTree({ alias, name, __databaseName }: IAliasedTable): string;
    function isAliasedTable(raw: any): raw is IAliasedTable;
}
//# sourceMappingURL=aliased-table.d.ts.map