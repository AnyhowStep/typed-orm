import * as sd from "schema-decorator";
import {Key} from "../key";
import {AliasedTableData, IAliasedTable} from "../aliased-table";
import {AssertMap} from "../assert-map";
import {QueryTree} from "../query-tree";
import {PrimaryKey, PrimaryKeyUtil} from "../primary-key";
import {CandidateKey, CandidateKeyUtil} from "../candidate-key";
import {SuperKey, SuperKeyUtil} from "../super-key";
import {
    IConnection,
    UpdateOneResult,
    UpdateZeroOrOneResult,
    DeleteOneResult,
    DeleteZeroOrOneResult,
} from "../execution";
import {QueryUtil} from "../query";
import {Row} from "../row";
import {RawExprUtil} from "../raw-expr";
import {InsertRow, InsertUtil} from "../insert";
import {UpdateUtil} from "../update";
import {DeleteUtil} from "../delete";
import * as TableUtil from "./util";

export interface TableData extends AliasedTableData {
    //The maximum value `UNSIGNED BIGINT` can have is
    //18446744073709551615
    //which is 2^(32*8)-1 because `UNSIGNED BIGINT` uses 8 bytes.
    //`UNSIGNED BIGINT` can have up to 20 digits...

    //This cannot be represented correctly with JS' `number` type,
    //which should be an 8-byte floating point,
    //The maximum safe value is Number.MAX_SAFE_INTEGER
    //which is 9,007,199,254,740,991
    readonly autoIncrement : undefined|string;
    //A table can have a PK that is an FK to an auto-increment column in another table
    readonly id : undefined|string;
    /*
        A primary key is just a candidate key.
        With the additional restriction that
        all its columns cannot be nullable!

        Apart from that, the only thing "special"
        about it is that we say,

        "This is *the* candidate key I want to talk about by default"
    */
    readonly primaryKey : undefined|Key;
    readonly candidateKeys : Key[];

    //If a column is generated, you must specify as such manually.
    //Setting generated column values will not be allowed with INSERT statements.
    //Updating generated column values will also not be allowed with UPDATE statements.
    readonly generated : string[];
    //If a column is nullable, it has a server default value of `NULL`.
    //A nullable column has a default value *implicitly*.
    /*
        const t1 = table(
            "tableName",
            {
                column : sd.nullable(o.bigint())
            }
        );

        t1.isNullable is now ["column"] because
        "column" is is nullable.

        const t2 = t1.addColumns({
            column : o.bigint()
        });

        t2.isNullable is now [] because
        "column" is no longer nullable.
    */
    readonly isNullable : string[];
    //If a column is NOT nullable, but has a server default value,
    //like CURRENT_TIMESTAMP or some other value,
    //you will have to specify as such manually.
    //If a column is a GENERATED column, then it also has a server default value.
    //Columns with server default values are optional with INSERT statements.
    readonly hasExplicitDefaultValue : string[];
    //By default, all non-generated columns of the table are mutable.
    //Calling setMutable() will set only the specified columns as mutable.
    //Calling setImmutable() will make them all immutable.
    //Generated columns cannot be mutable.
    readonly mutable : string[];

    /*
        A parent table must be instantiated before the child table.

        The parent and child table must share at least one unique key (usually the `id`)

        If there are duplicate column names, it is assumed there
        is an FK of that column from the child table to the
        parent table, and that the child's column type is assignable
        to the parent's column type.

        An example would be "discriminator" columns used in exclusive
        inheritance. The parent table could have a column, `appKeyType`,
        which would be `BROWSER|SERVER`. The child table would, then,
        have a column called `appKeyType` with `SERVER` as the only value.

        We outline some possibilities for duplicate columns,

        Child       | Parent        |
        generated   | generated     | When inserting, the column value is ignored
        generated   | has default   | The child column's generated value must be a numeric string
        generated   | no default    | The child column's generated value must be a numeric string

        has default | generated     | The parent column must a unique key we can use to retrieve after insertion, to get the value
        has default | has default   | If value is provided, it'll set both to the value, otherwise, it lets the defaults be set
        has default | no default    | The value must be provided, it'll set both to the value

        no default  | generated     | The parent column must a unique key we can use to retrieve after insertion, to get the value
        no default  | has default   | The parent column must a unique key we can use to retrieve after insertion, to get the value
        no default  | no default    | The value must be provided, it'll set both to the value
    */
    readonly parents : ITable[];
    //Defaults to `true`
    readonly insertAllowed : boolean;
    //Defaults to `true`
    readonly deleteAllowed : boolean;
}

