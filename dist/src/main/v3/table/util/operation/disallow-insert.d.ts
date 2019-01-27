import { Table, ITable } from "../../table";
export declare type DisallowInsert<TableT extends ITable> = (Table<{
    readonly usedColumns: TableT["usedColumns"];
    readonly alias: TableT["alias"];
    readonly columns: TableT["columns"];
    readonly autoIncrement: TableT["autoIncrement"];
    readonly id: TableT["id"];
    readonly primaryKey: TableT["primaryKey"];
    readonly candidateKeys: TableT["candidateKeys"];
    readonly generated: TableT["generated"];
    readonly isNullable: TableT["isNullable"];
    readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
    readonly mutable: TableT["mutable"];
    readonly parents: TableT["parents"];
    readonly insertAllowed: false;
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
export declare function disallowInsert<TableT extends ITable>(table: TableT): (DisallowInsert<TableT>);
