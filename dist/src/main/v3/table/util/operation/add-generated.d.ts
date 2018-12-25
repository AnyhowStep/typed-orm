import { Table, ITable } from "../../table";
import { ColumnMap } from "../../../column-map";
export declare type GeneratedColumnMap<ColumnMapT extends ColumnMap, GeneratedT extends string[]> = ({
    [columnName in Exclude<keyof ColumnMapT, GeneratedT[number]>]: (ColumnMapT[columnName]);
});
export declare type GeneratedDelegate<TableT extends ITable> = ((columnMap: GeneratedColumnMap<TableT["columns"], TableT["generated"]>) => (GeneratedColumnMap<TableT["columns"], TableT["generated"]>[keyof GeneratedColumnMap<TableT["columns"], TableT["generated"]>][]));
export declare type AddGenerated<TableT extends ITable, DelegateT extends GeneratedDelegate<TableT>> = (Table<{
    readonly usedRef: TableT["usedRef"];
    readonly alias: TableT["alias"];
    readonly columns: TableT["columns"];
    readonly autoIncrement: TableT["autoIncrement"];
    readonly id: TableT["id"];
    readonly candidateKeys: TableT["candidateKeys"];
    readonly generated: (TableT["generated"][number] | ReturnType<DelegateT>[number]["name"])[];
    readonly isNullable: TableT["isNullable"];
    readonly hasExplicitDefaultValue: (TableT["hasExplicitDefaultValue"][number] | ReturnType<DelegateT>[number]["name"])[];
    readonly mutable: Exclude<TableT["mutable"][number], ReturnType<DelegateT>[number]["name"]>[];
    readonly parents: TableT["parents"];
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
export declare function addGenerated<TableT extends ITable, DelegateT extends GeneratedDelegate<TableT>>(table: TableT, delegate: DelegateT): (AddGenerated<TableT, DelegateT>);
//# sourceMappingURL=add-generated.d.ts.map