export interface ITable<DataT extends TableData=TableData> extends IAliasedTable<DataT> {
    readonly usedRef : DataT["usedRef"];
    readonly alias : DataT["alias"];
    readonly columns : DataT["columns"];

    readonly unaliasedQuery : QueryTree;

    readonly autoIncrement : DataT["autoIncrement"];
    readonly id : DataT["id"];
    readonly primaryKey : DataT["primaryKey"];
    readonly candidateKeys : DataT["candidateKeys"];

    readonly generated : DataT["generated"];
    readonly isNullable : DataT["isNullable"];
    readonly hasExplicitDefaultValue : DataT["hasExplicitDefaultValue"];
    readonly mutable : DataT["mutable"];

    readonly parents : DataT["parents"];
    readonly insertAllowed : DataT["insertAllowed"];
    readonly deleteAllowed : DataT["deleteAllowed"];
}

export type InsertableTable = (
    ITable &
    { insertAllowed : true }
);
export type DeletableTable = (
    ITable &
    { deleteAllowed : true }
);
export type TableWithPk = (
    ITable &
    { primaryKey : Key }
);

export class Table<DataT extends TableData> implements ITable<DataT> {
    readonly usedRef : DataT["usedRef"];
    readonly alias : DataT["alias"];
    readonly columns : DataT["columns"];

    readonly unaliasedQuery : QueryTree;

    readonly autoIncrement : DataT["autoIncrement"];
    readonly id : DataT["id"];
    readonly primaryKey : DataT["primaryKey"];
    readonly candidateKeys : DataT["candidateKeys"];

    readonly generated : DataT["generated"];
    readonly isNullable : DataT["isNullable"];
    readonly hasExplicitDefaultValue : DataT["hasExplicitDefaultValue"];
    readonly mutable : DataT["mutable"];

    readonly parents : DataT["parents"];
    readonly insertAllowed : DataT["insertAllowed"];
    readonly deleteAllowed : DataT["deleteAllowed"];

    constructor (
        data : DataT,
        {
            unaliasedQuery,
        } :
        {
            unaliasedQuery : QueryTree,
        }
    ) {
        this.usedRef = data.usedRef;
        this.alias = data.alias;
        this.columns = data.columns;

        this.unaliasedQuery = unaliasedQuery;

        this.autoIncrement = data.autoIncrement;
        this.id = data.id;
        this.primaryKey = data.primaryKey;
        this.candidateKeys = data.candidateKeys;

        this.generated = data.generated;
        this.isNullable = data.isNullable;
        this.hasExplicitDefaultValue = data.hasExplicitDefaultValue;
        this.mutable = data.mutable;

        this.parents = data.parents;
        this.insertAllowed = data.insertAllowed;
        this.deleteAllowed = data.deleteAllowed;
    }

    as<NewAliasT extends string> (newAlias : NewAliasT) : TableUtil.As<this, NewAliasT> {
        return TableUtil.as(this, newAlias);
    }

    //A cache to re-use the assert delegate
    private cachedCandidateKeyAssertDelegate : (
        undefined |
        CandidateKeyUtil.AssertDelegate<this>
    );
    candidateKeyAssertDelegate () : CandidateKeyUtil.AssertDelegate<this> {
        if (this.cachedCandidateKeyAssertDelegate == undefined) {
            this.cachedCandidateKeyAssertDelegate = (
                CandidateKeyUtil.assertDelegate(this)
            );
        }
        return this.cachedCandidateKeyAssertDelegate;
    }
    //A cache to re-use the assert delegate
    private cachedSuperKeyAssertDelegate : (
        undefined |
        SuperKeyUtil.AssertDelegate<this>
    );
    superKeyAssertDelegate () : SuperKeyUtil.AssertDelegate<this> {
        if (this.cachedSuperKeyAssertDelegate == undefined) {
            this.cachedSuperKeyAssertDelegate = (
                SuperKeyUtil.assertDelegate(this)
            );
        }
        return this.cachedSuperKeyAssertDelegate;
    }
    //A cache to re-use the assert delegate
    private cachedPrimaryKeyAssertDelegate : (
        undefined |
        PrimaryKeyUtil.AssertDelegate<
            Extract<this, ITable & { primaryKey : Key }>
        >
    );
    primaryKeyAssertDelegate (
        this : Extract<this, ITable & { primaryKey : Key }>
    ) : (
        PrimaryKeyUtil.AssertDelegate<
            Extract<this, ITable & { primaryKey : Key }>
        >
    ) {
        if (this.cachedPrimaryKeyAssertDelegate == undefined) {
            this.cachedPrimaryKeyAssertDelegate = (
                PrimaryKeyUtil.assertDelegate(this)
            );
        }
        return this.cachedPrimaryKeyAssertDelegate;
    }

