import {AliasedTable} from "../aliased-table";
import {ColumnCollection, ColumnCollectionUtil} from "../column-collection";
import {RawColumnCollection, RawColumnCollectionUtil} from "../raw-column-collection";
import {
    TableData,
    AutoIncrementDelegate,
    IsGeneratedDelegate,
    HasDefaultValueDelegate,
    IsMutableDelegate,
    TableDataUtil
} from "../table-data";

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
    setHasDefaultGenerated<
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
            this.data
        );
    }
}

export type AnyTable = Table<string, string, ColumnCollection, TableData>;

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
            }
        }
    >
) {
    const columns = RawColumnCollectionUtil.toColumnCollection(name, rawColumnCollection);
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
        }
    );
}