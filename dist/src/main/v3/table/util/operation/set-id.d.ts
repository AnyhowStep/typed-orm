import { Table, ITable } from "../../table";
export declare type IdColumnMap<TableT extends ITable> = ({
    [columnName in {
        [columnName in keyof TableT["columns"]]: ((columnName extends TableT["candidateKeys"][number][number] ? never : columnName));
    }[keyof TableT["columns"]]]: (TableT["columns"][columnName]);
});
export declare type IdDelegate<TableT extends ITable> = ((columnMap: IdColumnMap<TableT>) => (IdColumnMap<TableT>[keyof IdColumnMap<TableT>]));
export declare type SetId<TableT extends ITable, DelegateT extends IdDelegate<TableT>> = (Table<{
    readonly usedRef: TableT["usedRef"];
    readonly alias: TableT["alias"];
    readonly columns: TableT["columns"];
    readonly autoIncrement: TableT["autoIncrement"];
    readonly id: ReturnType<DelegateT>["name"];
    readonly candidateKeys: (TableT["candidateKeys"][number] | (ReturnType<DelegateT>["name"][]))[];
    readonly generated: TableT["generated"];
    readonly isNullable: TableT["isNullable"];
    readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
    readonly mutable: TableT["mutable"];
    readonly parents: TableT["parents"];
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
export declare function setId<TableT extends ITable, DelegateT extends IdDelegate<TableT>>(table: TableT, delegate: DelegateT): (SetId<TableT, DelegateT>);
//# sourceMappingURL=set-id.d.ts.map