    setAlias<NewAliasT extends string>(
        newAlias : NewAliasT
    ) : TableUtil.SetAlias<this, NewAliasT> {
        return TableUtil.setAlias(this, newAlias);
    }

    addColumns<
        FieldsT extends sd.AnyField[]
    > (
        fields : FieldsT
    ) : (
        TableUtil.AddColumnsFromFieldTuple<this, FieldsT>
    );
    addColumns<
        AssertMapT extends AssertMap
    > (
        assertMap : AssertMapT
    ) : (
        TableUtil.AddColumnsFromAssertMap<this, AssertMapT>
    );
    addColumns (rawColumns : any) : any {
        return TableUtil.addColumns(this, rawColumns);
    }

    setAutoIncrement<
        DelegateT extends TableUtil.AutoIncrementDelegate<this>
    > (
        delegate : DelegateT
    ) : TableUtil.SetAutoIncrement<this, DelegateT> {
        return TableUtil.setAutoIncrement<
            this,
            DelegateT
        >(this, delegate);
    }
    setDatabaseName (
        newDatabaseName : string
    ) : (
        TableUtil.SetDatabaseName<this>
    ) {
        return TableUtil.setDatabaseName(this, newDatabaseName);
    }
    setId<
        DelegateT extends TableUtil.IdDelegate<this>
    > (
        delegate : DelegateT
    ) : (
        TableUtil.SetId<this, DelegateT>
    ) {
        return TableUtil.setId<
            this,
            DelegateT
        >(this, delegate);
    }
    setPrimaryKey<
        DelegateT extends TableUtil.PrimaryKeyDelegate<this>
    > (
        delegate : TableUtil.AssertValidCandidateKeyDelegate<
            this, DelegateT
        >
    ) : (
        TableUtil.SetPrimaryKey<this, DelegateT>
    ) {
        return TableUtil.setPrimaryKey<
            this,
            DelegateT
        >(this, delegate);
    }
    /*
        Adding a candidate key that is a super-set of
        an existing candidate key should throw an error,
        both during compile-time and run-time.

        Candidate keys should be as small as possible.
    */
    addCandidateKey<
        DelegateT extends TableUtil.CandidateKeyDelegate<this>
    > (
        delegate : TableUtil.AssertValidCandidateKeyDelegate<
            this, DelegateT
        >
    ) : (
        TableUtil.AddCandidateKey<this, DelegateT>
    ) {
        return TableUtil.addCandidateKey<this, DelegateT>(this, delegate);
    }
    addGenerated<
        DelegateT extends TableUtil.GeneratedDelegate<this>
    > (
        delegate : DelegateT
    ) : (
        TableUtil.AddGenerated<this, DelegateT>
    ) {
        return TableUtil.addGenerated(this, delegate);
    }
    addHasExplicitDefaultValue<
        DelegateT extends TableUtil.HasExplicitDefaultValueDelegate<this>
    > (
        delegate : DelegateT
    ) : (
        TableUtil.AddHasExplicitDefaultValue<this, DelegateT>
    ) {
        return TableUtil.addHasExplicitDefaultValue(this, delegate);
    }
    setImmutable () : TableUtil.SetImmutable<this> {
        return TableUtil.setImmutable(this);
    }
    setMutable<
        DelegateT extends TableUtil.MutableDelegate<this>
    > (
        delegate : DelegateT
    ) : (
        TableUtil.SetMutable<this, DelegateT>
    ) {
        return TableUtil.setMutable(this, delegate);
    }
    addParent<
        ParentT extends ITable
    > (
        parent : TableUtil.Parent<this, ParentT>
    ) : (
        TableUtil.AddParent<this, ParentT>
    ) {
        return TableUtil.addParent<this, ParentT>(this, parent);
    }
    disallowInsert () : TableUtil.DisallowInsert<this> {
        return TableUtil.disallowInsert(this);
    }
    disallowDelete () : TableUtil.DisallowDelete<this> {
        return TableUtil.disallowDelete(this);
    }

