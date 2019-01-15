import * as sd from "schema-decorator";
import { Key } from "../key";
import { AliasedTableData, IAliasedTable } from "../aliased-table";
import { AssertMap } from "../assert-map";
import { QueryTree } from "../query-tree";
import { PrimaryKey, PrimaryKeyUtil } from "../primary-key";
import { CandidateKey, CandidateKeyUtil } from "../candidate-key";
import { SuperKey, SuperKeyUtil } from "../super-key";
import { IConnection, UpdateOneResult, UpdateZeroOrOneResult, DeleteOneResult, DeleteZeroOrOneResult } from "../execution";
import { QueryUtil } from "../query";
import { Row } from "../row";
import { RawExprUtil } from "../raw-expr";
import { InsertRow, InsertUtil } from "../insert";
import { UpdateUtil } from "../update";
import * as TableUtil from "./util";
export interface TableData extends AliasedTableData {
    readonly autoIncrement: undefined | string;
    readonly id: undefined | string;
    readonly primaryKey: undefined | Key;
    readonly candidateKeys: Key[];
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
    readonly primaryKey: DataT["primaryKey"];
    readonly candidateKeys: DataT["candidateKeys"];
    readonly generated: DataT["generated"];
    readonly isNullable: DataT["isNullable"];
    readonly hasExplicitDefaultValue: DataT["hasExplicitDefaultValue"];
    readonly mutable: DataT["mutable"];
    readonly parents: DataT["parents"];
    readonly insertAllowed: DataT["insertAllowed"];
    readonly deleteAllowed: DataT["deleteAllowed"];
}
export declare type InsertableTable = (ITable & {
    insertAllowed: true;
});
export declare type DeletableTable = (ITable & {
    deleteAllowed: true;
});
export declare type TableWithPk = (ITable & {
    primaryKey: Key;
});
export declare class Table<DataT extends TableData> implements ITable<DataT> {
    readonly usedRef: DataT["usedRef"];
    readonly alias: DataT["alias"];
    readonly columns: DataT["columns"];
    readonly unaliasedQuery: QueryTree;
    readonly autoIncrement: DataT["autoIncrement"];
    readonly id: DataT["id"];
    readonly primaryKey: DataT["primaryKey"];
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
    as<NewAliasT extends string>(newAlias: NewAliasT): TableUtil.As<this, NewAliasT>;
    private cachedCandidateKeyAssertDelegate;
    candidateKeyAssertDelegate(): CandidateKeyUtil.AssertDelegate<this>;
    private cachedSuperKeyAssertDelegate;
    superKeyAssertDelegate(): SuperKeyUtil.AssertDelegate<this>;
    private cachedPrimaryKeyAssertDelegate;
    primaryKeyAssertDelegate(this: Extract<this, ITable & {
        primaryKey: Key;
    }>): (PrimaryKeyUtil.AssertDelegate<Extract<this, ITable & {
        primaryKey: Key;
    }>>);
    setAlias<NewAliasT extends string>(newAlias: NewAliasT): TableUtil.SetAlias<this, NewAliasT>;
    addColumns<FieldsT extends sd.AnyField[]>(fields: FieldsT): (TableUtil.AddColumnsFromFieldTuple<this, FieldsT>);
    addColumns<AssertMapT extends AssertMap>(assertMap: AssertMapT): (TableUtil.AddColumnsFromAssertMap<this, AssertMapT>);
    setAutoIncrement<DelegateT extends TableUtil.AutoIncrementDelegate<this>>(delegate: DelegateT): TableUtil.SetAutoIncrement<this, DelegateT>;
    setDatabaseName(newDatabaseName: string): (TableUtil.SetDatabaseName<this>);
    setId<DelegateT extends TableUtil.IdDelegate<this>>(delegate: DelegateT): (TableUtil.SetId<this, DelegateT>);
    setPrimaryKey<DelegateT extends TableUtil.PrimaryKeyDelegate<this>>(delegate: TableUtil.AssertValidCandidateKeyDelegate<this, DelegateT>): (TableUtil.SetPrimaryKey<this, DelegateT>);
    addCandidateKey<DelegateT extends TableUtil.CandidateKeyDelegate<this>>(delegate: TableUtil.AssertValidCandidateKeyDelegate<this, DelegateT>): (TableUtil.AddCandidateKey<this, DelegateT>);
    addGenerated<DelegateT extends TableUtil.GeneratedDelegate<this>>(delegate: DelegateT): (TableUtil.AddGenerated<this, DelegateT>);
    addHasExplicitDefaultValue<DelegateT extends TableUtil.HasExplicitDefaultValueDelegate<this>>(delegate: DelegateT): (TableUtil.AddHasExplicitDefaultValue<this, DelegateT>);
    setImmutable(): TableUtil.SetImmutable<this>;
    setMutable<DelegateT extends TableUtil.MutableDelegate<this>>(delegate: DelegateT): (TableUtil.SetMutable<this, DelegateT>);
    addParent<ParentT extends ITable>(parent: TableUtil.Parent<this, ParentT>): (TableUtil.AddParent<this, ParentT>);
    disallowInsert(): TableUtil.DisallowInsert<this>;
    disallowDelete(): TableUtil.DisallowDelete<this>;
    validate(connection: IConnection, result: TableUtil.ValidateTableResult): Promise<void>;
    assertExistsByCk(connection: IConnection, ck: CandidateKey<this>): (Promise<void>);
    assertExistsByPk(this: Extract<this, TableWithPk>, connection: IConnection, pk: PrimaryKey<Extract<this, TableWithPk>>): (Promise<void>);
    assertExistsBySk(connection: IConnection, sk: SuperKey<this>): (Promise<void>);
    existsByCk(connection: IConnection, ck: CandidateKey<this>): (Promise<boolean>);
    existsByPk(this: Extract<this, TableWithPk>, connection: IConnection, pk: PrimaryKey<Extract<this, TableWithPk>>): (Promise<boolean>);
    existsBySk(connection: IConnection, sk: SuperKey<this>): (Promise<boolean>);
    fetchOneByCk(connection: IConnection, ck: CandidateKey<this>): Promise<Row<this>>;
    fetchOneByCk<DelegateT extends QueryUtil.SelectDelegate<QueryUtil.From<QueryUtil.NewInstance, this>>>(connection: IConnection, ck: CandidateKey<this>, delegate: QueryUtil.AssertValidSelectDelegate<QueryUtil.From<QueryUtil.NewInstance, this>, DelegateT>): Promise<QueryUtil.UnmappedType<ReturnType<DelegateT>>>;
    fetchOneByPk(this: Extract<this, TableWithPk>, connection: IConnection, pk: PrimaryKey<Extract<this, TableWithPk>>): (Promise<Row<this>>);
    fetchOneByPk<DelegateT extends QueryUtil.SelectDelegate<QueryUtil.From<QueryUtil.NewInstance, Extract<this, TableWithPk>>>>(this: Extract<this, TableWithPk>, connection: IConnection, pk: PrimaryKey<Extract<this, TableWithPk>>, delegate: QueryUtil.AssertValidSelectDelegate<QueryUtil.From<QueryUtil.NewInstance, Extract<this, TableWithPk>>, DelegateT>): Promise<QueryUtil.UnmappedType<ReturnType<DelegateT>>>;
    fetchOneBySk(connection: IConnection, sk: SuperKey<this>): Promise<Row<this>>;
    fetchOneBySk<DelegateT extends QueryUtil.SelectDelegate<QueryUtil.From<QueryUtil.NewInstance, this>>>(connection: IConnection, sk: SuperKey<this>, delegate: QueryUtil.AssertValidSelectDelegate<QueryUtil.From<QueryUtil.NewInstance, this>, DelegateT>): Promise<QueryUtil.UnmappedType<ReturnType<DelegateT>>>;
    fetchValueByCk<DelegateT extends QueryUtil.SelectValueDelegate<this>>(connection: IConnection, ck: CandidateKey<this>, delegate: QueryUtil.AssertValidSelectValueDelegate<this, DelegateT>): (Promise<RawExprUtil.TypeOf<ReturnType<DelegateT>>>);
    fetchValueByPk<DelegateT extends QueryUtil.SelectValueDelegate<Extract<this, TableWithPk>>>(this: Extract<this, TableWithPk>, connection: IConnection, pk: PrimaryKey<Extract<this, TableWithPk>>, delegate: QueryUtil.AssertValidSelectValueDelegate<Extract<this, TableWithPk>, DelegateT>): (Promise<RawExprUtil.TypeOf<ReturnType<DelegateT>>>);
    fetchValueBySk<DelegateT extends QueryUtil.SelectValueDelegate<this>>(connection: IConnection, sk: SuperKey<this>, delegate: QueryUtil.AssertValidSelectValueDelegate<this, DelegateT>): (Promise<RawExprUtil.TypeOf<ReturnType<DelegateT>>>);
    fetchValueOrUndefinedByCk<DelegateT extends QueryUtil.SelectValueDelegate<this>>(connection: IConnection, ck: CandidateKey<this>, delegate: QueryUtil.AssertValidSelectValueDelegate<this, DelegateT>): (Promise<RawExprUtil.TypeOf<ReturnType<DelegateT>> | undefined>);
    fetchValueOrUndefinedByPk<DelegateT extends QueryUtil.SelectValueDelegate<Extract<this, TableWithPk>>>(this: Extract<this, TableWithPk>, connection: IConnection, pk: PrimaryKey<Extract<this, TableWithPk>>, delegate: QueryUtil.AssertValidSelectValueDelegate<Extract<this, TableWithPk>, DelegateT>): (Promise<RawExprUtil.TypeOf<ReturnType<DelegateT>> | undefined>);
    fetchValueOrUndefinedBySk<DelegateT extends QueryUtil.SelectValueDelegate<this>>(connection: IConnection, sk: SuperKey<this>, delegate: QueryUtil.AssertValidSelectValueDelegate<this, DelegateT>): (Promise<RawExprUtil.TypeOf<ReturnType<DelegateT>> | undefined>);
    fetchZeroOrOneByCk(connection: IConnection, ck: CandidateKey<this>): Promise<Row<this> | undefined>;
    fetchZeroOrOneByCk<DelegateT extends QueryUtil.SelectDelegate<QueryUtil.From<QueryUtil.NewInstance, this>>>(connection: IConnection, ck: CandidateKey<this>, delegate: QueryUtil.AssertValidSelectDelegate<QueryUtil.From<QueryUtil.NewInstance, this>, DelegateT>): Promise<QueryUtil.UnmappedType<ReturnType<DelegateT>> | undefined>;
    fetchZeroOrOneByPk(this: Extract<this, TableWithPk>, connection: IConnection, pk: PrimaryKey<Extract<this, TableWithPk>>): (Promise<Row<this> | undefined>);
    fetchZeroOrOneByPk<DelegateT extends QueryUtil.SelectDelegate<QueryUtil.From<QueryUtil.NewInstance, Extract<this, TableWithPk>>>>(this: Extract<this, TableWithPk>, connection: IConnection, pk: PrimaryKey<Extract<this, TableWithPk>>, delegate: QueryUtil.AssertValidSelectDelegate<QueryUtil.From<QueryUtil.NewInstance, Extract<this, TableWithPk>>, DelegateT>): Promise<QueryUtil.UnmappedType<ReturnType<DelegateT>> | undefined>;
    fetchZeroOrOneBySk(connection: IConnection, sk: SuperKey<this>): Promise<Row<this> | undefined>;
    fetchZeroOrOneBySk<DelegateT extends QueryUtil.SelectDelegate<QueryUtil.From<QueryUtil.NewInstance, this>>>(connection: IConnection, sk: SuperKey<this>, delegate: QueryUtil.AssertValidSelectDelegate<QueryUtil.From<QueryUtil.NewInstance, this>, DelegateT>): Promise<QueryUtil.UnmappedType<ReturnType<DelegateT>> | undefined>;
    insertAndFetch<RowT extends InsertRow<Extract<this, InsertableTable>>>(this: Extract<this, InsertableTable> & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, insertRow: RowT): Promise<InsertUtil.InsertAndFetchResult<Extract<this, InsertableTable>, RowT>>;
    insertIgnore(this: Extract<this, InsertableTable>, connection: IConnection, insertRow: InsertRow<Extract<this, InsertableTable>>): (Promise<InsertUtil.InsertIgnoreResult<Extract<this, InsertableTable>>>);
    insert(this: Extract<this, InsertableTable>, connection: IConnection, insertRow: InsertRow<Extract<this, InsertableTable>>): (Promise<InsertUtil.InsertResult<Extract<this, InsertableTable>>>);
    replace(this: Extract<this, InsertableTable>, connection: IConnection, insertRow: InsertRow<Extract<this, InsertableTable>>): (Promise<InsertUtil.ReplaceResult<Extract<this, InsertableTable>>>);
    updateAndFetchOneByCk<DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>>(this: this & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, ck: CandidateKey<this>, delegate: DelegateT): (UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<this, DelegateT, Promise<UpdateUtil.UpdateAndFetchOneResult<this, DelegateT>>>);
    updateAndFetchOneByPk<DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<Extract<this, TableWithPk>>>(this: Extract<this, TableWithPk> & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, pk: PrimaryKey<Extract<this, TableWithPk>>, delegate: DelegateT): (UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<Extract<this, TableWithPk>, DelegateT, Promise<UpdateUtil.UpdateAndFetchOneResult<Extract<this, TableWithPk>, DelegateT>>>);
    updateAndFetchOneBySk<DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>>(this: this & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, sk: SuperKey<this>, delegate: DelegateT): (UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<this, DelegateT, Promise<UpdateUtil.UpdateAndFetchOneResult<this, DelegateT>>>);
    updateAndFetchZeroOrOneByCk<DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>>(this: this & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, ck: CandidateKey<this>, delegate: DelegateT): (UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<this, DelegateT, Promise<UpdateUtil.UpdateAndFetchZeroOrOneResult<this, DelegateT>>>);
    updateAndFetchZeroOrOneByPk<DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<Extract<this, TableWithPk>>>(this: Extract<this, TableWithPk> & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, pk: PrimaryKey<Extract<this, TableWithPk>>, delegate: DelegateT): (UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<Extract<this, TableWithPk>, DelegateT, Promise<UpdateUtil.UpdateAndFetchZeroOrOneResult<Extract<this, TableWithPk>, DelegateT>>>);
    updateAndFetchZeroOrOneBySk<DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>>(this: this & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, sk: SuperKey<this>, delegate: DelegateT): (UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<this, DelegateT, Promise<UpdateUtil.UpdateAndFetchZeroOrOneResult<this, DelegateT>>>);
    updateOneByCk<DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>>(this: this & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, ck: CandidateKey<this>, delegate: DelegateT): (UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<this, DelegateT, Promise<UpdateOneResult>>);
    updateOneByPk<DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<Extract<this, TableWithPk>>>(this: Extract<this, TableWithPk> & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, pk: PrimaryKey<Extract<this, TableWithPk>>, delegate: DelegateT): (UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<Extract<this, TableWithPk>, DelegateT, Promise<UpdateOneResult>>);
    updateOneBySk<DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>>(this: this & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, sk: SuperKey<this>, delegate: DelegateT): (UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<this, DelegateT, Promise<UpdateOneResult>>);
    updateZeroOrOneByCk<DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>>(this: this & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, ck: CandidateKey<this>, delegate: DelegateT): (UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<this, DelegateT, Promise<UpdateZeroOrOneResult>>);
    updateZeroOrOneByPk<DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<Extract<this, TableWithPk>>>(this: Extract<this, TableWithPk> & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, pk: PrimaryKey<Extract<this, TableWithPk>>, delegate: DelegateT): (UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<Extract<this, TableWithPk>, DelegateT, Promise<UpdateZeroOrOneResult>>);
    updateZeroOrOneBySk<DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>>(this: this & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, sk: SuperKey<this>, delegate: DelegateT): (UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<this, DelegateT, Promise<UpdateZeroOrOneResult>>);
    deleteOneByCk(this: Extract<this, DeletableTable> & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, ck: CandidateKey<Extract<this, DeletableTable>>): (Promise<DeleteOneResult>);
    deleteOneByPk(this: Extract<this, DeletableTable & TableWithPk>, connection: IConnection, pk: PrimaryKey<Extract<this, DeletableTable & TableWithPk>>): (Promise<DeleteOneResult>);
    deleteOneBySk(this: Extract<this, DeletableTable> & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, sk: SuperKey<Extract<this, DeletableTable>>): (Promise<DeleteOneResult>);
    deleteZeroOrOneByCk(this: Extract<this, DeletableTable> & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, ck: CandidateKey<Extract<this, DeletableTable>>): (Promise<DeleteZeroOrOneResult>);
    deleteZeroOrOneByPk(this: Extract<this, DeletableTable & TableWithPk>, connection: IConnection, pk: PrimaryKey<Extract<this, DeletableTable & TableWithPk>>): (Promise<DeleteZeroOrOneResult>);
    deleteZeroOrOneBySk(this: Extract<this, DeletableTable> & TableUtil.AssertHasCandidateKey<this>, connection: IConnection, sk: SuperKey<Extract<this, DeletableTable>>): (Promise<DeleteZeroOrOneResult>);
}
//# sourceMappingURL=table.d.ts.map