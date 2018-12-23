import * as sd from "schema-decorator";
import {escapeId} from "sqlstring";
import {IAnonymousTypedColumn} from "../column";
import {CandidateKey} from "../candidate-key";
import {AliasedTableData, AliasedTable, IAliasedTable} from "../aliased-table";
import {ColumnMapUtil} from "../column-map";
import {ColumnMap} from "../column-map";
import {CandidateKeyArrayUtil} from "../candidate-key-array";
import {ToUnknownIfAllFieldsNever} from "../type";
import {AssertMap} from "../assert-map";
import {ColumnUtil} from "../column";
import {TypeMapUtil} from "../type-map";
import {StringArrayUtil} from "../string-array";
import {QueryTree} from "../query-tree";

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
    readonly candidateKeys : CandidateKey[];

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
                column : sd.nullable(sd.naturalNumber())
            }
        );

        t1.isNullable is now ["column"] because
        "column" is is nullable.

        const t2 = t1.addColumns({
            column : sd.naturalNumber()
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
    readonly candidateKeys : DataT["candidateKeys"];

    readonly generated : DataT["generated"];
    readonly isNullable : DataT["isNullable"];
    readonly hasExplicitDefaultValue : DataT["hasExplicitDefaultValue"];
    readonly mutable : DataT["mutable"];

    readonly parents : DataT["parents"];
    readonly insertAllowed : DataT["insertAllowed"];
    readonly deleteAllowed : DataT["deleteAllowed"];
}

export class Table<DataT extends TableData> implements ITable<DataT> {
    readonly usedRef : DataT["usedRef"];
    readonly alias : DataT["alias"];
    readonly columns : DataT["columns"];

    readonly unaliasedQuery : QueryTree;

    readonly autoIncrement : DataT["autoIncrement"];
    readonly id : DataT["id"];
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
        this.candidateKeys = data.candidateKeys;

        this.generated = data.generated;
        this.isNullable = data.isNullable;
        this.hasExplicitDefaultValue = data.hasExplicitDefaultValue;
        this.mutable = data.mutable;

        this.parents = data.parents;
        this.insertAllowed = data.insertAllowed;
        this.deleteAllowed = data.deleteAllowed;
    }

    as<NewAliasT extends string> (newAlias : NewAliasT) : Table.As<this, NewAliasT> {
        return Table.as(this, newAlias);
    }

    //A cache to re-use the assert delegate
    private cachedCandidateKeyAssertDelegate : (
        undefined |
        Table.CandidateKeyAssertDelegate<this>
    );
    candidateKeyAssertDelegate () : Table.CandidateKeyAssertDelegate<this> {
        if (this.cachedCandidateKeyAssertDelegate == undefined) {
            this.cachedCandidateKeyAssertDelegate = (
                Table.candidateKeyAssertDelegate(this)
            );
        }
        return this.cachedCandidateKeyAssertDelegate;
    }
    //A cache to re-use the assert delegate
    private cachedSuperKeyAssertDelegate : (
        undefined |
        Table.SuperKeyAssertDelegate<this>
    );
    superKeyAssertDelegate () : Table.SuperKeyAssertDelegate<this> {
        if (this.cachedSuperKeyAssertDelegate == undefined) {
            this.cachedSuperKeyAssertDelegate = (
                Table.superKeyAssertDelegate(this)
            );
        }
        return this.cachedSuperKeyAssertDelegate;
    }

    setName<NewNameT extends string>(
        newName : NewNameT
    ) : Table.SetName<this, NewNameT> {
        return Table.setName(this, newName);
    }

    addColumns<
        FieldsT extends sd.AnyField[]
    > (
        fields : FieldsT
    ) : (
        Table.AddColumnsFromFieldTuple<this, FieldsT>
    );
    addColumns<
        AssertMapT extends AssertMap
    > (
        assertMap : AssertMapT
    ) : (
        Table.AddColumnsFromAssertMap<this, AssertMapT>
    );
    addColumns (rawColumns : any) : any {
        return Table.addColumns(this, rawColumns);
    }

    setAutoIncrement<
        DelegateT extends Table.AutoIncrementDelegate<this["columns"]>
    > (
        delegate : DelegateT
    ) : Table.SetAutoIncrement<this, DelegateT> {
        return Table.setAutoIncrement(this, delegate);
    }
    setId<
        DelegateT extends Table.IdDelegate<this["columns"]>
    > (
        this : ITable<DataT & { id : undefined }>,
        delegate : DelegateT
    ) : (
        Table.SetId<this & { id : undefined }, DelegateT>
    ) {
        return Table.setId(this, delegate);
    }
    /*
        TODO-FEATURE Adding a candidate key that is a super-set of
        an existing candidate key should throw an error,
        both during compile-time and run-time.

        Candidate keys should be as small as possible.
    */
    addCandidateKey<
        DelegateT extends Table.CandidateKeyDelegate<this>
    > (
        delegate : DelegateT
    ) : (
        Table.AddCandidateKey<this, DelegateT>
    ) {
        return Table.addCandidateKey(this, delegate);
    }
    setGenerated<
        DelegateT extends Table.GeneratedDelegate<this>
    > (
        delegate : DelegateT
    ) : (
        Table.SetGenerated<this, DelegateT>
    ) {
        return Table.setGenerated(this, delegate);
    }
    setHasExplicitDefaultValue<
        DelegateT extends Table.HasExplicitDefaultValueDelegate<this>
    > (
        delegate : DelegateT
    ) : (
        Table.SetHasExplicitDefaultValue<this, DelegateT>
    ) {
        return Table.setHasExplicitDefaultValue(this, delegate);
    }
    setImmutable () : Table.SetImmutable<this> {
        return Table.setImmutable(this);
    }
    overwriteMutable<
        DelegateT extends Table.MutableDelegate<this>
    > (
        delegate : DelegateT
    ) : (
        Table.OverwriteMutable<this, DelegateT>
    ) {
        return Table.overwriteMutable(this, delegate);
    }
    addParent<
        ParentT extends ITable
    > (
        parent : Table.Parent<this, ParentT>
    ) : (
        Table.AddParent<this, ParentT>
    ) {
        return Table.addParent<this, ParentT>(this, parent);
    }
    disallowInsert () : Table.DisallowInsert<this> {
        return Table.disallowInsert(this);
    }
    disallowDelete () : Table.DisallowDelete<this> {
        return Table.disallowDelete(this);
    }
}
export namespace Table {
    export type As<TableT extends ITable, NewAliasT extends string> = (
        AliasedTable<{
            readonly usedRef : TableT["usedRef"];
            readonly alias : NewAliasT;
            readonly columns : ColumnMapUtil.WithTableAlias<
                TableT["columns"],
                NewAliasT
            >;
        }>
    );
    export function as<TableT extends ITable, NewAliasT extends string> (
        {
            usedRef,
            columns,
            unaliasedQuery,
        } : TableT,
        newAlias : NewAliasT
    ) : (
        As<TableT, NewAliasT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns2 : TableT["columns"] = columns;
        return new AliasedTable(
            {
                usedRef : usedRef,
                alias : newAlias,
                columns : ColumnMapUtil.withTableAlias(
                    columns2,
                    newAlias
                ),
            },
            {unaliasedQuery}
        );
    }
}
export namespace Table {
    export type SetName<TableT extends ITable, NewNameT extends string> = (
        Table<{
            readonly usedRef : TableT["usedRef"];
            readonly alias : NewNameT;
            readonly columns : ColumnMapUtil.WithTableAlias<
                TableT["columns"],
                NewNameT
            >;

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly isNullable : TableT["isNullable"];
            readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
            readonly mutable : TableT["mutable"];

            readonly parents : TableT["parents"];
            readonly insertAllowed : TableT["insertAllowed"];
            readonly deleteAllowed : TableT["deleteAllowed"];
        }>
    );
    //TODO-FEATURE Change this to setAlias?
    export function setName<TableT extends ITable, NewNameT extends string> (
        table : TableT,
        newName : NewNameT
    ) : (
        SetName<TableT, NewNameT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns : TableT["columns"] = table.columns;

        const {
            usedRef,
            autoIncrement,
            id,
            candidateKeys,

            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,

            parents,
            insertAllowed,
            deleteAllowed,
        } = table;

        return new Table(
            {
                usedRef,
                alias : newName,
                columns : ColumnMapUtil.withTableAlias(
                    columns,
                    newName
                ),

                autoIncrement,
                id,
                candidateKeys,

                generated,
                isNullable,
                hasExplicitDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            {
                unaliasedQuery : escapeId(newName),
            }
        );
    }
}
export namespace Table {
    export type AddColumnsFromFieldTuple<
        TableT extends ITable,
        FieldsT extends sd.AnyField[]
    > = (
        Table<{
            readonly usedRef : TableT["usedRef"];
            readonly alias : TableT["alias"];
            readonly columns : ColumnMapUtil.Intersect<
                TableT["columns"],
                ColumnMapUtil.FromFieldArray<TableT["alias"], FieldsT>
            >;

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly isNullable : ColumnUtil.Name.NullableFromColumnMap<
                ColumnMapUtil.Intersect<
                    TableT["columns"],
                    ColumnMapUtil.FromFieldArray<TableT["alias"], FieldsT>
                >
            >[];
            readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
            /*
                TODO-DEBATE Debate whether new columns should be mutable
            */
            readonly mutable : TableT["mutable"];

            readonly parents : TableT["parents"];
            readonly insertAllowed : TableT["insertAllowed"];
            readonly deleteAllowed : TableT["deleteAllowed"];
        }>
    );
    export function addColumnsFromFieldTuple<
        TableT extends ITable,
        FieldsT extends sd.AnyField[]
    > (
        table : TableT,
        fields : FieldsT
    ) : (
        AddColumnsFromFieldTuple<TableT, FieldsT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const tableColumns: TableT["columns"] = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columnMapFromFieldArray : (
            ColumnMapUtil.FromFieldArray<TableT["alias"], FieldsT>
        ) = ColumnMapUtil.fromFieldArray(table.alias, fields);
        const columns : ColumnMapUtil.Intersect<
            TableT["columns"],
            ColumnMapUtil.FromFieldArray<TableT["alias"], FieldsT>
        > = ColumnMapUtil.intersect(
            tableColumns,
            columnMapFromFieldArray
        );
        const isNullable = ColumnUtil.Name.Array.nullableFromColumnMap(columns);

        const {
            usedRef,
            alias,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            hasExplicitDefaultValue,
            mutable,

            parents,
            insertAllowed,
            deleteAllowed,

            unaliasedQuery,
        } = table;

        const result : AddColumnsFromFieldTuple<TableT, FieldsT> = new Table(
            {
                usedRef,
                alias,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                isNullable,
                hasExplicitDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            {unaliasedQuery}
        );
        return result;
    }
}
export namespace Table {
    export type AddColumnsFromAssertMap<
        TableT extends ITable,
        AssertMapT extends AssertMap
    > = (
        Table<{
            readonly usedRef : TableT["usedRef"];
            readonly alias : TableT["alias"];
            readonly columns : ColumnMapUtil.Intersect<
                TableT["columns"],
                ColumnMapUtil.FromAssertMap<TableT["alias"], AssertMapT>
            >;

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly isNullable : ColumnUtil.Name.NullableFromColumnMap<
                ColumnMapUtil.Intersect<
                    TableT["columns"],
                    ColumnMapUtil.FromAssertMap<TableT["alias"], AssertMapT>
                >
            >[];
            readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
            /*
                TODO-DEBATE Debate whether new columns should be mutable
            */
            readonly mutable : TableT["mutable"];

            readonly parents : TableT["parents"];
            readonly insertAllowed : TableT["insertAllowed"];
            readonly deleteAllowed : TableT["deleteAllowed"];
        }>
    );
    export function addColumnsFromAssertMap<
        TableT extends ITable,
        AssertMapT extends AssertMap
    > (
        table : TableT,
        assertMap : AssertMapT
    ) : (
        AddColumnsFromAssertMap<TableT, AssertMapT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const tableColumns: TableT["columns"] = table.columns;
        const columns : ColumnMapUtil.Intersect<
            TableT["columns"],
            ColumnMapUtil.FromAssertMap<TableT["alias"], AssertMapT>
        > = ColumnMapUtil.intersect(
            tableColumns,
            ColumnMapUtil.fromAssertMap(table.alias, assertMap)
        );
        const isNullable = ColumnUtil.Name.Array.nullableFromColumnMap(columns);

        const {
            usedRef,
            alias,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            hasExplicitDefaultValue,
            mutable,

            parents,
            insertAllowed,
            deleteAllowed,

            unaliasedQuery,
        } = table;

        const result : AddColumnsFromAssertMap<TableT, AssertMapT> = new Table(
            {
                usedRef,
                alias,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                isNullable,
                hasExplicitDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            {unaliasedQuery}
        );
        return result;
    }
}
export namespace Table {
    export function addColumns<
        TableT extends ITable,
        FieldsT extends sd.AnyField[]
    > (
        table : TableT,
        fields : FieldsT
    ) : (
        AddColumnsFromFieldTuple<TableT, FieldsT>
    );
    export function addColumns<
        TableT extends ITable,
        AssertMapT extends AssertMap
    > (
        table : TableT,
        assertMap : AssertMapT
    ) : (
        AddColumnsFromAssertMap<TableT, AssertMapT>
    );
    export function addColumns (table : ITable, rawColumns : any) {
        if (rawColumns instanceof Array) {
            return addColumnsFromFieldTuple(table, rawColumns);
        } else {
            return addColumnsFromAssertMap(table, rawColumns);
        }
    }
}
export namespace Table {
    export type CandidateKey<TableT extends ITable> = (
        TypeMapUtil.UnionFromCandidateKeyArray<
            TableT["candidateKeys"],
            TableT["columns"]
        >
    );
    export type CandidateKeyAssertDelegate<TableT extends ITable> = (
        TypeMapUtil.AssertDelegateFromCandidateKeyArray<
            TableT["candidateKeys"],
            TableT["columns"]
        >
    );
    export function candidateKeyAssertDelegate<TableT extends ITable> (
        table : TableT
    ) : (
        CandidateKeyAssertDelegate<TableT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const candidateKeys : TableT["candidateKeys"] = table.candidateKeys;
        const columns : TableT["columns"] = table.columns;
        return TypeMapUtil.assertDelegateFromCandidateKeyArray(
            candidateKeys,
            columns
        );
    }
    export type SuperKey<TableT extends ITable> = (
        TypeMapUtil.SuperKeyUnionFromCandidateKeyArray<
            TableT["candidateKeys"],
            TableT["columns"]
        >
    );
    export type SuperKeyAssertDelegate<TableT extends ITable> = (
        TypeMapUtil.SuperKeyAssertDelegateFromCandidateKeyArray<
            TableT["candidateKeys"],
            TableT["columns"]
        >
    );
    export function superKeyAssertDelegate<TableT extends ITable> (
        table : TableT
    ) : (
        SuperKeyAssertDelegate<TableT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const candidateKeys : TableT["candidateKeys"] = table.candidateKeys;
        const columns : TableT["columns"] = table.columns;
        return TypeMapUtil.superKeyAssertDelegateFromCandidateKeyArray(
            candidateKeys,
            columns
        );
    }
}
export namespace Table {
    //Auto-increment columns cannot be nullable
    //The `number|string|bigint` requirement is only a compile-time constraint
    //TODO-DEBATE Consider having run-time checks to see if it allows 1,2,3,4,5,... ?
    export type AutoIncrementColumnMap<ColumnMapT extends ColumnMap> = (
        {
            [columnName in {
                [columnName in keyof ColumnMapT] : (
                    ColumnMapT[columnName] extends IAnonymousTypedColumn<number|string|bigint> ?
                    columnName :
                    never
                )
            }[keyof ColumnMapT]] : (
                ColumnMapT[columnName]
            )
        }
    );
    export type AutoIncrementDelegate<ColumnMapT extends ColumnMap> = (
        (columnMap : AutoIncrementColumnMap<ColumnMapT>) => (
            AutoIncrementColumnMap<ColumnMapT>[
                keyof AutoIncrementColumnMap<ColumnMapT>
            ]
        )
    );
    //Technically, "set" is the wrong verb to use.
    //This creates an entirely new Table.
    export type SetAutoIncrement<
        TableT extends ITable,
        DelegateT extends AutoIncrementDelegate<TableT["columns"]>
    > = (
        Table<{
            readonly usedRef : TableT["usedRef"];
            readonly alias : TableT["alias"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : ReturnType<DelegateT>["name"];
            readonly id : ReturnType<DelegateT>["name"];
            readonly candidateKeys : (
                TableT["candidateKeys"][number] |
                (ReturnType<DelegateT>["name"][])
            )[];

            readonly generated : (
                TableT["generated"][number] |
                ReturnType<DelegateT>["name"]
            )[];
            readonly isNullable : TableT["isNullable"];
            readonly hasExplicitDefaultValue : (
                TableT["hasExplicitDefaultValue"][number] |
                ReturnType<DelegateT>["name"]
            )[];
            //Generated columns cannot be mutable
            readonly mutable : Exclude<
                TableT["mutable"][number],
                ReturnType<DelegateT>["name"]
            >[];

            readonly parents : TableT["parents"];
            readonly insertAllowed : TableT["insertAllowed"];
            readonly deleteAllowed : TableT["deleteAllowed"];
        }>
    );
    export function setAutoIncrement<
        TableT extends ITable,
        DelegateT extends AutoIncrementDelegate<TableT["columns"]>
    > (
        table : TableT,
        delegate : DelegateT
    ) : (
        SetAutoIncrement<TableT, DelegateT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns : TableT["columns"] = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/24277
        const autoIncrement : ReturnType<DelegateT> = delegate(columns) as any;

        ColumnMapUtil.assertHasColumnIdentifier(table.columns, autoIncrement);
        const candidateKeys : (
            TableT["candidateKeys"][number] |
            (ReturnType<DelegateT>["name"][])
        )[] = StringArrayUtil.uniqueStringArray(
            table.candidateKeys.concat([
                [autoIncrement.name]
            ])
        );

        const generated : (
            TableT["generated"][number] |
            ReturnType<DelegateT>["name"]
        )[] = (table.generated.indexOf(autoIncrement.name) >= 0) ?
            table.generated :
            [
                ...table.generated,
                autoIncrement.name
            ];
        const hasExplicitDefaultValue : (
            TableT["hasExplicitDefaultValue"][number] |
            ReturnType<DelegateT>["name"]
        )[] = (table.hasExplicitDefaultValue.indexOf(autoIncrement.name) >= 0) ?
            table.hasExplicitDefaultValue :
            [
                ...table.hasExplicitDefaultValue,
                autoIncrement.name,
            ];
        const mutable : Exclude<
            TableT["mutable"][number],
            ReturnType<DelegateT>["name"]
        >[] = table.mutable.filter(
            (columnName) : columnName is Exclude<
                TableT["mutable"][number],
                ReturnType<DelegateT>["name"]
            > => {
                return (columnName != autoIncrement.name);
            }
        );
        const {
            usedRef,
            alias,
            isNullable,
            parents,
            insertAllowed,
            deleteAllowed,

            unaliasedQuery,
        } = table;

        const result : SetAutoIncrement<TableT, DelegateT> = new Table(
            {
                usedRef,
                alias,
                columns,

                autoIncrement : autoIncrement.name,
                id : autoIncrement.name,
                candidateKeys,

                generated,
                isNullable,
                hasExplicitDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            {unaliasedQuery}
        );
        return result;
    }
}
export namespace Table {
    export type IdDelegate<
        ColumnMapT extends ColumnMap
    > = (
        (columnMap : ColumnMapT) => (
            ColumnMapT[string]
        )
    );
    //Technically, "set" is the wrong verb to use.
    //This creates an entirely new Table.
    export type SetId<
        TableT extends ITable<TableData & { id : undefined }>,
        DelegateT extends IdDelegate<TableT["columns"]>
    > = (
        Table<{
            readonly usedRef : TableT["usedRef"];
            readonly alias : TableT["alias"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : ReturnType<DelegateT>["name"];
            readonly candidateKeys : (
                TableT["candidateKeys"][number] |
                (ReturnType<DelegateT>["name"][])
            )[];

            readonly generated : TableT["generated"];
            readonly isNullable : TableT["isNullable"];
            readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
            readonly mutable : TableT["mutable"];

            readonly parents : TableT["parents"];
            readonly insertAllowed : TableT["insertAllowed"];
            readonly deleteAllowed : TableT["deleteAllowed"];
        }>
    );
    export function setId<
        TableT extends ITable<TableData & { id : undefined }>,
        DelegateT extends IdDelegate<TableT["columns"]>
    > (
        table : TableT,
        delegate : DelegateT
    ) : (
        SetId<TableT, DelegateT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns : TableT["columns"] = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/24277
        const id : ReturnType<DelegateT> = delegate(columns) as any;

        ColumnMapUtil.assertHasColumnIdentifier(table.columns, id);
        const candidateKeys : (
            TableT["candidateKeys"][number] |
            (ReturnType<DelegateT>["name"][])
        )[] = table.candidateKeys.concat([
            [id.name]
        ]);

        const {
            usedRef,
            alias,
            autoIncrement,
            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,

            unaliasedQuery,
        } = table;

        const result : SetId<TableT, DelegateT> = new Table(
            {
                usedRef,
                alias,
                columns,

                autoIncrement,
                id : id.name,
                candidateKeys,

                generated,
                isNullable,
                hasExplicitDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            {unaliasedQuery}
        );
        return result;
    }
}
export namespace Table {
    export type CandidateKeyDelegate<
        TableT extends ITable
    > = (
        (columnMap : TableT["columns"]) => (
            TableT["columns"][string][]
        )
    );
    //Technically, "add" is the wrong verb to use.
    //This creates an entirely new Table.
    export type AddCandidateKey<
        TableT extends ITable,
        DelegateT extends CandidateKeyDelegate<TableT>
    > = (
        Table<{
            readonly usedRef : TableT["usedRef"];
            readonly alias : TableT["alias"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : (
                TableT["candidateKeys"][number] |
                (ReturnType<DelegateT>[number]["name"][])
            )[];

            readonly generated : TableT["generated"];
            readonly isNullable : TableT["isNullable"];
            readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
            readonly mutable : TableT["mutable"];

            readonly parents : TableT["parents"];
            readonly insertAllowed : TableT["insertAllowed"];
            readonly deleteAllowed : TableT["deleteAllowed"];
        }>
    );
    export function addCandidateKey<
        TableT extends ITable,
        DelegateT extends CandidateKeyDelegate<TableT>
    > (
        table : TableT,
        delegate : DelegateT
    ) : (
        AddCandidateKey<TableT, DelegateT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns : TableT["columns"] = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/24277
        const candidateKeyColumns : ReturnType<DelegateT> = delegate(columns) as any;

        for (let candidateKeyColumn of candidateKeyColumns) {
            ColumnMapUtil.assertHasColumnIdentifier(table.columns, candidateKeyColumn);
        }

        const candidateKeys : (
            TableT["candidateKeys"][number] |
            (ReturnType<DelegateT>[number]["name"][])
        )[] = StringArrayUtil.uniqueStringArray(
            table.candidateKeys.concat([
                candidateKeyColumns.map(
                    candidateKeyColumn => candidateKeyColumn.name
                )
            ])
        );

        const {
            usedRef,
            alias,

            autoIncrement,
            id,

            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,

            parents,
            insertAllowed,
            deleteAllowed,

            unaliasedQuery,
        } = table;

        const result : AddCandidateKey<TableT, DelegateT> = new Table(
            {
                usedRef,
                alias,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                isNullable,
                hasExplicitDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            {unaliasedQuery}
        );
        return result;
    }
}
export namespace Table {
    export type GeneratedColumnMap<
        ColumnMapT extends ColumnMap,
        GeneratedT extends string[]
    > = (
        {
            [columnName in Exclude<keyof ColumnMapT, GeneratedT[number]>] : (
                ColumnMapT[columnName]
            )
        }
    );
    export type GeneratedDelegate<
        TableT extends ITable
    > = (
        (columnMap : GeneratedColumnMap<TableT["columns"], TableT["generated"]>) => (
            GeneratedColumnMap<TableT["columns"], TableT["generated"]>[
                keyof GeneratedColumnMap<TableT["columns"], TableT["generated"]>
            ][]
        )
    );
    //Technically, "set" is the wrong verb to use.
    //This creates an entirely new Table.
    export type SetGenerated<
        TableT extends ITable,
        DelegateT extends GeneratedDelegate<TableT>
    > = (
        Table<{
            readonly usedRef : TableT["usedRef"];
            readonly alias : TableT["alias"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : (
                TableT["generated"][number] |
                ReturnType<DelegateT>[number]["name"]
            )[];
            readonly isNullable : TableT["isNullable"];
            readonly hasExplicitDefaultValue : (
                TableT["hasExplicitDefaultValue"][number] |
                ReturnType<DelegateT>[number]["name"]
            )[];
            //Generated columns cannot be mutable
            readonly mutable : Exclude<
                TableT["mutable"][number],
                ReturnType<DelegateT>[number]["name"]
            >[];

            readonly parents : TableT["parents"];
            readonly insertAllowed : TableT["insertAllowed"];
            readonly deleteAllowed : TableT["deleteAllowed"];
        }>
    );
    export function setGenerated<
        TableT extends ITable,
        DelegateT extends GeneratedDelegate<TableT>
    > (
        table : TableT,
        delegate : DelegateT
    ) : (
        SetGenerated<TableT, DelegateT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns : TableT["columns"] = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/24277
        const generatedColumns : ReturnType<DelegateT> = delegate(columns) as any;

        for (let generatedColumn of generatedColumns) {
            if (table.generated.indexOf(generatedColumn.name) >= 0) {
                throw new Error(`Column ${table.alias}.${generatedColumn.name} already declared generated`);
            }
            ColumnMapUtil.assertHasColumnIdentifier(table.columns, generatedColumn);
        }
        const generated : (
            TableT["generated"][number] |
            ReturnType<DelegateT>[number]["name"]
        )[] = StringArrayUtil.uniqueString(
            [
                ...table.generated,
                ...generatedColumns.map(column => column.name),
            ]
        );
        const hasExplicitDefaultValue : (
            TableT["hasExplicitDefaultValue"][number] |
            ReturnType<DelegateT>[number]["name"]
        )[] = StringArrayUtil.uniqueString(
            [
                ...table.hasExplicitDefaultValue,
                ...generatedColumns.map(column => column.name),
            ]
        );
        const mutable : Exclude<
            TableT["mutable"][number],
            ReturnType<DelegateT>[number]["name"]
        >[] = StringArrayUtil.uniqueString(
            table.mutable.filter(
                (columnName) : columnName is Exclude<
                    TableT["mutable"][number],
                    ReturnType<DelegateT>[number]["name"]
                > => {
                    return generatedColumns.every(
                        column => column.name != columnName
                    );
                }
            )
        );

        const {
            usedRef,
            alias,

            autoIncrement,
            id,
            candidateKeys,

            isNullable,

            parents,
            insertAllowed,
            deleteAllowed,

            unaliasedQuery,
        } = table;

        const result : SetGenerated<TableT, DelegateT> = new Table(
            {
                usedRef,
                alias,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                isNullable,
                hasExplicitDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            {unaliasedQuery}
        );
        return result;
    }
}
export namespace Table {
    export type HasExplicitDefaultValueColumnMap<
        ColumnMapT extends ColumnMap,
        HasExplicitDefaultValueT extends string[]
    > = (
        {
            [columnName in Exclude<keyof ColumnMapT, HasExplicitDefaultValueT[number]>] : (
                ColumnMapT[columnName]
            )
        }
    );
    export type HasExplicitDefaultValueDelegate<
        TableT extends ITable
    > = (
        (columnMap : HasExplicitDefaultValueColumnMap<TableT["columns"], TableT["hasExplicitDefaultValue"]>) => (
            HasExplicitDefaultValueColumnMap<TableT["columns"], TableT["hasExplicitDefaultValue"]>[
                keyof HasExplicitDefaultValueColumnMap<TableT["columns"], TableT["hasExplicitDefaultValue"]>
            ][]
        )
    );
    //Technically, "set" is the wrong verb to use.
    //This creates an entirely new Table.
    export type SetHasExplicitDefaultValue<
        TableT extends ITable,
        DelegateT extends HasExplicitDefaultValueDelegate<TableT>
    > = (
        Table<{
            readonly usedRef : TableT["usedRef"];
            readonly alias : TableT["alias"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly isNullable : TableT["isNullable"];
            readonly hasExplicitDefaultValue : (
                TableT["hasExplicitDefaultValue"][number] |
                ReturnType<DelegateT>[number]["name"]
            )[];
            readonly mutable : TableT["mutable"];

            readonly parents : TableT["parents"];
            readonly insertAllowed : TableT["insertAllowed"];
            readonly deleteAllowed : TableT["deleteAllowed"];
        }>
    );
    export function setHasExplicitDefaultValue<
        TableT extends ITable,
        DelegateT extends HasExplicitDefaultValueDelegate<TableT>
    > (
        table : TableT,
        delegate : DelegateT
    ) : (
        SetHasExplicitDefaultValue<TableT, DelegateT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns : TableT["columns"] = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/24277
        const hasExplicitDefaultValueColumns : ReturnType<DelegateT> = delegate(columns) as any;

        for (let hasExplicitDefaultValueColumn of hasExplicitDefaultValueColumns) {
            if (table.hasExplicitDefaultValue.indexOf(hasExplicitDefaultValueColumn.name) >= 0) {
                throw new Error(`Column ${table.alias}.${hasExplicitDefaultValueColumn.name} already declared as having a default value`);
            }
            ColumnMapUtil.assertHasColumnIdentifier(table.columns, hasExplicitDefaultValueColumn);
        }
        const hasExplicitDefaultValue : (
            TableT["hasExplicitDefaultValue"][number] |
            ReturnType<DelegateT>[number]["name"]
        )[] = StringArrayUtil.uniqueString(
            [
                ...table.hasExplicitDefaultValue,
                ...hasExplicitDefaultValueColumns.map(column => column.name),
            ]
        );

        const {
            usedRef,
            alias,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            isNullable,
            mutable,

            parents,
            insertAllowed,
            deleteAllowed,

            unaliasedQuery,
        } = table;

        const result : SetHasExplicitDefaultValue<TableT, DelegateT> = new Table(
            {
                usedRef,
                alias,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                isNullable,
                hasExplicitDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            {unaliasedQuery}
        );
        return result;
    }
}
export namespace Table {
    export type SetImmutable<TableT extends ITable> = (
        Table<{
            readonly usedRef : TableT["usedRef"];
            readonly alias : TableT["alias"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly isNullable : TableT["isNullable"];
            readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
            readonly mutable : [];

            readonly parents : TableT["parents"];
            readonly insertAllowed : TableT["insertAllowed"];
            readonly deleteAllowed : TableT["deleteAllowed"];
        }>
    );
    export function setImmutable<TableT extends ITable> (table : TableT) : (
        SetImmutable<TableT>
    ) {
        const {
            usedRef,
            alias,
            columns,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            isNullable,
            hasExplicitDefaultValue,

            parents,
            insertAllowed,
            deleteAllowed,

            unaliasedQuery,
        } = table;

        return new Table(
            {
                usedRef,
                alias,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                isNullable,
                hasExplicitDefaultValue,
                mutable : [] as [],

                parents,
                insertAllowed,
                deleteAllowed,
            },
            {unaliasedQuery}
        );
    }
}
export namespace Table {
    //Generated keys cannot be mutable
    export type MutableColumnMap<
        ColumnMapT extends ColumnMap,
        GeneratedT extends string[]
    > = (
        {
            [columnName in Exclude<keyof ColumnMapT, GeneratedT[number]>] : (
                ColumnMapT[columnName]
            )
        }
    );
    export type MutableDelegate<
        TableT extends ITable
    > = (
        (columnMap : MutableColumnMap<TableT["columns"], TableT["generated"]>) => (
            MutableColumnMap<TableT["columns"], TableT["generated"]>[
                keyof MutableColumnMap<TableT["columns"], TableT["generated"]>
            ][]
        )
    );
    /*
        TODO-FEATURE Implement addMutable(), removeMutable() ?
    */
    //Technically, "overwrite" is the wrong verb to use.
    //This creates an entirely new Table.
    export type OverwriteMutable<
        TableT extends ITable,
        DelegateT extends MutableDelegate<TableT>
    > = (
        Table<{
            readonly usedRef : TableT["usedRef"];
            readonly alias : TableT["alias"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly isNullable : TableT["isNullable"];
            readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
            readonly mutable : ReturnType<DelegateT>[number]["name"][];

            readonly parents : TableT["parents"];
            readonly insertAllowed : TableT["insertAllowed"];
            readonly deleteAllowed : TableT["deleteAllowed"];
        }>
    );
    export function overwriteMutable<
        TableT extends ITable,
        DelegateT extends MutableDelegate<TableT>
    > (
        table : TableT,
        delegate : DelegateT
    ) : (
        OverwriteMutable<TableT, DelegateT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns : TableT["columns"] = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/24277
        const mutableColumns : ReturnType<DelegateT> = delegate(columns) as any;

        for (let mutableColumn of mutableColumns) {
            if (table.generated.indexOf(mutableColumn.name) >= 0) {
                throw new Error(`Column ${table.alias}.${mutableColumn.name} is generated and cannot be mutable`);
            }
            ColumnMapUtil.assertHasColumnIdentifier(table.columns, mutableColumn);
        }

        //TODO-FEATURE Make other arrays of strings always
        //have unique elements?
        const mutable : ReturnType<DelegateT>[number]["name"][] = (
            StringArrayUtil.uniqueString(
                mutableColumns.map(column => column.name)
            )
        );

        const {
            usedRef,
            alias,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            isNullable,
            hasExplicitDefaultValue,

            parents,
            insertAllowed,
            deleteAllowed,

            unaliasedQuery,
        } = table;

        const result : OverwriteMutable<TableT, DelegateT> = new Table(
            {
                usedRef,
                alias,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                isNullable,
                hasExplicitDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            {unaliasedQuery}
        );
        return result;
    }
}
export namespace Table {
    export type Parent<
        TableT extends ITable,
        ParentT extends ITable
    > = (
        ParentT &
        (
            CandidateKeyArrayUtil.CommonCandidateKeyUnion<
                TableT["candidateKeys"],
                ParentT["candidateKeys"]
            > extends never ?
            [
                "No common candidate keys found between table and parent",
                "Candidate keys: ",
                TableT["candidateKeys"][number],
                "Parent candidate keys: ",
                ParentT["candidateKeys"][number]
            ]|void :
            unknown
        ) &
        (
            //TODO-FEATURE Recursively find incompatible types
            ToUnknownIfAllFieldsNever<
                {
                    [columnName in Extract<
                        keyof TableT["columns"],
                        keyof ParentT["columns"]
                    >] : (
                        ReturnType<TableT["columns"][columnName]["assertDelegate"]> extends
                        ReturnType<ParentT["columns"][columnName]["assertDelegate"]> ?
                            never :
                            [
                                "Column",
                                columnName,
                                "has incompatible types",
                                ReturnType<TableT["columns"][columnName]["assertDelegate"]>,
                                ReturnType<ParentT["columns"][columnName]["assertDelegate"]>
                            ]|void
                    )
                }
            >
        ) &
        (
            ParentT["alias"] extends TableT["alias"] ?
            "Parent cannot have same alias as table"|void :
            unknown
        ) &
        (
            ParentT["alias"] extends TableT["parents"][number]["alias"] ?
            "Parent already added to table"|void :
            unknown
        )
    );
    export type AddParent<
        TableT extends ITable,
        ParentT extends ITable
    > = (
        Table<{
            readonly usedRef : TableT["usedRef"];
            readonly alias : TableT["alias"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly isNullable : TableT["isNullable"];
            readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
            readonly mutable : TableT["hasExplicitDefaultValue"];

            readonly parents : (
                TableT["parents"][number] |
                ParentT["parents"][number] |
                ParentT
            )[];
            readonly insertAllowed : TableT["insertAllowed"];
            readonly deleteAllowed : TableT["deleteAllowed"];
        }>
    );
    //+ Must share at least one unique key
    //+ Duplicate columns must be assignable from child to parent
    //  Example: child.type = "red"|"blue", parent.type = "red"|"blue"|"green"
    //+ No duplicates
    export function addParent<
        TableT extends ITable,
        ParentT extends ITable
    > (
        table : TableT,
        parent : Parent<TableT, ParentT>
    ) : (
        AddParent<TableT, ParentT>
    ) {
        if (!CandidateKeyArrayUtil.hasCommonCandidateKeys(
            table.candidateKeys,
            parent.candidateKeys
        )) {
            throw new Error(`No common candidate keys found between table ${table.alias} and parent ${parent.alias}`);
        };
        if (table.alias == parent.alias) {
            throw new Error(`Parent ${table.alias} cannot have same alias as table`);
        }
        for (let otherParent of table.parents) {
            if (otherParent.alias == parent.alias) {
                throw new Error(`Parent ${parent.alias} already added to table`);
            }
        }
        //TODO-FEATURE Recursively find incompatible types
        for (let columnName in table.columns) {
            const parentColumn = parent.columns[columnName];
            if (parentColumn == undefined) {
                continue;
            }
            if (
                sd.isNullable(table.columns[columnName].assertDelegate) !=
                sd.isNullable(parentColumn.assertDelegate)
            ) {
                throw new Error(`Parent ${parent.alias}.${columnName} and ${table.alias}.${columnName} have incompatible types; one is nullable, the other is not`);
            }
        }

        const parents : (
            TableT["parents"][number] |
            ParentT["parents"][number] |
            ParentT
        )[] = [
            ...table.parents,
            ...parent.parents,
            parent
        ];

        const {
            usedRef,
            alias,
            columns,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,

            insertAllowed,
            deleteAllowed,

            unaliasedQuery,
        } = table;

        return new Table(
            {
                usedRef,
                alias,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                isNullable,
                hasExplicitDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            {unaliasedQuery}
        );
    }
}
export namespace Table {
    export type DisallowInsert<TableT extends ITable> = (
        Table<{
            readonly usedRef : TableT["usedRef"];
            readonly alias : TableT["alias"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly isNullable : TableT["isNullable"];
            readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
            readonly mutable : TableT["mutable"];

            readonly parents : TableT["parents"];
            readonly insertAllowed : false;
            readonly deleteAllowed : TableT["deleteAllowed"];
        }>
    );
    export function disallowInsert<TableT extends ITable> (table : TableT) : (
        DisallowInsert<TableT>
    ) {
        const {
            usedRef,
            alias,
            columns,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,

            parents,
            deleteAllowed,

            unaliasedQuery,
        } = table;

        return new Table(
            {
                usedRef,
                alias,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                isNullable,
                hasExplicitDefaultValue,
                mutable,

                parents,
                insertAllowed : false,
                deleteAllowed,
            },
            {unaliasedQuery}
        );
    }
    export type DisallowDelete<TableT extends ITable> = (
        Table<{
            readonly usedRef : TableT["usedRef"];
            readonly alias : TableT["alias"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly isNullable : TableT["isNullable"];
            readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
            readonly mutable : TableT["mutable"];

            readonly parents : TableT["parents"];
            readonly insertAllowed : TableT["insertAllowed"];
            readonly deleteAllowed : false;
        }>
    );
    export function disallowDelete<TableT extends ITable> (table : TableT) : (
        DisallowDelete<TableT>
    ) {
        const {
            usedRef,
            alias,
            columns,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,

            parents,
            insertAllowed,

            unaliasedQuery,
        } = table;

        return new Table(
            {
                usedRef,
                alias,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                isNullable,
                hasExplicitDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed : false,
            },
            {unaliasedQuery}
        );
    }
}
export namespace Table {
    //TODO-DEBATE Find better names
    export type PolymorphicColumnNameUnion<TableT extends ITable> = (
        (ColumnUtil.FromColumnMap<TableT["columns"]>["name"]) |
        (ColumnUtil.FromColumnMap<TableT["parents"][number]["columns"]>["name"])
    );
    export type PolymorphicGeneratedUnion<TableT extends ITable> = (
        (TableT["generated"][number])|
        (TableT["parents"][number]["generated"][number])
    );

}
/*
import {table} from "./instantiate";
import { FieldArrayUtil } from "../field-array";
const t = table(
    "test",
    {
        a : sd.number(),
        b : sd.string(),
        c : sd.boolean(),
        d : sd.date(),
        e : sd.buffer(),
        f : sd.nullable(sd.number())
    }
)
    .setId(c => c.c)
    .setAutoIncrement(c => c.a)
    .setGenerated(c => [
        //c.a,
        c.d
    ])
    .setHasExplicitDefaultValue(c => [
        c.e
    ])
    .addCandidateKey(c => [
        c.f,
        c.e
    ]);
t.autoIncrement
t.id
t.candidateKeys
t.generated
t.hasExplicitDefaultValue
t.mutable
const t2 = t.setImmutable();
t2.mutable
const t3 = t2.overwriteMutable(c => [
    c.c,
    c.e
]);
t3.mutable

const t4 = table(
    "test2",
    {
        a : sd.number(),
        b : sd.string(),
        e : sd.buffer(),
        f : sd.number(),
        n : sd.date(),
    }
)
.addCandidateKey(c => [
    c.f,
    c.e
])
.setGenerated(c => [c.n]);
const t5 = t4.addParent(t3);
//t4.addParent(t4);
//t5.addParent(t3)
t5.parents
const omg = t5.setName("omg");
omg;

declare const t5pcnu : Table.PolymorphicColumnNameUnion<typeof t5>;

const t6 = table(
    "test6",
    {
        a : sd.number(),
        b : sd.string(),
        e : sd.buffer(),
        f : sd.number(),
        x : sd.nullable(sd.date()),
        y : sd.nullable(sd.string()),
    }
)
.addCandidateKey(c => [
    c.f,
    c.e
])
.setAutoIncrement(c => c.f);

const t7 = t5.addParent(t6);
declare const errwe : Exclude<typeof t7["parents"][number], typeof t3>
declare const t7pcnu : Table.PolymorphicColumnNameUnion<typeof t7>;
declare const t7pgu : Table.PolymorphicGeneratedUnion<typeof t7>
const omg2 = omg.addColumns({
    g : sd.nullable(sd.boolean())
});
omg2.columns.g
omg2.hasExplicitDefaultValue

const omg3 = omg.addColumns([
    sd.field("g", sd.nullable(sd.boolean()))
]);
omg3.columns.g
omg3.hasExplicitDefaultValue
//*/