    validate (connection : IConnection, result : TableUtil.ValidateTableResult) {
        return TableUtil.validate(this, connection, result);
    }

    assertExistsByCk (
        connection : IConnection,
        ck : CandidateKey<this>
    ) : (
        Promise<void>
    ) {
        return QueryUtil.assertExistsByCk(connection, this, ck);
    }
    assertExistsByPk (
        this : Extract<this, TableWithPk>,
        connection : IConnection,
        pk : PrimaryKey<Extract<this, TableWithPk>>
    ) : (
        Promise<void>
    ) {
        return QueryUtil.assertExistsByPk(connection, this, pk);
    }
    assertExistsBySk (
        connection : IConnection,
        sk : SuperKey<this>
    ) : (
        Promise<void>
    ) {
        return QueryUtil.assertExistsBySk(connection, this, sk);
    }

    existsByCk (
        connection : IConnection,
        ck : CandidateKey<this>
    ) : (
        Promise<boolean>
    ) {
        return QueryUtil.existsByCk(connection, this, ck);
    }
    existsByPk (
        this : Extract<this, TableWithPk>,
        connection : IConnection,
        pk : PrimaryKey<Extract<this, TableWithPk>>
    ) : (
        Promise<boolean>
    ) {
        return QueryUtil.existsByPk(connection, this, pk);
    }
    existsBySk (
        connection : IConnection,
        sk : SuperKey<this>
    ) : (
        Promise<boolean>
    ) {
        return QueryUtil.existsBySk(connection, this, sk);
    }

    fetchOneByCk (
        connection : IConnection,
        ck : CandidateKey<this>
    ) : Promise<Row<this>> {
        return QueryUtil.fetchOneByCk(connection, this, ck);
    }
    fetchOneByPk (
        this : Extract<this, TableWithPk>,
        connection : IConnection,
        pk : PrimaryKey<Extract<this, TableWithPk>>
    ) : (
        Promise<Row<this>>
    ) {
        return QueryUtil.fetchOneByPk(connection, this, pk);
    }
    fetchOneBySk (
        connection : IConnection,
        sk : SuperKey<this>
    ) : Promise<Row<this>> {
        return QueryUtil.fetchOneBySk(connection, this, sk);
    }

    fetchValueByCk<
        DelegateT extends QueryUtil.SelectValueDelegate<this>
    > (
        connection : IConnection,
        ck : CandidateKey<this>,
        delegate : QueryUtil.AssertValidSelectValueDelegate<this, DelegateT>
    ) : (
        Promise<
            RawExprUtil.TypeOf<ReturnType<DelegateT>>
        >
    ) {
        return QueryUtil.fetchValueByCk<this, DelegateT>(
            connection,
            this,
            ck,
            delegate
        );
    }
    fetchValueByPk<
        DelegateT extends QueryUtil.SelectValueDelegate<Extract<this, TableWithPk>>
    > (
        this : Extract<this, TableWithPk>,
        connection : IConnection,
        pk : PrimaryKey<Extract<this, TableWithPk>>,
        delegate : QueryUtil.AssertValidSelectValueDelegate<Extract<this, TableWithPk>, DelegateT>
    ) : (
        Promise<
            RawExprUtil.TypeOf<ReturnType<DelegateT>>
        >
    ) {
        return QueryUtil.fetchValueByPk<Extract<this, TableWithPk>, DelegateT>(
            connection,
            this,
            pk,
            delegate
        );
    }
    fetchValueBySk<
        DelegateT extends QueryUtil.SelectValueDelegate<this>
    > (
        connection : IConnection,
        sk : SuperKey<this>,
        delegate : QueryUtil.AssertValidSelectValueDelegate<this, DelegateT>
    ) : (
        Promise<
            RawExprUtil.TypeOf<ReturnType<DelegateT>>
        >
    ) {
        return QueryUtil.fetchValueBySk<this, DelegateT>(
            connection,
            this,
            sk,
            delegate
        );
    }

