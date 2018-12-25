import { Table, ITable } from "../../table";
import { IAnonymousTypedColumn } from "../../../column";
import { NonNullPrimitiveExpr } from "../../../primitive-expr";
import { AssertValidCandidateKeyDelegate } from "./add-candidate-key";
export declare type PrimaryKeyColumnMap<TableT extends ITable> = ({
    [columnName in {
        [columnName in keyof TableT["columns"]]: (TableT["columns"][columnName] extends IAnonymousTypedColumn<NonNullPrimitiveExpr> ? (columnName extends TableT["candidateKeys"][number][number] ? never : columnName) : never);
    }[keyof TableT["columns"]]]: (TableT["columns"][columnName]);
});
export declare type PrimaryKeyDelegate<TableT extends ITable> = ((columnMap: PrimaryKeyColumnMap<TableT>) => ((PrimaryKeyColumnMap<TableT>[keyof PrimaryKeyColumnMap<TableT>])[]));
export declare type SetPrimaryKey<TableT extends ITable, DelegateT extends PrimaryKeyDelegate<TableT>> = (Table<{
    readonly usedRef: TableT["usedRef"];
    readonly alias: TableT["alias"];
    readonly columns: TableT["columns"];
    readonly autoIncrement: TableT["autoIncrement"];
    readonly id: TableT["id"];
    readonly primaryKey: ((ReturnType<DelegateT>[number]["name"][]));
    readonly candidateKeys: (TableT["candidateKeys"][number] | (ReturnType<DelegateT>[number]["name"][]))[];
    readonly generated: TableT["generated"];
    readonly isNullable: TableT["isNullable"];
    readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
    readonly mutable: TableT["mutable"];
    readonly parents: TableT["parents"];
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
export declare function setPrimaryKey<TableT extends ITable, DelegateT extends PrimaryKeyDelegate<TableT>>(table: TableT, delegate: AssertValidCandidateKeyDelegate<TableT, DelegateT>): (SetPrimaryKey<TableT, DelegateT>);
//# sourceMappingURL=set-primary-key.d.ts.map