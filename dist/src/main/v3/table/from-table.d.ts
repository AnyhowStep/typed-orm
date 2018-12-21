import { ITable, Table } from "./table";
export declare function tableFromTable<TableT extends ITable>(table: TableT): (Table<{
    readonly usedRef: {};
    readonly alias: TableT["alias"];
    readonly columns: TableT["columns"];
    readonly autoIncrement: TableT["autoIncrement"];
    readonly generated: TableT["generated"];
    readonly isNullable: TableT["isNullable"];
    readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
    readonly mutable: TableT["mutable"];
    readonly id: TableT["id"];
    readonly candidateKeys: TableT["candidateKeys"];
    readonly parents: TableT["parents"];
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
//# sourceMappingURL=from-table.d.ts.map