    fetchValueOrUndefinedByCk<
        DelegateT extends QueryUtil.SelectValueDelegate<this>
    > (
        connection : IConnection,
        ck : CandidateKey<this>,
        delegate : QueryUtil.AssertValidSelectValueDelegate<this, DelegateT>
    ) : (
        Promise<
            RawExprUtil.TypeOf<ReturnType<DelegateT>>|undefined
        >
    ) {
        return QueryUtil.fetchValueOrUndefinedByCk<this, DelegateT>(
            connection,
            this,
            ck,
            delegate
        );
    }
    fetchValueOrUndefinedByPk<
        DelegateT extends QueryUtil.SelectValueDelegate<Extract<this, TableWithPk>>
    > (
        this : Extract<this, TableWithPk>,
        connection : IConnection,
        pk : PrimaryKey<Extract<this, TableWithPk>>,
        delegate : QueryUtil.AssertValidSelectValueDelegate<Extract<this, TableWithPk>, DelegateT>
    ) : (
        Promise<
            RawExprUtil.TypeOf<ReturnType<DelegateT>>|undefined
        >
    ) {
        return QueryUtil.fetchValueOrUndefinedByPk<Extract<this, TableWithPk>, DelegateT>(
            connection,
            this,
            pk,
            delegate
        );
    }
    fetchValueOrUndefinedBySk<
        DelegateT extends QueryUtil.SelectValueDelegate<this>
    > (
        connection : IConnection,
        sk : SuperKey<this>,
        delegate : QueryUtil.AssertValidSelectValueDelegate<this, DelegateT>
    ) : (
        Promise<
            RawExprUtil.TypeOf<ReturnType<DelegateT>>|undefined
        >
    ) {
        return QueryUtil.fetchValueOrUndefinedBySk<this, DelegateT>(
            connection,
            this,
            sk,
            delegate
        );
    }

    fetchZeroOrOneByCk (
        connection : IConnection,
        ck : CandidateKey<this>
    ) : Promise<Row<this>|undefined> {
        return QueryUtil.fetchZeroOrOneByCk(connection, this, ck);
    }
    fetchZeroOrOneByPk (
        this : Extract<this, TableWithPk>,
        connection : IConnection,
        pk : PrimaryKey<Extract<this, TableWithPk>>
    ) : (
        Promise<Row<this>|undefined>
    ) {
        return QueryUtil.fetchZeroOrOneByPk(connection, this, pk);
    }
    fetchZeroOrOneBySk (
        connection : IConnection,
        sk : SuperKey<this>
    ) : Promise<Row<this>|undefined> {
        return QueryUtil.fetchZeroOrOneBySk(connection, this, sk);
    }

    insertAndFetch<
        RowT extends InsertRow<Extract<this, InsertableTable>>
    > (
        this : Extract<this, InsertableTable> & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        insertRow : RowT
    ) : Promise<InsertUtil.InsertAndFetchResult<Extract<this, InsertableTable>, RowT>> {
        return InsertUtil.insertAndFetch<Extract<this, InsertableTable>, RowT>(
            connection,
            this,
            insertRow
        );
    }
    insertIgnore (
        this : Extract<this, InsertableTable>,
        connection : IConnection,
        insertRow : InsertRow<Extract<this, InsertableTable>>
    ) : (
        Promise<InsertUtil.InsertIgnoreResult<Extract<this, InsertableTable>>>
    ) {
        return InsertUtil.insertIgnore(connection, this, insertRow);
    }
    insert (
        this : Extract<this, InsertableTable>,
        connection : IConnection,
        insertRow : InsertRow<Extract<this, InsertableTable>>
    ) : (
        Promise<InsertUtil.InsertResult<Extract<this, InsertableTable>>>
    ) {
        return InsertUtil.insert(connection, this, insertRow);
    }
    replace (
        this : Extract<this, InsertableTable>,
        connection : IConnection,
        insertRow : InsertRow<Extract<this, InsertableTable>>
    ) : (
        Promise<InsertUtil.ReplaceResult<Extract<this, InsertableTable>>>
    ) {
        return InsertUtil.replace(connection, this, insertRow);
    }

