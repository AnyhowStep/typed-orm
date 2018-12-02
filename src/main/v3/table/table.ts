import * as sd from "schema-decorator";
import {IAnonymousTypedColumn} from "../column";
import {CandidateKey} from "../candidate-key";
import {AliasedTableData, AliasedTable} from "../aliased-table";
import {ColumnMapUtil} from "../column-map";
import {ColumnMap} from "../column-map";
import {CandidateKeyArrayUtil} from "../candidate-key-array";
import {SuperKeyArrayUtil} from "../super-key-array";
import {ToUnknownIfAllFieldsNever} from "../type";
import {AssertMap, AssertMapUtil} from "../assert-map";
import {FieldArrayUtil} from "../field-array";
import {Column} from "../column";

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
    //If a column is NOT nullable, but has a server default value,
    //like CURRENT_TIMESTAMP or some other value,
    //you will have to specify as such manually.
    //If a column is a GENERATED column, then it also has a server default value.
    //Columns with server default values are optional with INSERT statements.
    readonly hasDefaultValue : string[];
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

export interface ITable<DataT extends TableData=TableData> {
    readonly alias : DataT["alias"];
    readonly name  : DataT["name"];
    readonly columns : DataT["columns"];

    readonly __databaseName? : string|undefined;

    readonly autoIncrement : DataT["autoIncrement"];
    readonly id : DataT["id"];
    readonly candidateKeys : DataT["candidateKeys"];

    readonly generated : DataT["generated"];
    readonly hasDefaultValue : DataT["hasDefaultValue"];
    readonly mutable : DataT["mutable"];

    readonly parents : DataT["parents"];
    readonly insertAllowed : DataT["insertAllowed"];
    readonly deleteAllowed : DataT["deleteAllowed"];
}

export class Table<DataT extends TableData> implements ITable<DataT> {
    readonly alias : DataT["alias"];
    readonly name  : DataT["name"];
    readonly columns : DataT["columns"];

    readonly __databaseName? : string|undefined;

    readonly autoIncrement : DataT["autoIncrement"];
    readonly id : DataT["id"];
    readonly candidateKeys : DataT["candidateKeys"];

    readonly generated : DataT["generated"];
    readonly hasDefaultValue : DataT["hasDefaultValue"];
    readonly mutable : DataT["mutable"];

    readonly parents : DataT["parents"];
    readonly insertAllowed : DataT["insertAllowed"];
    readonly deleteAllowed : DataT["deleteAllowed"];

    constructor (
        data : DataT,
        __databaseName? : string|undefined
    ) {
        this.alias = data.alias;
        this.name = data.name;
        this.columns = data.columns;

        this.__databaseName = __databaseName;

        this.autoIncrement = data.autoIncrement;
        this.id = data.id;
        this.candidateKeys = data.candidateKeys;

        this.generated = data.generated;
        this.hasDefaultValue = data.hasDefaultValue;
        this.mutable = data.mutable;

        this.parents = data.parents;
        this.insertAllowed = data.insertAllowed;
        this.deleteAllowed = data.deleteAllowed;
    }

    queryStringTree () {
        return AliasedTable.queryStringTree(this);
    }

    as<NewAliasT extends string> (newAlias : NewAliasT) : Table.As<this, NewAliasT> {
        return Table.as(this, newAlias);
    }

