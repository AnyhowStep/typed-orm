import { ColumnMap } from "../column-map";
export interface AliasedTableData {
    readonly alias: string;
    readonly name: string;
    readonly columns: ColumnMap;
}
export interface IAliasedTable<DataT extends AliasedTableData = AliasedTableData> {
    readonly alias: DataT["alias"];
    readonly name: DataT["name"];
    readonly columns: DataT["columns"];
    readonly __databaseName?: string | undefined;
}
export declare class AliasedTable<DataT extends AliasedTableData> implements IAliasedTable<DataT> {
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