    updateAndFetchOneByCk<
        DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>
    > (
        this : this & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        ck : CandidateKey<this>,
        delegate : DelegateT
    ) : (
        UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<
            this,
            DelegateT,
            Promise<UpdateUtil.UpdateAndFetchOneResult<
                this,
                DelegateT
            >>
        >
    ) {
        return UpdateUtil.updateAndFetchOneByCk<this, DelegateT>(
            connection,
            this,
            ck,
            delegate
        );
    }
    updateAndFetchOneByPk<
        DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<Extract<this, TableWithPk>>
    > (
        this : Extract<this, TableWithPk> & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        pk : PrimaryKey<Extract<this, TableWithPk>>,
        delegate : DelegateT
    ) : (
        UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<
            Extract<this, TableWithPk>,
            DelegateT,
            Promise<UpdateUtil.UpdateAndFetchOneResult<
                Extract<this, TableWithPk>,
                DelegateT
            >>
        >
    ) {
        return UpdateUtil.updateAndFetchOneByPk<Extract<this, TableWithPk>, DelegateT>(
            connection,
            this,
            pk,
            delegate
        );
    }
    updateAndFetchOneBySk<
        DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>
    > (
        this : this & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        sk : SuperKey<this>,
        delegate : DelegateT
    ) : (
        UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<
            this,
            DelegateT,
            Promise<UpdateUtil.UpdateAndFetchOneResult<
                this,
                DelegateT
            >>
        >
    ) {
        return UpdateUtil.updateAndFetchOneBySk<this, DelegateT>(
            connection,
            this,
            sk,
            delegate
        );
    }

    updateAndFetchZeroOrOneByCk<
        DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>
    > (
        this : this & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        ck : CandidateKey<this>,
        delegate : DelegateT
    ) : (
        UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<
            this,
            DelegateT,
            Promise<UpdateUtil.UpdateAndFetchZeroOrOneResult<
                this,
                DelegateT
            >>
        >
    ) {
        return UpdateUtil.updateAndFetchZeroOrOneByCk<this, DelegateT>(
            connection,
            this,
            ck,
            delegate
        );
    }
    updateAndFetchZeroOrOneByPk<
        DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<Extract<this, TableWithPk>>
    > (
        this : Extract<this, TableWithPk> & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        pk : PrimaryKey<Extract<this, TableWithPk>>,
        delegate : DelegateT
    ) : (
        UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<
            Extract<this, TableWithPk>,
            DelegateT,
            Promise<UpdateUtil.UpdateAndFetchZeroOrOneResult<
                Extract<this, TableWithPk>,
                DelegateT
            >>
        >
    ) {
        return UpdateUtil.updateAndFetchZeroOrOneByPk<Extract<this, TableWithPk>, DelegateT>(
            connection,
            this,
            pk,
            delegate
        );
    }
    updateAndFetchZeroOrOneBySk<
        DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>
    > (
        this : this & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        sk : SuperKey<this>,
        delegate : DelegateT
    ) : (
        UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<
            this,
            DelegateT,
            Promise<UpdateUtil.UpdateAndFetchZeroOrOneResult<
                this,
                DelegateT
            >>
        >
    ) {
        return UpdateUtil.updateAndFetchZeroOrOneBySk<this, DelegateT>(
            connection,
            this,
            sk,
            delegate
        );
    }

