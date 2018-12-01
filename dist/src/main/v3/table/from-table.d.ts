import { ITable, Table } from "./table";
export declare function tableFromTable<TableT extends ITable>(table: TableT): (Table<{
    readonly alias: TableT["alias"];
    readonly name: TableT["name"];
    readonly columns: TableT["columns"];
    readonly autoIncrement: TableT["autoIncrement"];
    readonly generated: TableT["generated"];
    readonly hasDefaultValue: TableT["hasDefaultValue"];
    readonly mutable: TableT["mutable"];
    readonly id: TableT["id"];
    readonly candidateKeys: TableT["candidateKeys"];
    readonly parents: TableT["parents"];
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
//# sourceMappingURL=from-table.d.ts.map