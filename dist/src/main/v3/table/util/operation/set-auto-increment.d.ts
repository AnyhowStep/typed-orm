import { Table, ITable } from "../../table";
import { IAnonymousTypedColumn } from "../../../column";
export declare type AutoIncrementColumnMap<TableT extends ITable> = ({
    [columnName in {
        [columnName in keyof TableT["columns"]]: (TableT["columns"][columnName] extends IAnonymousTypedColumn<number | string | bigint> ? (columnName extends TableT["candidateKeys"][number][number] ? never : columnName) : never);
    }[keyof TableT["columns"]]]: (TableT["columns"][columnName]);
});
export declare type AutoIncrementDelegate<TableT extends ITable> = ((columnMap: AutoIncrementColumnMap<TableT>) => (AutoIncrementColumnMap<TableT>[keyof AutoIncrementColumnMap<TableT>]));
export declare type SetAutoIncrement<TableT extends ITable, DelegateT extends AutoIncrementDelegate<TableT>> = (Table<{
    readonly usedRef: TableT["usedRef"];
    readonly alias: TableT["alias"];
    readonly columns: TableT["columns"];
    readonly autoIncrement: ReturnType<DelegateT>["name"];
    readonly id: ReturnType<DelegateT>["name"];
    readonly candidateKeys: (TableT["candidateKeys"][number] | (ReturnType<DelegateT>["name"][]))[];
    readonly generated: (TableT["generated"][number] | ReturnType<DelegateT>["name"])[];
    readonly isNullable: TableT["isNullable"];
    readonly hasExplicitDefaultValue: (TableT["hasExplicitDefaultValue"][number] | ReturnType<DelegateT>["name"])[];
    readonly mutable: Exclude<TableT["mutable"][number], ReturnType<DelegateT>["name"]>[];
    readonly parents: TableT["parents"];
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
export declare function setAutoIncrement<TableT extends ITable, DelegateT extends AutoIncrementDelegate<TableT>>(table: TableT, delegate: DelegateT): (SetAutoIncrement<TableT, DelegateT>);
//# sourceMappingURL=set-auto-increment.d.ts.map