    updateOneByCk<
        DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>
    > (
        this : this & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        ck : CandidateKey<this>,
        delegate : DelegateT
    ) : (
        UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<
            this,
            DelegateT,
            Promise<UpdateOneResult>
        >
    ) {
        return UpdateUtil.updateOneByCk<this, DelegateT>(
            connection,
            this,
            ck,
            delegate
        );
    }
    updateOneByPk<
        DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<Extract<this, TableWithPk>>
    > (
        this : Extract<this, TableWithPk> & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        pk : PrimaryKey<Extract<this, TableWithPk>>,
        delegate : DelegateT
    ) : (
        UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<
            Extract<this, TableWithPk>,
            DelegateT,
            Promise<UpdateOneResult>
        >
    ) {
        return UpdateUtil.updateOneByPk<Extract<this, TableWithPk>, DelegateT>(
            connection,
            this,
            pk,
            delegate
        );
    }
    updateOneBySk<
        DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>
    > (
        this : this & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        sk : SuperKey<this>,
        delegate : DelegateT
    ) : (
        UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<
            this,
            DelegateT,
            Promise<UpdateOneResult>
        >
    ) {
        return UpdateUtil.updateOneBySk<this, DelegateT>(
            connection,
            this,
            sk,
            delegate
        );
    }

    updateZeroOrOneByCk<
        DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>
    > (
        this : this & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        ck : CandidateKey<this>,
        delegate : DelegateT
    ) : (
        UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<
            this,
            DelegateT,
            Promise<UpdateZeroOrOneResult>
        >
    ) {
        return UpdateUtil.updateZeroOrOneByCk<this, DelegateT>(
            connection,
            this,
            ck,
            delegate
        );
    }
    updateZeroOrOneByPk<
        DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<Extract<this, TableWithPk>>
    > (
        this : Extract<this, TableWithPk> & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        pk : PrimaryKey<Extract<this, TableWithPk>>,
        delegate : DelegateT
    ) : (
        UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<
            Extract<this, TableWithPk>,
            DelegateT,
            Promise<UpdateZeroOrOneResult>
        >
    ) {
        return UpdateUtil.updateZeroOrOneByPk<Extract<this, TableWithPk>, DelegateT>(
            connection,
            this,
            pk,
            delegate
        );
    }
    updateZeroOrOneBySk<
        DelegateT extends UpdateUtil.SingleTableSetDelegateFromTable<this>
    > (
        this : this & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        sk : SuperKey<this>,
        delegate : DelegateT
    ) : (
        UpdateUtil.AssertValidSingleTableSetDelegateFromTable_Hack<
            this,
            DelegateT,
            Promise<UpdateZeroOrOneResult>
        >
    ) {
        return UpdateUtil.updateZeroOrOneBySk<this, DelegateT>(
            connection,
            this,
            sk,
            delegate
        );
    }

    deleteOneByCk (
        this : Extract<this, DeletableTable> & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        ck : CandidateKey<Extract<this, DeletableTable>>
    ) : (
        Promise<DeleteOneResult>
    ) {
        return DeleteUtil.deleteOneByCk(connection, this, ck);
    }
    deleteOneByPk (
        this : Extract<this, DeletableTable & TableWithPk>,
        connection : IConnection,
        pk : PrimaryKey<Extract<this, DeletableTable & TableWithPk>>
    ) : (
        Promise<DeleteOneResult>
    ) {
        return DeleteUtil.deleteOneByPk(connection, this, pk);
    }
    deleteOneBySk (
        this : Extract<this, DeletableTable> & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        sk : SuperKey<Extract<this, DeletableTable>>
    ) : (
        Promise<DeleteOneResult>
    ) {
        return DeleteUtil.deleteOneBySk(connection, this, sk);
    }

    deleteZeroOrOneByCk (
        this : Extract<this, DeletableTable> & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        ck : CandidateKey<Extract<this, DeletableTable>>
    ) : (
        Promise<DeleteZeroOrOneResult>
    ) {
        return DeleteUtil.deleteZeroOrOneByCk(connection, this, ck);
    }
    deleteZeroOrOneByPk (
        this : Extract<this, DeletableTable & TableWithPk>,
        connection : IConnection,
        pk : PrimaryKey<Extract<this, DeletableTable & TableWithPk>>
    ) : (
        Promise<DeleteZeroOrOneResult>
    ) {
        return DeleteUtil.deleteZeroOrOneByPk(connection, this, pk);
    }
    deleteZeroOrOneBySk (
        this : Extract<this, DeletableTable> & TableUtil.AssertHasCandidateKey<this>,
        connection : IConnection,
        sk : SuperKey<Extract<this, DeletableTable>>
    ) : (
        Promise<DeleteZeroOrOneResult>
    ) {
        return DeleteUtil.deleteZeroOrOneBySk(connection, this, sk);
    }
}