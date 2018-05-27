import {AliasedTable} from "../aliased-table";
import {ColumnCollection, ColumnCollectionUtil} from "../column-collection";
import {RawColumnCollection, RawColumnCollectionUtil} from "../raw-column-collection";
import {
    TableData,
    AutoIncrementDelegate,
    IsGeneratedDelegate,
    HasDefaultValueDelegate,
    IsMutableDelegate,
    TableDataUtil,
    AddUniqueKeyDelegate,
} from "../table-data";
import * as fieldUtil from "../field-util";
//import {Column} from "../column";
import * as sd from "schema-decorator";
import {TableUtil} from "./util";

export class Table<
    AliasT extends string,
    NameT extends string,
    ColumnCollectionT extends ColumnCollection,
    DataT extends TableData
> extends AliasedTable<AliasT, NameT, ColumnCollectionT> {
    constructor (
        alias : AliasT,
        name  : NameT,
        columns : ColumnCollectionT,
        readonly data : DataT
    ) {
        super(alias, name, columns);
    }

    setAutoIncrement<
        AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollectionT>
    >(delegate : AutoIncrementDelegateT) : (
        Table<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.AutoIncrement<DataT, ColumnCollectionT, AutoIncrementDelegateT>
        >
    ) {
        return new Table(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.autoIncrement(this.data, this.columns, delegate)
        );
    }
    /*unsetAutoIncrement () : (
        Table<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.UnsetAutoIncrement<DataT>
        >
    ) {
        return new Table(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.unsetAutoIncrement(this.data)
        );
    }*/
    setIsGenerated<
        IsGeneratedDelegateT extends IsGeneratedDelegate<
            DataT,
            ColumnCollectionT
        >
    >(delegate : IsGeneratedDelegateT) : (
        Table<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.IsGenerated<DataT, ColumnCollectionT, IsGeneratedDelegateT>
        >
    ) {
        return new Table(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.isGenerated(this.data, this.columns, delegate)
        );
    }
    setHasDefaultValue<
        HasDefaultValueDelegateT extends HasDefaultValueDelegate<
            DataT,
            ColumnCollectionT
        >
    >(delegate : HasDefaultValueDelegateT) : (
        Table<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.HasDefaultValue<DataT, ColumnCollectionT, HasDefaultValueDelegateT>
        >
    ) {
        return new Table(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.hasDefaultValue(this.data, this.columns, delegate)
        );
    }
    setIsMutable<
        IsMutableDelegateT extends IsMutableDelegate<
            DataT,
            ColumnCollectionT
        >
    >(delegate : IsMutableDelegateT) : (
        Table<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.IsMutable<DataT, ColumnCollectionT, IsMutableDelegateT>
        >
    ) {
        return new Table(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.isMutable(this.data, this.columns, delegate)
        );
    }
    setImmutable () : (
        Table<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.Immutable<DataT>
        >
    ) {
        return new Table(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.immutable(this.data)
        );
    }

    as<NewAliasT extends string> (newAlias : NewAliasT) : (
        AliasedTable<
            NewAliasT,
            NameT,
            ColumnCollectionUtil.WithTableAlias<
                ColumnCollectionT,
                NewAliasT
            >
        >
    ) {
        return new Table(
            newAlias,
            this.name,
            ColumnCollectionUtil.withTableAlias(this.columns, newAlias),
            TableDataUtil.withTableAlias(this.data, newAlias)
            //this.data
        );
    }

    withName<NewNameT extends string> (newName : NewNameT) : (
        Table<
            NewNameT,
            NewNameT,
            ColumnCollectionUtil.WithTableAlias<
                ColumnCollectionT,
                NewNameT
            >,
            TableDataUtil.WithTableAlias<DataT, NewNameT>
        >
    ) {
        return new Table(
            newName,
            newName,
            ColumnCollectionUtil.withTableAlias(this.columns, newName),
            TableDataUtil.withTableAlias(this.data, newName)
        );
    }
    addColumns<RawColumnCollectionT extends RawColumnCollection> (
        rawColumnCollection : RawColumnCollectionT
    ) : (
        Table<
            AliasT,
            NameT,
            ColumnCollectionUtil.Merge<
                ColumnCollectionT,
                RawColumnCollectionUtil.ToColumnCollection<
                    AliasT,
                    RawColumnCollectionT
                >
            >,
            DataT
        >
    );
    addColumns<TupleT extends fieldUtil.AnyFieldTuple> (
        fields : TupleT
    ) : (
        Table<
            AliasT,
            NameT,
            ColumnCollectionUtil.Merge<
                ColumnCollectionT,
                RawColumnCollectionUtil.ToColumnCollection<
                    AliasT,
                    fieldUtil.FieldsToObject<TupleT>
                >
            >,
            DataT
        >
    );
    addColumns (raw : RawColumnCollection|fieldUtil.AnyFieldTuple) : (
        Table<
            AliasT,
            NameT,
            any,
            any
        >
    ) {
        if (raw instanceof Array) {
            raw = fieldUtil.fieldsToObject(raw);
        }
        return new Table(
            this.alias,
            this.name,
            ColumnCollectionUtil.merge(
                this.columns,
                RawColumnCollectionUtil.toColumnCollection(this.alias, raw)
            ),
            this.data
        );
    }
    //This method causes `tsc` to not terminate if uncommented
    addUniqueKey<
        AddUniqueKeyDelegateT extends AddUniqueKeyDelegate<ColumnCollectionT>
    > (delegate : AddUniqueKeyDelegateT) : (
        Table<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.AddUniqueKey<
                DataT,
                ColumnCollectionT,
                AddUniqueKeyDelegateT
            >
        >
    ) {
        return new Table(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.addUniqueKey(
                this.data,
                this.columns,
                delegate
            ) as any
        ) as any;
    }

    private uniqueKeyAssertDelegate : sd.AssertDelegate<TableUtil.UniqueKeys<this>>|undefined;
    getUniqueKeyAssertDelegate () : sd.AssertDelegate<TableUtil.UniqueKeys<this>> {
        if (this.uniqueKeyAssertDelegate == undefined) {
            this.uniqueKeyAssertDelegate = TableUtil.uniqueKeyAssertDelegate(this);
        }
        return this.uniqueKeyAssertDelegate;
    }
}

