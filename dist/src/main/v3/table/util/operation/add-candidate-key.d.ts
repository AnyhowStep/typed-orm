import { Table, ITable } from "../../table";
import { ColumnUtil } from "../../../column";
import { KeyUtil } from "../../../key";
export declare type CandidateKeyDelegate<TableT extends ITable> = ((columnMap: TableT["columns"]) => (TableT["columns"][string][]));
export declare type AssertValidCandidateKeyDelegate<TableT extends ITable, DelegateT extends CandidateKeyDelegate<TableT>> = (DelegateT & (KeyUtil.Array.FindSubKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]> extends never ? (KeyUtil.Array.FindSuperKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]> extends never ? unknown : ["Cannot add key as candidate key", ReturnType<DelegateT>[number]["name"], "is a sub key of", KeyUtil.Array.FindSuperKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]>]) : ["Cannot add key as candidate key", ReturnType<DelegateT>[number]["name"], "is a super key of", KeyUtil.Array.FindSubKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]>]));
export declare type AssertValidCandidateKeyDelegate_Hack<TableT extends ITable, DelegateT extends CandidateKeyDelegate<TableT>, ResultT> = (ReturnType<DelegateT>[number] extends ColumnUtil.FromColumnMap<TableT["columns"]> ? (KeyUtil.Array.FindSubKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]> extends never ? (KeyUtil.Array.FindSuperKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]> extends never ? ResultT : ["Cannot add key as candidate key", ReturnType<DelegateT>[number]["name"], "is a sub key of", KeyUtil.Array.FindSuperKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]>] | void) : ["Cannot add key as candidate key", ReturnType<DelegateT>[number]["name"], "is a super key of", KeyUtil.Array.FindSubKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]>] | void) : [Exclude<ReturnType<DelegateT>[number], ColumnUtil.FromColumnMap<TableT["columns"]>>, "is not a column of", TableT["alias"]] | void);
export declare type AddCandidateKey<TableT extends ITable, DelegateT extends CandidateKeyDelegate<TableT>> = (Table<{
    readonly usedRef: TableT["usedRef"];
    readonly alias: TableT["alias"];
    readonly columns: TableT["columns"];
    readonly autoIncrement: TableT["autoIncrement"];
    readonly id: TableT["id"];
    readonly primaryKey: TableT["primaryKey"];
    readonly candidateKeys: (TableT["candidateKeys"][number] | (ReturnType<DelegateT>[number]["name"][]))[];
    readonly generated: TableT["generated"];
    readonly isNullable: TableT["isNullable"];
    readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
    readonly mutable: TableT["mutable"];
    readonly parents: TableT["parents"];
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
export declare function addCandidateKey<TableT extends ITable, DelegateT extends CandidateKeyDelegate<TableT>>(table: TableT, delegate: AssertValidCandidateKeyDelegate<TableT, DelegateT>): (AssertValidCandidateKeyDelegate_Hack<TableT, DelegateT, AddCandidateKey<TableT, DelegateT>>);
//# sourceMappingURL=add-candidate-key.d.ts.map