    //TODO Maybe cache the assert delegate
    getCandidateKeyAssertDelegate () : Table.CandidateKeyAssertDelegate<this> {
        return Table.getCandidateKeyAssertDelegate(this);
    }
    //TODO Maybe cache the assert delegate
    getSuperKeyAssertDelegate () : Table.SuperKeyAssertDelegate<this> {
        return Table.getSuperKeyAssertDelegate(this);
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
    setHasDefaultValue<
        DelegateT extends Table.HasDefaultValueDelegate<this>
    > (
        delegate : DelegateT
    ) : (
        Table.SetHasDefaultValue<this, DelegateT>
    ) {
        return Table.setHasDefaultValue(this, delegate);
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
            readonly alias : NewAliasT;
            readonly name  : TableT["name"];
            readonly columns : ColumnMapUtil.WithTableAlias<
                TableT["columns"],
                NewAliasT
            >;
        }>
    );
    export function as<TableT extends ITable, NewAliasT extends string> (
        {
            name,
            columns,
            __databaseName,
        } : TableT,
        newAlias : NewAliasT
    ) : (
        As<TableT, NewAliasT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns2 : TableT["columns"] = columns;
        return new AliasedTable(
            {
                alias : newAlias,
                name,
                columns : ColumnMapUtil.withTableAlias(
                    columns2,
                    newAlias
                ),
            },
            __databaseName
        );
    }
}
export namespace Table {
    export type SetName<TableT extends ITable, NewNameT extends string> = (
        Table<{
            readonly alias : NewNameT;
            readonly name  : NewNameT;
            readonly columns : ColumnMapUtil.WithTableAlias<
                TableT["columns"],
                NewNameT
            >;

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly hasDefaultValue : TableT["hasDefaultValue"];
            readonly mutable : TableT["mutable"];

            readonly parents : TableT["parents"];
            readonly insertAllowed : TableT["insertAllowed"];
            readonly deleteAllowed : TableT["deleteAllowed"];
        }>
    );
    export function setName<TableT extends ITable, NewNameT extends string> (
        table : TableT,
        newName : NewNameT
    ) : (
        SetName<TableT, NewNameT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns : TableT["columns"] = table.columns;

        const {
            autoIncrement,
            id,
            candidateKeys,

            generated,
            hasDefaultValue,
            mutable,

            parents,
            insertAllowed,
            deleteAllowed,
        } = table;

        return new Table(
            {
                alias : newName,
                name : newName,
                columns : ColumnMapUtil.withTableAlias(
                    columns,
                    newName
                ),

                autoIncrement,
                id,
                candidateKeys,

                generated,
                hasDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            table.__databaseName
        );
    }
}
export namespace Table {
    export type AddColumnsFromFieldTuple<
        TableT extends ITable,
        FieldsT extends sd.AnyField[]
    > = (
        Table<{
            readonly alias : TableT["alias"];
            readonly name  : TableT["name"];
            readonly columns : ColumnMapUtil.Intersect<
                TableT["columns"],
                ColumnMapUtil.FromFieldArray<TableT["alias"], FieldsT>
            >;

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly hasDefaultValue : (
                TableT["hasDefaultValue"][number] |
                FieldArrayUtil.NullableNameUnion<FieldsT>
            )[];
            /*
                TODO Debate whether new columns should be mutable
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
        const hasDefaultValue : (
            TableT["hasDefaultValue"][number] |
            FieldArrayUtil.NullableNameUnion<FieldsT>
        )[] = [
            ...table.hasDefaultValue,
            ...FieldArrayUtil.nullableNames(fields),
        ];

        const {
            alias,
            name,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            mutable,

            parents,
            insertAllowed,
            deleteAllowed,
        } = table;

        const result : AddColumnsFromFieldTuple<TableT, FieldsT> = new Table(
            {
                alias,
                name,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                hasDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            table.__databaseName
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
            readonly alias : TableT["alias"];
            readonly name  : TableT["name"];
            readonly columns : ColumnMapUtil.Intersect<
                TableT["columns"],
                ColumnMapUtil.FromAssertMap<TableT["alias"], AssertMapT>
            >;

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly hasDefaultValue : (
                TableT["hasDefaultValue"][number] |
                AssertMapUtil.NullableNameUnion<AssertMapT>
            )[];
            /*
                TODO Debate whether new columns should be mutable
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
        const hasDefaultValue : (
            TableT["hasDefaultValue"][number] |
            AssertMapUtil.NullableNameUnion<AssertMapT>
        )[] = [
            ...table.hasDefaultValue,
            ...AssertMapUtil.nullableNames(assertMap),
        ];

        const {
            alias,
            name,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            mutable,

            parents,
            insertAllowed,
            deleteAllowed,
        } = table;

        const result : AddColumnsFromAssertMap<TableT, AssertMapT> = new Table(
            {
                alias,
                name,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                hasDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            table.__databaseName
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
        CandidateKeyArrayUtil.ToTypeMapUnion<
            TableT["candidateKeys"],
            TableT["columns"]
        >
    );
    export type CandidateKeyAssertDelegate<TableT extends ITable> = (
        CandidateKeyArrayUtil.ToUnionAssertDelegate<
            TableT["candidateKeys"],
            TableT["columns"]
        >
    );
    export function getCandidateKeyAssertDelegate<TableT extends ITable> (
        table : TableT
    ) : (
        CandidateKeyAssertDelegate<TableT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const candidateKeys : TableT["candidateKeys"] = table.candidateKeys;
        const columns : TableT["columns"] = table.columns;
        return CandidateKeyArrayUtil.toUnionAssertDelegate(
            candidateKeys,
            columns
        );
    }
    export type SuperKey<TableT extends ITable> = (
        SuperKeyArrayUtil.ToTypeMapUnion<
            TableT["candidateKeys"],
            TableT["columns"]
        >
    );
    export type SuperKeyAssertDelegate<TableT extends ITable> = (
        SuperKeyArrayUtil.ToUnionAssertDelegate<
            TableT["candidateKeys"],
            TableT["columns"]
        >
    );
    export function getSuperKeyAssertDelegate<TableT extends ITable> (
        table : TableT
    ) : (
        SuperKeyAssertDelegate<TableT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const candidateKeys : TableT["candidateKeys"] = table.candidateKeys;
        const columns : TableT["columns"] = table.columns;
        return SuperKeyArrayUtil.toUnionAssertDelegate(
            candidateKeys,
            columns
        );
    }
}
export namespace Table {
    //The `number|string` requirement is only a compile-time constraint
    //TODO Consider having run-time checks to see if it allows 1,2,3,4,5,... ?
    export type AutoIncrementColumnMap<ColumnMapT extends ColumnMap> = (
        {
            [columnName in {
                [columnName in keyof ColumnMapT] : (
                    ColumnMapT[columnName] extends IAnonymousTypedColumn<number|string> ?
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
    //This create an entirely new Table.
    export type SetAutoIncrement<
        TableT extends ITable,
        DelegateT extends AutoIncrementDelegate<TableT["columns"]>
    > = (
        Table<{
            readonly alias : TableT["alias"];
            readonly name  : TableT["name"];
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
            readonly hasDefaultValue : (
                TableT["hasDefaultValue"][number] |
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
        )[] = table.candidateKeys.concat([
            [autoIncrement.name]
        ]);

        const generated : (
            TableT["generated"][number] |
            ReturnType<DelegateT>["name"]
        )[] = (table.generated.indexOf(autoIncrement.name) >= 0) ?
            table.generated :
            [
                ...table.generated,
                autoIncrement.name
            ];
        const hasDefaultValue : (
            TableT["hasDefaultValue"][number] |
            ReturnType<DelegateT>["name"]
        )[] = (table.hasDefaultValue.indexOf(autoIncrement.name) >= 0) ?
            table.hasDefaultValue :
            [
                ...table.hasDefaultValue,
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
            alias,
            name,
            parents,
            insertAllowed,
            deleteAllowed,
        } = table;

        const result : SetAutoIncrement<TableT, DelegateT> = new Table(
            {
                alias,
                name,
                columns,

                autoIncrement : autoIncrement.name,
                id : autoIncrement.name,
                candidateKeys,

                generated,
                hasDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            table.__databaseName
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
    //This create an entirely new Table.
    export type SetId<
        TableT extends ITable<TableData & { id : undefined }>,
        DelegateT extends IdDelegate<TableT["columns"]>
    > = (
        Table<{
            readonly alias : TableT["alias"];
            readonly name  : TableT["name"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : ReturnType<DelegateT>["name"];
            readonly candidateKeys : (
                TableT["candidateKeys"][number] |
                (ReturnType<DelegateT>["name"][])
            )[];

            readonly generated : TableT["generated"];
            readonly hasDefaultValue : TableT["hasDefaultValue"];
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
            alias,
            name,
            autoIncrement,
            generated,
            hasDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        } = table;

        const result : SetId<TableT, DelegateT> = new Table(
            {
                alias,
                name,
                columns,

                autoIncrement,
                id : id.name,
                candidateKeys,

                generated,
                hasDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            table.__databaseName
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
    //This create an entirely new Table.
    export type AddCandidateKey<
        TableT extends ITable,
        DelegateT extends CandidateKeyDelegate<TableT>
    > = (
        Table<{
            readonly alias : TableT["alias"];
            readonly name  : TableT["name"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : (
                TableT["candidateKeys"][number] |
                (ReturnType<DelegateT>[number]["name"][])
            )[];

            readonly generated : TableT["generated"];
            readonly hasDefaultValue : TableT["hasDefaultValue"];
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
        )[] = table.candidateKeys.concat([
            candidateKeyColumns.map(
                candidateKeyColumn => candidateKeyColumn.name
            )
        ]);

        const {
            alias,
            name,

            autoIncrement,
            id,

            generated,
            hasDefaultValue,
            mutable,

            parents,
            insertAllowed,
            deleteAllowed,
        } = table;

        const result : AddCandidateKey<TableT, DelegateT> = new Table(
            {
                alias,
                name,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                hasDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            table.__databaseName
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
    //This create an entirely new Table.
    export type SetGenerated<
        TableT extends ITable,
        DelegateT extends GeneratedDelegate<TableT>
    > = (
        Table<{
            readonly alias : TableT["alias"];
            readonly name  : TableT["name"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : (
                TableT["generated"][number] |
                ReturnType<DelegateT>[number]["name"]
            )[];
            readonly hasDefaultValue : (
                TableT["hasDefaultValue"][number] |
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
                throw new Error(`Column ${table.name}.${generatedColumn.name} already declared generated`);
            }
            ColumnMapUtil.assertHasColumnIdentifier(table.columns, generatedColumn);
        }
        const generated : (
            TableT["generated"][number] |
            ReturnType<DelegateT>[number]["name"]
        )[] = {
            ...table.generated,
            ...generatedColumns.map(column => column.name),
        };
        const hasDefaultValue : (
            TableT["hasDefaultValue"][number] |
            ReturnType<DelegateT>[number]["name"]
        )[] = {
            ...table.hasDefaultValue,
            ...generatedColumns.map(column => column.name),
        };
        const mutable : Exclude<
            TableT["mutable"][number],
            ReturnType<DelegateT>[number]["name"]
        >[] = table.mutable.filter(
            (columnName) : columnName is Exclude<
                TableT["mutable"][number],
                ReturnType<DelegateT>[number]["name"]
            > => {
                return generatedColumns.every(
                    column => column.name != columnName
                );
            }
        );

        const {
            alias,
            name,

            autoIncrement,
            id,
            candidateKeys,

            parents,
            insertAllowed,
            deleteAllowed,
        } = table;

        const result : SetGenerated<TableT, DelegateT> = new Table(
            {
                alias,
                name,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                hasDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            table.__databaseName
        );
        return result;
    }
}
export namespace Table {
    export type HasDefaultValueColumnMap<
        ColumnMapT extends ColumnMap,
        HasDefaultValueT extends string[]
    > = (
        {
            [columnName in Exclude<keyof ColumnMapT, HasDefaultValueT[number]>] : (
                ColumnMapT[columnName]
            )
        }
    );
    export type HasDefaultValueDelegate<
        TableT extends ITable
    > = (
        (columnMap : HasDefaultValueColumnMap<TableT["columns"], TableT["hasDefaultValue"]>) => (
            HasDefaultValueColumnMap<TableT["columns"], TableT["hasDefaultValue"]>[
                keyof HasDefaultValueColumnMap<TableT["columns"], TableT["hasDefaultValue"]>
            ][]
        )
    );
    //Technically, "set" is the wrong verb to use.
    //This create an entirely new Table.
    export type SetHasDefaultValue<
        TableT extends ITable,
        DelegateT extends HasDefaultValueDelegate<TableT>
    > = (
        Table<{
            readonly alias : TableT["alias"];
            readonly name  : TableT["name"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly hasDefaultValue : (
                TableT["hasDefaultValue"][number] |
                ReturnType<DelegateT>[number]["name"]
            )[];
            readonly mutable : TableT["mutable"];

            readonly parents : TableT["parents"];
            readonly insertAllowed : TableT["insertAllowed"];
            readonly deleteAllowed : TableT["deleteAllowed"];
        }>
    );
    export function setHasDefaultValue<
        TableT extends ITable,
        DelegateT extends HasDefaultValueDelegate<TableT>
    > (
        table : TableT,
        delegate : DelegateT
    ) : (
        SetHasDefaultValue<TableT, DelegateT>
    ) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns : TableT["columns"] = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/24277
        const hasDefaultValueColumns : ReturnType<DelegateT> = delegate(columns) as any;

        for (let hasDefaultValueColumn of hasDefaultValueColumns) {
            if (table.hasDefaultValue.indexOf(hasDefaultValueColumn.name) >= 0) {
                throw new Error(`Column ${table.name}.${hasDefaultValueColumn.name} already declared as having a default value`);
            }
            ColumnMapUtil.assertHasColumnIdentifier(table.columns, hasDefaultValueColumn);
        }
        const hasDefaultValue : (
            TableT["hasDefaultValue"][number] |
            ReturnType<DelegateT>[number]["name"]
        )[] = {
            ...table.hasDefaultValue,
            ...hasDefaultValueColumns.map(column => column.name),
        };

        const {
            alias,
            name,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            mutable,

            parents,
            insertAllowed,
            deleteAllowed,
        } = table;

        const result : SetHasDefaultValue<TableT, DelegateT> = new Table(
            {
                alias,
                name,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                hasDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            table.__databaseName
        );
        return result;
    }
}
export namespace Table {
    export type SetImmutable<TableT extends ITable> = (
        Table<{
            readonly alias : TableT["alias"];
            readonly name  : TableT["name"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly hasDefaultValue : TableT["hasDefaultValue"];
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
            alias,
            name,
            columns,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            hasDefaultValue,

            parents,
            insertAllowed,
            deleteAllowed,
        } = table;

        return new Table(
            {
                alias,
                name,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                hasDefaultValue,
                mutable : [] as [],

                parents,
                insertAllowed,
                deleteAllowed,
            },
            table.__databaseName
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
    //Technically, "overwrite" is the wrong verb to use.
    //This create an entirely new Table.
    export type OverwriteMutable<
        TableT extends ITable,
        DelegateT extends MutableDelegate<TableT>
    > = (
        Table<{
            readonly alias : TableT["alias"];
            readonly name  : TableT["name"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly hasDefaultValue : TableT["hasDefaultValue"];
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
                throw new Error(`Column ${table.name}.${mutableColumn.name} is generated and cannot be mutable`);
            }
            ColumnMapUtil.assertHasColumnIdentifier(table.columns, mutableColumn);
        }

        const mutable : ReturnType<DelegateT>[number]["name"][] = mutableColumns
            .map(column => column.name);

        const {
            alias,
            name,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            hasDefaultValue,

            parents,
            insertAllowed,
            deleteAllowed,
        } = table;

        const result : OverwriteMutable<TableT, DelegateT> = new Table(
            {
                alias,
                name,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                hasDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed,
            },
            table.__databaseName
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
            //TODO Recursively find incompatible types
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
                                "Incompatible column types",
                                ReturnType<TableT["columns"][columnName]["assertDelegate"]>,
                                ReturnType<ParentT["columns"][columnName]["assertDelegate"]>
                            ]|void
                    )
                }
            >
        ) &
        (
            ParentT["name"] extends TableT["name"] ?
            "Parent cannot have same name as table"|void :
            unknown
        ) &
        (
            ParentT["name"] extends TableT["parents"][number]["name"] ?
            "Parent already added to table"|void :
            unknown
        )
    );
    export type AddParent<
        TableT extends ITable,
        ParentT extends ITable
    > = (
        Table<{
            readonly alias : TableT["alias"];
            readonly name  : TableT["name"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly hasDefaultValue : TableT["hasDefaultValue"];
            readonly mutable : TableT["hasDefaultValue"];

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
            throw new Error(`No common candidate keys found between table ${table.name} and parent ${parent.name}`);
        };
        if (table.name == parent.name) {
            throw new Error(`Parent ${table.name} cannot have same name as table`);
        }
        for (let otherParent of table.parents) {
            if (otherParent.name == parent.name) {
                throw new Error(`Parent ${table.name} already added to table`);
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
            alias,
            name,
            columns,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            hasDefaultValue,
            mutable,

            insertAllowed,
            deleteAllowed,
        } = table;

        return new Table({
            alias,
            name,
            columns,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            hasDefaultValue,
            mutable,

            parents,
            insertAllowed,
            deleteAllowed,
        });
    }
}
export namespace Table {
    export type DisallowInsert<TableT extends ITable> = (
        Table<{
            readonly alias : TableT["alias"];
            readonly name  : TableT["name"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly hasDefaultValue : TableT["hasDefaultValue"];
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
            alias,
            name,
            columns,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            hasDefaultValue,
            mutable,

            parents,
            deleteAllowed,
        } = table;

        return new Table(
            {alias,
                name,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                hasDefaultValue,
                mutable,

                parents,
                insertAllowed : false,
                deleteAllowed,
            },
            table.__databaseName
        );
    }
    export type DisallowDelete<TableT extends ITable> = (
        Table<{
            readonly alias : TableT["alias"];
            readonly name  : TableT["name"];
            readonly columns : TableT["columns"];

            readonly autoIncrement : TableT["autoIncrement"];
            readonly id : TableT["id"];
            readonly candidateKeys : TableT["candidateKeys"];

            readonly generated : TableT["generated"];
            readonly hasDefaultValue : TableT["hasDefaultValue"];
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
            alias,
            name,
            columns,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            hasDefaultValue,
            mutable,

            parents,
            insertAllowed,
        } = table;

        return new Table(
            {
                alias,
                name,
                columns,

                autoIncrement,
                id,
                candidateKeys,

                generated,
                hasDefaultValue,
                mutable,

                parents,
                insertAllowed,
                deleteAllowed : false,
            },
            table.__databaseName
        );
    }
}
export namespace Table {
    //TODO Find better names
    export type PolymorphicColumnNameUnion<TableT extends ITable> = (
        (Column.UnionFromColumnMap<TableT["columns"]>["name"]) |
        (Column.UnionFromColumnMap<TableT["parents"][number]["columns"]>["name"])
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
    .setHasDefaultValue(c => [
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
t.hasDefaultValue
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
omg2.hasDefaultValue

const omg3 = omg.addColumns([
    sd.field("g", sd.nullable(sd.boolean()))
]);
omg3.columns.g
omg3.hasDefaultValue
//*/