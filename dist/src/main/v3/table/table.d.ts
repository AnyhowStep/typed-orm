import * as sd from "schema-decorator";
import { IAnonymousTypedColumn } from "../column";
import { CandidateKey } from "../candidate-key";
import { AliasedTableData, AliasedTable, IAliasedTable } from "../aliased-table";
import { ColumnMapUtil } from "../column-map";
import { ColumnMap } from "../column-map";
import { CandidateKeyArrayUtil } from "../candidate-key-array";
import { ToUnknownIfAllFieldsNever } from "../type";
import { AssertMap } from "../assert-map";
import { ColumnUtil } from "../column";
import { TypeMapUtil } from "../type-map";
import { QueryTree } from "../query-tree";
export interface TableData extends AliasedTableData {
    readonly autoIncrement: undefined | string;
    readonly id: undefined | string;
    readonly candidateKeys: CandidateKey[];
    readonly generated: string[];
    readonly isNullable: string[];
    readonly hasExplicitDefaultValue: string[];
    readonly mutable: string[];
    readonly parents: ITable[];
    readonly insertAllowed: boolean;
    readonly deleteAllowed: boolean;
}
export interface ITable<DataT extends TableData = TableData> extends IAliasedTable<DataT> {
    readonly usedRef: DataT["usedRef"];
    readonly alias: DataT["alias"];
    readonly columns: DataT["columns"];
    readonly unaliasedQuery: QueryTree;
    readonly autoIncrement: DataT["autoIncrement"];
    readonly id: DataT["id"];
    readonly candidateKeys: DataT["candidateKeys"];
    readonly generated: DataT["generated"];
    readonly isNullable: DataT["isNullable"];
    readonly hasExplicitDefaultValue: DataT["hasExplicitDefaultValue"];
    readonly mutable: DataT["mutable"];
    readonly parents: DataT["parents"];
    readonly insertAllowed: DataT["insertAllowed"];
    readonly deleteAllowed: DataT["deleteAllowed"];
}
export declare class Table<DataT extends TableData> implements ITable<DataT> {
    readonly usedRef: DataT["usedRef"];
    readonly alias: DataT["alias"];
    readonly columns: DataT["columns"];
    readonly unaliasedQuery: QueryTree;
    readonly autoIncrement: DataT["autoIncrement"];
    readonly id: DataT["id"];
    readonly candidateKeys: DataT["candidateKeys"];
    readonly generated: DataT["generated"];
    readonly isNullable: DataT["isNullable"];
    readonly hasExplicitDefaultValue: DataT["hasExplicitDefaultValue"];
    readonly mutable: DataT["mutable"];
    readonly parents: DataT["parents"];
    readonly insertAllowed: DataT["insertAllowed"];
    readonly deleteAllowed: DataT["deleteAllowed"];
    constructor(data: DataT, { unaliasedQuery, }: {
        unaliasedQuery: QueryTree;
    });
    as<NewAliasT extends string>(newAlias: NewAliasT): Table.As<this, NewAliasT>;
    private cachedCandidateKeyAssertDelegate;
    candidateKeyAssertDelegate(): Table.CandidateKeyAssertDelegate<this>;
    private cachedSuperKeyAssertDelegate;
    superKeyAssertDelegate(): Table.SuperKeyAssertDelegate<this>;
    setName<NewNameT extends string>(newName: NewNameT): Table.SetName<this, NewNameT>;
    addColumns<FieldsT extends sd.AnyField[]>(fields: FieldsT): (Table.AddColumnsFromFieldTuple<this, FieldsT>);
    addColumns<AssertMapT extends AssertMap>(assertMap: AssertMapT): (Table.AddColumnsFromAssertMap<this, AssertMapT>);
    setAutoIncrement<DelegateT extends Table.AutoIncrementDelegate<this>>(delegate: DelegateT): Table.SetAutoIncrement<this, DelegateT>;
    setId<DelegateT extends Table.IdDelegate<this>>(delegate: DelegateT): (Table.SetId<this, DelegateT>);
    addCandidateKey<DelegateT extends Table.CandidateKeyDelegate<this>>(delegate: Table.AssertValidCandidateKeyDelegate<this, DelegateT>): (Table.AddCandidateKey<this, DelegateT>);
    setGenerated<DelegateT extends Table.GeneratedDelegate<this>>(delegate: DelegateT): (Table.SetGenerated<this, DelegateT>);
    setHasExplicitDefaultValue<DelegateT extends Table.HasExplicitDefaultValueDelegate<this>>(delegate: DelegateT): (Table.SetHasExplicitDefaultValue<this, DelegateT>);
    setImmutable(): Table.SetImmutable<this>;
    overwriteMutable<DelegateT extends Table.MutableDelegate<this>>(delegate: DelegateT): (Table.OverwriteMutable<this, DelegateT>);
    addParent<ParentT extends ITable>(parent: Table.Parent<this, ParentT>): (Table.AddParent<this, ParentT>);
    disallowInsert(): Table.DisallowInsert<this>;
    disallowDelete(): Table.DisallowDelete<this>;
}
export declare namespace Table {
    type As<TableT extends ITable, NewAliasT extends string> = (AliasedTable<{
        readonly usedRef: TableT["usedRef"];
        readonly alias: NewAliasT;
        readonly columns: ColumnMapUtil.WithTableAlias<TableT["columns"], NewAliasT>;
    }>);
    function as<TableT extends ITable, NewAliasT extends string>({ usedRef, columns, unaliasedQuery, }: TableT, newAlias: NewAliasT): (As<TableT, NewAliasT>);
}
export declare namespace Table {
    type SetName<TableT extends ITable, NewNameT extends string> = (Table<{
        readonly usedRef: TableT["usedRef"];
        readonly alias: NewNameT;
        readonly columns: ColumnMapUtil.WithTableAlias<TableT["columns"], NewNameT>;
        readonly autoIncrement: TableT["autoIncrement"];
        readonly id: TableT["id"];
        readonly candidateKeys: TableT["candidateKeys"];
        readonly generated: TableT["generated"];
        readonly isNullable: TableT["isNullable"];
        readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
        readonly mutable: TableT["mutable"];
        readonly parents: TableT["parents"];
        readonly insertAllowed: TableT["insertAllowed"];
        readonly deleteAllowed: TableT["deleteAllowed"];
    }>);
    function setName<TableT extends ITable, NewNameT extends string>(table: TableT, newName: NewNameT): (SetName<TableT, NewNameT>);
}
export declare namespace Table {
    type AddColumnsFromFieldTuple<TableT extends ITable, FieldsT extends sd.AnyField[]> = (Table<{
        readonly usedRef: TableT["usedRef"];
        readonly alias: TableT["alias"];
        readonly columns: ColumnMapUtil.Intersect<TableT["columns"], ColumnMapUtil.FromFieldArray<TableT["alias"], FieldsT>>;
        readonly autoIncrement: TableT["autoIncrement"];
        readonly id: TableT["id"];
        readonly candidateKeys: TableT["candidateKeys"];
        readonly generated: TableT["generated"];
        readonly isNullable: ColumnUtil.Name.NullableFromColumnMap<ColumnMapUtil.Intersect<TableT["columns"], ColumnMapUtil.FromFieldArray<TableT["alias"], FieldsT>>>[];
        readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
        readonly mutable: TableT["mutable"];
        readonly parents: TableT["parents"];
        readonly insertAllowed: TableT["insertAllowed"];
        readonly deleteAllowed: TableT["deleteAllowed"];
    }>);
    function addColumnsFromFieldTuple<TableT extends ITable, FieldsT extends sd.AnyField[]>(table: TableT, fields: FieldsT): (AddColumnsFromFieldTuple<TableT, FieldsT>);
}
export declare namespace Table {
    type AddColumnsFromAssertMap<TableT extends ITable, AssertMapT extends AssertMap> = (Table<{
        readonly usedRef: TableT["usedRef"];
        readonly alias: TableT["alias"];
        readonly columns: ColumnMapUtil.Intersect<TableT["columns"], ColumnMapUtil.FromAssertMap<TableT["alias"], AssertMapT>>;
        readonly autoIncrement: TableT["autoIncrement"];
        readonly id: TableT["id"];
        readonly candidateKeys: TableT["candidateKeys"];
        readonly generated: TableT["generated"];
        readonly isNullable: ColumnUtil.Name.NullableFromColumnMap<ColumnMapUtil.Intersect<TableT["columns"], ColumnMapUtil.FromAssertMap<TableT["alias"], AssertMapT>>>[];
        readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
        readonly mutable: TableT["mutable"];
        readonly parents: TableT["parents"];
        readonly insertAllowed: TableT["insertAllowed"];
        readonly deleteAllowed: TableT["deleteAllowed"];
    }>);
    function addColumnsFromAssertMap<TableT extends ITable, AssertMapT extends AssertMap>(table: TableT, assertMap: AssertMapT): (AddColumnsFromAssertMap<TableT, AssertMapT>);
}
export declare namespace Table {
    function addColumns<TableT extends ITable, FieldsT extends sd.AnyField[]>(table: TableT, fields: FieldsT): (AddColumnsFromFieldTuple<TableT, FieldsT>);
    function addColumns<TableT extends ITable, AssertMapT extends AssertMap>(table: TableT, assertMap: AssertMapT): (AddColumnsFromAssertMap<TableT, AssertMapT>);
}
export declare namespace Table {
    type CandidateKey<TableT extends ITable> = (TypeMapUtil.UnionFromCandidateKeyArray<TableT["candidateKeys"], TableT["columns"]>);
    type CandidateKeyAssertDelegate<TableT extends ITable> = (TypeMapUtil.AssertDelegateFromCandidateKeyArray<TableT["candidateKeys"], TableT["columns"]>);
    function candidateKeyAssertDelegate<TableT extends ITable>(table: TableT): (CandidateKeyAssertDelegate<TableT>);
    type SuperKey<TableT extends ITable> = (TypeMapUtil.SuperKeyUnionFromCandidateKeyArray<TableT["candidateKeys"], TableT["columns"]>);
    type SuperKeyAssertDelegate<TableT extends ITable> = (TypeMapUtil.SuperKeyAssertDelegateFromCandidateKeyArray<TableT["candidateKeys"], TableT["columns"]>);
    function superKeyAssertDelegate<TableT extends ITable>(table: TableT): (SuperKeyAssertDelegate<TableT>);
}
export declare namespace Table {
    type AutoIncrementColumnMap<TableT extends ITable> = ({
        [columnName in {
            [columnName in keyof TableT["columns"]]: (TableT["columns"][columnName] extends IAnonymousTypedColumn<number | string | bigint> ? (columnName extends TableT["candidateKeys"][number][number] ? never : columnName) : never);
        }[keyof TableT["columns"]]]: (TableT["columns"][columnName]);
    });
    type AutoIncrementDelegate<TableT extends ITable> = ((columnMap: AutoIncrementColumnMap<TableT>) => (AutoIncrementColumnMap<TableT>[keyof AutoIncrementColumnMap<TableT>]));
    type SetAutoIncrement<TableT extends ITable, DelegateT extends AutoIncrementDelegate<TableT>> = (Table<{
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
    function setAutoIncrement<TableT extends ITable, DelegateT extends AutoIncrementDelegate<TableT>>(table: TableT, delegate: DelegateT): (SetAutoIncrement<TableT, DelegateT>);
}
export declare namespace Table {
    type IdColumnMap<TableT extends ITable> = ({
        [columnName in {
            [columnName in keyof TableT["columns"]]: ((columnName extends TableT["candidateKeys"][number][number] ? never : columnName));
        }[keyof TableT["columns"]]]: (TableT["columns"][columnName]);
    });
    type IdDelegate<TableT extends ITable> = ((columnMap: IdColumnMap<TableT>) => (IdColumnMap<TableT>[keyof IdColumnMap<TableT>]));
    type SetId<TableT extends ITable, DelegateT extends IdDelegate<TableT>> = (Table<{
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
    function setId<TableT extends ITable<TableData>, DelegateT extends IdDelegate<TableT>>(table: TableT, delegate: DelegateT): (SetId<TableT, DelegateT>);
}
export declare namespace Table {
    type CandidateKeyDelegate<TableT extends ITable> = ((columnMap: TableT["columns"]) => (TableT["columns"][string][]));
    type AssertValidCandidateKeyDelegate<TableT extends ITable, DelegateT extends CandidateKeyDelegate<TableT>> = (DelegateT & (CandidateKeyArrayUtil.FindSubKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]> extends never ? (CandidateKeyArrayUtil.FindSuperKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]> extends never ? unknown : ["Cannot add key as candidate key", ReturnType<DelegateT>[number]["name"], "is a sub key of", CandidateKeyArrayUtil.FindSuperKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]>]) : ["Cannot add key as candidate key", ReturnType<DelegateT>[number]["name"], "is a super key of", CandidateKeyArrayUtil.FindSubKey<TableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]>]));
    type AddCandidateKey<TableT extends ITable, DelegateT extends CandidateKeyDelegate<TableT>> = (Table<{
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
    function addCandidateKey<TableT extends ITable, DelegateT extends CandidateKeyDelegate<TableT>>(table: TableT, delegate: AssertValidCandidateKeyDelegate<TableT, DelegateT>): (AddCandidateKey<TableT, DelegateT>);
}
export declare namespace Table {
    type GeneratedColumnMap<ColumnMapT extends ColumnMap, GeneratedT extends string[]> = ({
        [columnName in Exclude<keyof ColumnMapT, GeneratedT[number]>]: (ColumnMapT[columnName]);
    });
    type GeneratedDelegate<TableT extends ITable> = ((columnMap: GeneratedColumnMap<TableT["columns"], TableT["generated"]>) => (GeneratedColumnMap<TableT["columns"], TableT["generated"]>[keyof GeneratedColumnMap<TableT["columns"], TableT["generated"]>][]));
    type SetGenerated<TableT extends ITable, DelegateT extends GeneratedDelegate<TableT>> = (Table<{
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
    function setGenerated<TableT extends ITable, DelegateT extends GeneratedDelegate<TableT>>(table: TableT, delegate: DelegateT): (SetGenerated<TableT, DelegateT>);
}
export declare namespace Table {
    type HasExplicitDefaultValueColumnMap<ColumnMapT extends ColumnMap, HasExplicitDefaultValueT extends string[]> = ({
        [columnName in Exclude<keyof ColumnMapT, HasExplicitDefaultValueT[number]>]: (ColumnMapT[columnName]);
    });
    type HasExplicitDefaultValueDelegate<TableT extends ITable> = ((columnMap: HasExplicitDefaultValueColumnMap<TableT["columns"], TableT["hasExplicitDefaultValue"]>) => (HasExplicitDefaultValueColumnMap<TableT["columns"], TableT["hasExplicitDefaultValue"]>[keyof HasExplicitDefaultValueColumnMap<TableT["columns"], TableT["hasExplicitDefaultValue"]>][]));
    type SetHasExplicitDefaultValue<TableT extends ITable, DelegateT extends HasExplicitDefaultValueDelegate<TableT>> = (Table<{
        readonly usedRef: TableT["usedRef"];
        readonly alias: TableT["alias"];
        readonly columns: TableT["columns"];
        readonly autoIncrement: TableT["autoIncrement"];
        readonly id: TableT["id"];
        readonly candidateKeys: TableT["candidateKeys"];
        readonly generated: TableT["generated"];
        readonly isNullable: TableT["isNullable"];
        readonly hasExplicitDefaultValue: (TableT["hasExplicitDefaultValue"][number] | ReturnType<DelegateT>[number]["name"])[];
        readonly mutable: TableT["mutable"];
        readonly parents: TableT["parents"];
        readonly insertAllowed: TableT["insertAllowed"];
        readonly deleteAllowed: TableT["deleteAllowed"];
    }>);
    function setHasExplicitDefaultValue<TableT extends ITable, DelegateT extends HasExplicitDefaultValueDelegate<TableT>>(table: TableT, delegate: DelegateT): (SetHasExplicitDefaultValue<TableT, DelegateT>);
}
export declare namespace Table {
    type SetImmutable<TableT extends ITable> = (Table<{
        readonly usedRef: TableT["usedRef"];
        readonly alias: TableT["alias"];
        readonly columns: TableT["columns"];
        readonly autoIncrement: TableT["autoIncrement"];
        readonly id: TableT["id"];
        readonly candidateKeys: TableT["candidateKeys"];
        readonly generated: TableT["generated"];
        readonly isNullable: TableT["isNullable"];
        readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
        readonly mutable: [];
        readonly parents: TableT["parents"];
        readonly insertAllowed: TableT["insertAllowed"];
        readonly deleteAllowed: TableT["deleteAllowed"];
    }>);
    function setImmutable<TableT extends ITable>(table: TableT): (SetImmutable<TableT>);
}
export declare namespace Table {
    type MutableColumnMap<ColumnMapT extends ColumnMap, GeneratedT extends string[]> = ({
        [columnName in Exclude<keyof ColumnMapT, GeneratedT[number]>]: (ColumnMapT[columnName]);
    });
    type MutableDelegate<TableT extends ITable> = ((columnMap: MutableColumnMap<TableT["columns"], TableT["generated"]>) => (MutableColumnMap<TableT["columns"], TableT["generated"]>[keyof MutableColumnMap<TableT["columns"], TableT["generated"]>][]));
    type OverwriteMutable<TableT extends ITable, DelegateT extends MutableDelegate<TableT>> = (Table<{
        readonly usedRef: TableT["usedRef"];
        readonly alias: TableT["alias"];
        readonly columns: TableT["columns"];
        readonly autoIncrement: TableT["autoIncrement"];
        readonly id: TableT["id"];
        readonly candidateKeys: TableT["candidateKeys"];
        readonly generated: TableT["generated"];
        readonly isNullable: TableT["isNullable"];
        readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
        readonly mutable: ReturnType<DelegateT>[number]["name"][];
        readonly parents: TableT["parents"];
        readonly insertAllowed: TableT["insertAllowed"];
        readonly deleteAllowed: TableT["deleteAllowed"];
    }>);
    function overwriteMutable<TableT extends ITable, DelegateT extends MutableDelegate<TableT>>(table: TableT, delegate: DelegateT): (OverwriteMutable<TableT, DelegateT>);
}
export declare namespace Table {
    type Parent<TableT extends ITable, ParentT extends ITable> = (ParentT & (CandidateKeyArrayUtil.CommonCandidateKeyUnion<TableT["candidateKeys"], ParentT["candidateKeys"]> extends never ? ["No common candidate keys found between table and parent", "Candidate keys: ", TableT["candidateKeys"][number], "Parent candidate keys: ", ParentT["candidateKeys"][number]] | void : unknown) & (ToUnknownIfAllFieldsNever<{
        [columnName in Extract<keyof TableT["columns"], keyof ParentT["columns"]>]: (ReturnType<TableT["columns"][columnName]["assertDelegate"]> extends ReturnType<ParentT["columns"][columnName]["assertDelegate"]> ? never : ["Column", columnName, "has incompatible types", ReturnType<TableT["columns"][columnName]["assertDelegate"]>, ReturnType<ParentT["columns"][columnName]["assertDelegate"]>] | void);
    }>) & (ParentT["alias"] extends TableT["alias"] ? "Parent cannot have same alias as table" | void : unknown) & (ParentT["alias"] extends TableT["parents"][number]["alias"] ? "Parent already added to table" | void : unknown));
    type AddParent<TableT extends ITable, ParentT extends ITable> = (Table<{
        readonly usedRef: TableT["usedRef"];
        readonly alias: TableT["alias"];
        readonly columns: TableT["columns"];
        readonly autoIncrement: TableT["autoIncrement"];
        readonly id: TableT["id"];
        readonly candidateKeys: TableT["candidateKeys"];
        readonly generated: TableT["generated"];
        readonly isNullable: TableT["isNullable"];
        readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
        readonly mutable: TableT["hasExplicitDefaultValue"];
        readonly parents: (TableT["parents"][number] | ParentT["parents"][number] | ParentT)[];
        readonly insertAllowed: TableT["insertAllowed"];
        readonly deleteAllowed: TableT["deleteAllowed"];
    }>);
    function addParent<TableT extends ITable, ParentT extends ITable>(table: TableT, parent: Parent<TableT, ParentT>): (AddParent<TableT, ParentT>);
}
export declare namespace Table {
    type DisallowInsert<TableT extends ITable> = (Table<{
        readonly usedRef: TableT["usedRef"];
        readonly alias: TableT["alias"];
        readonly columns: TableT["columns"];
        readonly autoIncrement: TableT["autoIncrement"];
        readonly id: TableT["id"];
        readonly candidateKeys: TableT["candidateKeys"];
        readonly generated: TableT["generated"];
        readonly isNullable: TableT["isNullable"];
        readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
        readonly mutable: TableT["mutable"];
        readonly parents: TableT["parents"];
        readonly insertAllowed: false;
        readonly deleteAllowed: TableT["deleteAllowed"];
    }>);
    function disallowInsert<TableT extends ITable>(table: TableT): (DisallowInsert<TableT>);
    type DisallowDelete<TableT extends ITable> = (Table<{
        readonly usedRef: TableT["usedRef"];
        readonly alias: TableT["alias"];
        readonly columns: TableT["columns"];
        readonly autoIncrement: TableT["autoIncrement"];
        readonly id: TableT["id"];
        readonly candidateKeys: TableT["candidateKeys"];
        readonly generated: TableT["generated"];
        readonly isNullable: TableT["isNullable"];
        readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
        readonly mutable: TableT["mutable"];
        readonly parents: TableT["parents"];
        readonly insertAllowed: TableT["insertAllowed"];
        readonly deleteAllowed: false;
    }>);
    function disallowDelete<TableT extends ITable>(table: TableT): (DisallowDelete<TableT>);
}
export declare namespace Table {
    type PolymorphicColumnNameUnion<TableT extends ITable> = ((ColumnUtil.FromColumnMap<TableT["columns"]>["name"]) | (ColumnUtil.FromColumnMap<TableT["parents"][number]["columns"]>["name"]));
    type PolymorphicGeneratedUnion<TableT extends ITable> = ((TableT["generated"][number]) | (TableT["parents"][number]["generated"][number]));
}
//# sourceMappingURL=table.d.ts.map