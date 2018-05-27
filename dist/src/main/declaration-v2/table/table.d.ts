import { AliasedTable } from "../aliased-table";
import { ColumnCollection, ColumnCollectionUtil } from "../column-collection";
import { RawColumnCollection, RawColumnCollectionUtil } from "../raw-column-collection";
import { TableData, AutoIncrementDelegate, IsGeneratedDelegate, HasDefaultValueDelegate, IsMutableDelegate, TableDataUtil, AddUniqueKeyDelegate } from "../table-data";
import * as fieldUtil from "../field-util";
import * as sd from "schema-decorator";
import { TableUtil } from "./util";
export declare class Table<AliasT extends string, NameT extends string, ColumnCollectionT extends ColumnCollection, DataT extends TableData> extends AliasedTable<AliasT, NameT, ColumnCollectionT> {
    readonly data: DataT;
    constructor(alias: AliasT, name: NameT, columns: ColumnCollectionT, data: DataT);
    setAutoIncrement<AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollectionT>>(delegate: AutoIncrementDelegateT): (Table<AliasT, NameT, ColumnCollectionT, TableDataUtil.AutoIncrement<DataT, ColumnCollectionT, AutoIncrementDelegateT>>);
    setIsGenerated<IsGeneratedDelegateT extends IsGeneratedDelegate<DataT, ColumnCollectionT>>(delegate: IsGeneratedDelegateT): (Table<AliasT, NameT, ColumnCollectionT, TableDataUtil.IsGenerated<DataT, ColumnCollectionT, IsGeneratedDelegateT>>);
    setHasDefaultValue<HasDefaultValueDelegateT extends HasDefaultValueDelegate<DataT, ColumnCollectionT>>(delegate: HasDefaultValueDelegateT): (Table<AliasT, NameT, ColumnCollectionT, TableDataUtil.HasDefaultValue<DataT, ColumnCollectionT, HasDefaultValueDelegateT>>);
    setIsMutable<IsMutableDelegateT extends IsMutableDelegate<DataT, ColumnCollectionT>>(delegate: IsMutableDelegateT): (Table<AliasT, NameT, ColumnCollectionT, TableDataUtil.IsMutable<DataT, ColumnCollectionT, IsMutableDelegateT>>);
    setImmutable(): (Table<AliasT, NameT, ColumnCollectionT, TableDataUtil.Immutable<DataT>>);
    as<NewAliasT extends string>(newAlias: NewAliasT): (AliasedTable<NewAliasT, NameT, ColumnCollectionUtil.WithTableAlias<ColumnCollectionT, NewAliasT>>);
    withName<NewNameT extends string>(newName: NewNameT): (Table<NewNameT, NewNameT, ColumnCollectionUtil.WithTableAlias<ColumnCollectionT, NewNameT>, TableDataUtil.WithTableAlias<DataT, NewNameT>>);
    addColumns<RawColumnCollectionT extends RawColumnCollection>(rawColumnCollection: RawColumnCollectionT): (Table<AliasT, NameT, ColumnCollectionUtil.Merge<ColumnCollectionT, RawColumnCollectionUtil.ToColumnCollection<AliasT, RawColumnCollectionT>>, DataT>);
    addColumns<TupleT extends fieldUtil.AnyFieldTuple>(fields: TupleT): (Table<AliasT, NameT, ColumnCollectionUtil.Merge<ColumnCollectionT, RawColumnCollectionUtil.ToColumnCollection<AliasT, fieldUtil.FieldsToObject<TupleT>>>, DataT>);
    addUniqueKey<AddUniqueKeyDelegateT extends AddUniqueKeyDelegate<ColumnCollectionT>>(delegate: AddUniqueKeyDelegateT): (Table<AliasT, NameT, ColumnCollectionT, TableDataUtil.AddUniqueKey<DataT, ColumnCollectionT, AddUniqueKeyDelegateT>>);
    private uniqueKeyAssertDelegate;
    getUniqueKeyAssertDelegate(): sd.AssertDelegate<TableUtil.UniqueKeys<this>>;
}
export declare type AnyTable = (Table<string, string, ColumnCollection, any>);
export declare function table<NameT extends string, RawColumnCollectionT extends RawColumnCollection>(name: NameT, rawColumnCollection: RawColumnCollectionT): (Table<NameT, NameT, RawColumnCollectionUtil.ToColumnCollection<NameT, RawColumnCollectionT>, {
    autoIncrement: undefined;
    isGenerated: {};
    hasDefaultValue: {
        [name in RawColumnCollectionUtil.NullableColumnNames<RawColumnCollectionT>]: true;
    };
    isMutable: {
        [name in Extract<keyof RawColumnCollectionT, string>]: true;
    };
    uniqueKeys: undefined;
}>);
export declare function table<NameT extends string, TupleT extends fieldUtil.AnyFieldTuple>(name: NameT, tuple: TupleT): (Table<NameT, NameT, RawColumnCollectionUtil.ToColumnCollection<NameT, fieldUtil.FieldsToObject<TupleT>>, {
    autoIncrement: undefined;
    isGenerated: {};
    hasDefaultValue: {
        [name in RawColumnCollectionUtil.NullableColumnNames<fieldUtil.FieldsToObject<TupleT>>]: true;
    };
    isMutable: {
        [name in Extract<keyof fieldUtil.FieldsToObject<TupleT>, string>]: true;
    };
    uniqueKeys: undefined;
}>);