export type AnyTable = (
    Table<string, string, ColumnCollection, any>
    /*Table<string, string, ColumnCollection, TableData>|
    Table<string, string, ColumnCollection, {
        [key in keyof TableData] : (
            key extends "uniqueKeys" ?
            undefined :
            TableData[key]
        )
    }>|
    Table<string, string, ColumnCollection, {
        [key in keyof TableData] : (
            key extends "uniqueKeys" ?
            Tuple<Tuple<string>> :
            TableData[key]
        )
    }>
    Table<string, string, ColumnCollection, {
        [key in keyof TableData] : (
            key extends "autoIncrement" ?
            undefined :
            TableData[key]
        )
    }>|
    Table<string, string, ColumnCollection, {
        [key in keyof TableData] : (
            key extends "autoIncrement" ?
            Column<any, any, number> :
            TableData[key]
        )
    }>*/
);

export function table<
    NameT extends string,
    RawColumnCollectionT extends RawColumnCollection
> (
    name : NameT,
    rawColumnCollection : RawColumnCollectionT,
) : (
    Table<
        NameT,
        NameT,
        RawColumnCollectionUtil.ToColumnCollection<NameT, RawColumnCollectionT>,
        {
            autoIncrement : undefined,
            isGenerated : {},
            hasDefaultValue : {
                [name in RawColumnCollectionUtil.NullableColumnNames<
                    RawColumnCollectionT
                >] : true
            },
            isMutable : {
                [name in Extract<keyof RawColumnCollectionT, string>] : true
            },
            uniqueKeys : undefined,
        }
    >
);
export function table<
    NameT extends string,
    TupleT extends fieldUtil.AnyFieldTuple
> (
    name : NameT,
    tuple : TupleT,
) : (
    Table<
        NameT,
        NameT,
        RawColumnCollectionUtil.ToColumnCollection<NameT, fieldUtil.FieldsToObject<TupleT>>,
        {
            autoIncrement : undefined,
            isGenerated : {},
            hasDefaultValue : {
                [name in RawColumnCollectionUtil.NullableColumnNames<
                    fieldUtil.FieldsToObject<TupleT>
                >] : true
            },
            isMutable : {
                [name in Extract<keyof fieldUtil.FieldsToObject<TupleT>, string>] : true
            },
            uniqueKeys : undefined,
        }
    >
);
export function table (
    name : string,
    raw : RawColumnCollection|fieldUtil.AnyFieldTuple,
) : any {

    if (raw instanceof Array) {
        raw = fieldUtil.fieldsToObject(raw);
    }
    const columns = RawColumnCollectionUtil.toColumnCollection(name, raw);
    const hasDefaultValue = {} as any;
    const isMutable = {} as any;

    for (let columnName of ColumnCollectionUtil.nullableColumnNames(columns)) {
        hasDefaultValue[columnName] = true;
    }

    for (let columnName in columns) {
        isMutable[columnName] = true;
    }

    return new Table(
        name,
        name,
        columns,
        {
            autoIncrement : undefined,
            isGenerated : {},
            hasDefaultValue : hasDefaultValue,
            isMutable : isMutable,
            uniqueKeys : undefined,
        }
    );
}