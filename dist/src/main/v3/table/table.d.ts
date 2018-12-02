import * as sd from "schema-decorator";
import { IAnonymousTypedColumn } from "../column";
import { CandidateKey } from "../candidate-key";
import { AliasedTableData, AliasedTable } from "../aliased-table";
import { ColumnMapUtil } from "../column-map";
import { ColumnMap } from "../column-map";
import { CandidateKeyArrayUtil } from "../candidate-key-array";
import { SuperKeyArrayUtil } from "../super-key-array";
import { ToUnknownIfAllFieldsNever } from "../type";
import { AssertMap } from "../assert-map";
import { Column } from "../column";
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
export interface ITable<DataT extends TableData = TableData> {
    readonly alias: DataT["alias"];
    readonly name: DataT["name"];
    readonly columns: DataT["columns"];
    readonly __databaseName?: string | undefined;
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
    readonly alias: DataT["alias"];
    readonly name: DataT["name"];
    readonly columns: DataT["columns"];
    readonly __databaseName?: string | undefined;
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
    constructor(data: DataT, __databaseName?: string | undefined);
    queryStringTree(): string;
    as<NewAliasT extends string>(newAlias: NewAliasT): Table.As<this, NewAliasT>;
    getCandidateKeyAssertDelegate(): Table.CandidateKeyAssertDelegate<this>;
    getSuperKeyAssertDelegate(): Table.SuperKeyAssertDelegate<this>;
    setName<NewNameT extends string>(newName: NewNameT): Table.SetName<this, NewNameT>;
    addColumns<FieldsT extends sd.AnyField[]>(fields: FieldsT): (Table.AddColumnsFromFieldTuple<this, FieldsT>);
    addColumns<AssertMapT extends AssertMap>(assertMap: AssertMapT): (Table.AddColumnsFromAssertMap<this, AssertMapT>);
    setAutoIncrement<DelegateT extends Table.AutoIncrementDelegate<this["columns"]>>(delegate: DelegateT): Table.SetAutoIncrement<this, DelegateT>;
    setId<DelegateT extends Table.IdDelegate<this["columns"]>>(this: ITable<DataT & {
        id: undefined;
    }>, delegate: DelegateT): (Table.SetId<this & {
        id: undefined;
    }, DelegateT>);
    addCandidateKey<DelegateT extends Table.CandidateKeyDelegate<this>>(delegate: DelegateT): (Table.AddCandidateKey<this, DelegateT>);
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
        readonly alias: NewAliasT;
        readonly name: TableT["name"];
        readonly columns: ColumnMapUtil.WithTableAlias<TableT["columns"], NewAliasT>;
    }>);
    function as<TableT extends ITable, NewAliasT extends string>({ name, columns, __databaseName, }: TableT, newAlias: NewAliasT): (As<TableT, NewAliasT>);
}
export declare namespace Table {
    type SetName<TableT extends ITable, NewNameT extends string> = (Table<{
        readonly alias: NewNameT;
        readonly name: NewNameT;
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
        readonly alias: TableT["alias"];
        readonly name: TableT["name"];
        readonly columns: ColumnMapUtil.Intersect<TableT["columns"], ColumnMapUtil.FromFieldArray<TableT["alias"], FieldsT>>;
        readonly autoIncrement: TableT["autoIncrement"];
        readonly id: TableT["id"];
        readonly candidateKeys: TableT["candidateKeys"];
        readonly generated: TableT["generated"];
        readonly isNullable: Column.NullableNameUnionFromColumnMap<ColumnMapUtil.Intersect<TableT["columns"], ColumnMapUtil.FromFieldArray<TableT["alias"], FieldsT>>>[];
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
        readonly alias: TableT["alias"];
        readonly name: TableT["name"];
        readonly columns: ColumnMapUtil.Intersect<TableT["columns"], ColumnMapUtil.FromAssertMap<TableT["alias"], AssertMapT>>;
        readonly autoIncrement: TableT["autoIncrement"];
        readonly id: TableT["id"];
        readonly candidateKeys: TableT["candidateKeys"];
        readonly generated: TableT["generated"];
        readonly isNullable: Column.NullableNameUnionFromColumnMap<ColumnMapUtil.Intersect<TableT["columns"], ColumnMapUtil.FromAssertMap<TableT["alias"], AssertMapT>>>[];
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
    type CandidateKey<TableT extends ITable> = (CandidateKeyArrayUtil.ToTypeMapUnion<TableT["candidateKeys"], TableT["columns"]>);
    type CandidateKeyAssertDelegate<TableT extends ITable> = (CandidateKeyArrayUtil.ToUnionAssertDelegate<TableT["candidateKeys"], TableT["columns"]>);
    function getCandidateKeyAssertDelegate<TableT extends ITable>(table: TableT): (CandidateKeyAssertDelegate<TableT>);
    type SuperKey<TableT extends ITable> = (SuperKeyArrayUtil.ToTypeMapUnion<TableT["candidateKeys"], TableT["columns"]>);
    type SuperKeyAssertDelegate<TableT extends ITable> = (SuperKeyArrayUtil.ToUnionAssertDelegate<TableT["candidateKeys"], TableT["columns"]>);
    function getSuperKeyAssertDelegate<TableT extends ITable>(table: TableT): (SuperKeyAssertDelegate<TableT>);
}
export declare namespace Table {
    type AutoIncrementColumnMap<ColumnMapT extends ColumnMap> = ({
        [columnName in {
            [columnName in keyof ColumnMapT]: (ColumnMapT[columnName] extends IAnonymousTypedColumn<number | string | bigint> ? columnName : never);
        }[keyof ColumnMapT]]: (ColumnMapT[columnName]);
    });
    type AutoIncrementDelegate<ColumnMapT extends ColumnMap> = ((columnMap: AutoIncrementColumnMap<ColumnMapT>) => (AutoIncrementColumnMap<ColumnMapT>[keyof AutoIncrementColumnMap<ColumnMapT>]));
    type SetAutoIncrement<TableT extends ITable, DelegateT extends AutoIncrementDelegate<TableT["columns"]>> = (Table<{
        readonly alias: TableT["alias"];
        readonly name: TableT["name"];
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
    function setAutoIncrement<TableT extends ITable, DelegateT extends AutoIncrementDelegate<TableT["columns"]>>(table: TableT, delegate: DelegateT): (SetAutoIncrement<TableT, DelegateT>);
}
export declare namespace Table {
    type IdDelegate<ColumnMapT extends ColumnMap> = ((columnMap: ColumnMapT) => (ColumnMapT[string]));
    type SetId<TableT extends ITable<TableData & {
        id: undefined;
    }>, DelegateT extends IdDelegate<TableT["columns"]>> = (Table<{
        readonly alias: TableT["alias"];
        readonly name: TableT["name"];
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
    function setId<TableT extends ITable<TableData & {
        id: undefined;
    }>, DelegateT extends IdDelegate<TableT["columns"]>>(table: TableT, delegate: DelegateT): (SetId<TableT, DelegateT>);
}
export declare namespace Table {
    type CandidateKeyDelegate<TableT extends ITable> = ((columnMap: TableT["columns"]) => (TableT["columns"][string][]));
    type AddCandidateKey<TableT extends ITable, DelegateT extends CandidateKeyDelegate<TableT>> = (Table<{
        readonly alias: TableT["alias"];
        readonly name: TableT["name"];
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
    function addCandidateKey<TableT extends ITable, DelegateT extends CandidateKeyDelegate<TableT>>(table: TableT, delegate: DelegateT): (AddCandidateKey<TableT, DelegateT>);
}
export declare namespace Table {
    type GeneratedColumnMap<ColumnMapT extends ColumnMap, GeneratedT extends string[]> = ({
        [columnName in Exclude<keyof ColumnMapT, GeneratedT[number]>]: (ColumnMapT[columnName]);
    });
    type GeneratedDelegate<TableT extends ITable> = ((columnMap: GeneratedColumnMap<TableT["columns"], TableT["generated"]>) => (GeneratedColumnMap<TableT["columns"], TableT["generated"]>[keyof GeneratedColumnMap<TableT["columns"], TableT["generated"]>][]));
    type SetGenerated<TableT extends ITable, DelegateT extends GeneratedDelegate<TableT>> = (Table<{
        readonly alias: TableT["alias"];
        readonly name: TableT["name"];
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
        readonly alias: TableT["alias"];
        readonly name: TableT["name"];
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
        readonly alias: TableT["alias"];
        readonly name: TableT["name"];
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
        readonly alias: TableT["alias"];
        readonly name: TableT["name"];
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
        [columnName in Extract<keyof TableT["columns"], keyof ParentT["columns"]>]: (ReturnType<TableT["columns"][columnName]["assertDelegate"]> extends ReturnType<ParentT["columns"][columnName]["assertDelegate"]> ? never : ["Incompatible column types", ReturnType<TableT["columns"][columnName]["assertDelegate"]>, ReturnType<ParentT["columns"][columnName]["assertDelegate"]>] | void);
    }>) & (ParentT["name"] extends TableT["name"] ? "Parent cannot have same name as table" | void : unknown) & (ParentT["name"] extends TableT["parents"][number]["name"] ? "Parent already added to table" | void : unknown));
    type AddParent<TableT extends ITable, ParentT extends ITable> = (Table<{
        readonly alias: TableT["alias"];
        readonly name: TableT["name"];
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
        readonly alias: TableT["alias"];
        readonly name: TableT["name"];
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
        readonly alias: TableT["alias"];
        readonly name: TableT["name"];
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
    type PolymorphicColumnNameUnion<TableT extends ITable> = ((Column.UnionFromColumnMap<TableT["columns"]>["name"]) | (Column.UnionFromColumnMap<TableT["parents"][number]["columns"]>["name"]));
    type PolymorphicGeneratedUnion<TableT extends ITable> = ((TableT["generated"][number]) | (TableT["parents"][number]["generated"][number]));
}
//# sourceMappingURL=table.d.ts.map