import { Table, ITable } from "../../table";
import { CandidateKeyArrayUtil } from "../../../candidate-key-array";
export declare type CandidateKeyDelegate<TableT extends ITable> = ((columnMap: TableT["columns"]) => (TableT["columns"][string][]));
export declare type AssertValidCandidateKeyDelegate<TableT extends ITable, DelegateT extends CandidateKeyDelegate<TableT>> = (DelegateT & (CandidateKeyArrayUtil.FindSubKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]> extends never ? (CandidateKeyArrayUtil.FindSuperKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]> extends never ? unknown : ["Cannot add key as candidate key", ReturnType<DelegateT>[number]["name"], "is a sub key of", CandidateKeyArrayUtil.FindSuperKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]>]) : ["Cannot add key as candidate key", ReturnType<DelegateT>[number]["name"], "is a super key of", CandidateKeyArrayUtil.FindSubKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]>]));
export declare type AddCandidateKey<TableT extends ITable, DelegateT extends CandidateKeyDelegate<TableT>> = (Table<{
    readonly usedRef: TableT["usedRef"];
    readonly alias: TableT["alias"];
    readonly columns: TableT["columns"];
    readonly autoIncrement: TableT["autoIncrement"];
    readonly id: TableT["id"];
    readonly candidateKeys: (TableT["candidateKeys"][number] | (ReturnType<DelegateT>[number]["name"][]))[];
    readonly generated: TableT["generated"];
    readonly isNullable: TableT["isNullable"];
    readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
    readonly mutable: TableT["mutable"];
    readonly parents: TableT["parents"];
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
export declare function addCandidateKey<TableT extends ITable, DelegateT extends CandidateKeyDelegate<TableT>>(table: TableT, delegate: AssertValidCandidateKeyDelegate<TableT, DelegateT>): (AddCandidateKey<TableT, DelegateT>);
//# sourceMappingURL=add-candidate-key.d.ts.map