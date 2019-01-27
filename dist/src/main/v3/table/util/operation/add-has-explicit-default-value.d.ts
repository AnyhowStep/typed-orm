import { Table, ITable } from "../../table";
import { ColumnMap } from "../../../column-map";
export declare type HasExplicitDefaultValueColumnMap<ColumnMapT extends ColumnMap, HasExplicitDefaultValueT extends string[]> = ({
    [columnName in Exclude<keyof ColumnMapT, HasExplicitDefaultValueT[number]>]: (ColumnMapT[columnName]);
});
export declare type HasExplicitDefaultValueDelegate<TableT extends ITable> = ((columnMap: HasExplicitDefaultValueColumnMap<TableT["columns"], TableT["hasExplicitDefaultValue"]>) => (HasExplicitDefaultValueColumnMap<TableT["columns"], TableT["hasExplicitDefaultValue"]>[keyof HasExplicitDefaultValueColumnMap<TableT["columns"], TableT["hasExplicitDefaultValue"]>][]));
export declare type AddHasExplicitDefaultValue<TableT extends ITable, DelegateT extends HasExplicitDefaultValueDelegate<TableT>> = (Table<{
    readonly usedColumns: TableT["usedColumns"];
    readonly alias: TableT["alias"];
    readonly columns: TableT["columns"];
    readonly autoIncrement: TableT["autoIncrement"];
    readonly id: TableT["id"];
    readonly primaryKey: TableT["primaryKey"];
    readonly candidateKeys: TableT["candidateKeys"];
    readonly generated: TableT["generated"];
    readonly isNullable: TableT["isNullable"];
    readonly hasExplicitDefaultValue: (TableT["hasExplicitDefaultValue"][number] | ReturnType<DelegateT>[number]["name"])[];
    readonly mutable: TableT["mutable"];
    readonly parents: TableT["parents"];
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
export declare function addHasExplicitDefaultValue<TableT extends ITable, DelegateT extends HasExplicitDefaultValueDelegate<TableT>>(table: TableT, delegate: DelegateT): (AddHasExplicitDefaultValue<TableT, DelegateT>);
