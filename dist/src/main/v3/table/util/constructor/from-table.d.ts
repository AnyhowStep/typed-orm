import { ITable, Table } from "../../table";
export declare type FromTable<TableT extends ITable> = (Table<{
    readonly usedRef: {};
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
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
export declare function fromTable<TableT extends ITable>(table: TableT): (FromTable<TableT>);
