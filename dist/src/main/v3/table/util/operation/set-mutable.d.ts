import { Table, ITable } from "../../table";
import { ColumnMap } from "../../../column-map";
export declare type MutableColumnMap<ColumnMapT extends ColumnMap, GeneratedT extends string[]> = ({
    [columnName in Exclude<keyof ColumnMapT, GeneratedT[number]>]: (ColumnMapT[columnName]);
});
export declare type MutableDelegate<TableT extends ITable> = ((columnMap: MutableColumnMap<TableT["columns"], TableT["generated"]>) => (MutableColumnMap<TableT["columns"], TableT["generated"]>[keyof MutableColumnMap<TableT["columns"], TableT["generated"]>][]));
export declare type SetMutable<TableT extends ITable, DelegateT extends MutableDelegate<TableT>> = (Table<{
    readonly usedRef: TableT["usedRef"];
    readonly alias: TableT["alias"];
    readonly columns: TableT["columns"];
    readonly autoIncrement: TableT["autoIncrement"];
    readonly id: TableT["id"];
    readonly primaryKey: TableT["primaryKey"];
    readonly candidateKeys: TableT["candidateKeys"];
    readonly generated: TableT["generated"];
    readonly isNullable: TableT["isNullable"];
    readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
    readonly mutable: ReturnType<DelegateT>[number]["name"][];
    readonly parents: TableT["parents"];
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
export declare function setMutable<TableT extends ITable, DelegateT extends MutableDelegate<TableT>>(table: TableT, delegate: DelegateT): (SetMutable<TableT, DelegateT>);
//# sourceMappingURL=set-mutable.d.ts.map