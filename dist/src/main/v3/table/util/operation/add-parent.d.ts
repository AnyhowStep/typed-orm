import { Table, ITable } from "../../table";
import { ToUnknownIfAllFieldsNever } from "../../../type";
import { CandidateKeyArrayUtil } from "../../../candidate-key-array";
export declare type Parent<TableT extends ITable, ParentT extends ITable> = (ParentT & (CandidateKeyArrayUtil.CommonCandidateKeyUnion<TableT["candidateKeys"], ParentT["candidateKeys"]> extends never ? ["No common candidate keys found between table and parent", "Candidate keys: ", TableT["candidateKeys"][number], "Parent candidate keys: ", ParentT["candidateKeys"][number]] | void : unknown) & (ToUnknownIfAllFieldsNever<{
    [columnName in Extract<keyof TableT["columns"], keyof ParentT["columns"]>]: (ReturnType<TableT["columns"][columnName]["assertDelegate"]> extends ReturnType<ParentT["columns"][columnName]["assertDelegate"]> ? never : ["Column", columnName, "has incompatible types", ReturnType<TableT["columns"][columnName]["assertDelegate"]>, ReturnType<ParentT["columns"][columnName]["assertDelegate"]>] | void);
}>) & (ParentT["alias"] extends TableT["alias"] ? "Parent cannot have same alias as table" | void : unknown) & (ParentT["alias"] extends TableT["parents"][number]["alias"] ? "Parent already added to table" | void : unknown));
export declare type AddParent<TableT extends ITable, ParentT extends ITable> = (Table<{
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
    readonly mutable: TableT["hasExplicitDefaultValue"];
    readonly parents: (TableT["parents"][number] | ParentT["parents"][number] | ParentT)[];
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
export declare function addParent<TableT extends ITable, ParentT extends ITable>(table: TableT, parent: Parent<TableT, ParentT>): (AddParent<TableT, ParentT>);
//# sourceMappingURL=add-parent.d.ts.map