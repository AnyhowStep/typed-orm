import { AliasedTable } from "../aliased-table";
import { ColumnCollection, ColumnCollectionUtil } from "../column-collection";
import { RawColumnCollection, RawColumnCollectionUtil } from "../raw-column-collection";
import { TableData, AutoIncrementDelegate, IsGeneratedDelegate, HasDefaultValueDelegate, IsMutableDelegate, TableDataUtil, AddUniqueKeyDelegate, IdDelegate } from "../table-data";
import { Table, AnyTable } from "./table";
import * as fieldUtil from "../field-util";
export declare class TableBuilder<AliasT extends string, NameT extends string, ColumnCollectionT extends ColumnCollection, DataT extends TableData> extends AliasedTable<AliasT, NameT, ColumnCollectionT> {
    readonly data: DataT;
    constructor(alias: AliasT, name: NameT, columns: ColumnCollectionT, data: DataT);
    setAutoIncrement<AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollectionT>>(this: TableBuilder<any, any, any, {
        readonly [key in keyof DataT]: (key extends "autoIncrement" ? undefined : key extends "id" ? undefined : any);
    }>, delegate: AutoIncrementDelegateT): (TableBuilder<AliasT, NameT, ColumnCollectionT, TableDataUtil.AutoIncrement<DataT, ColumnCollectionT, AutoIncrementDelegateT>>);
    setIsGenerated<IsGeneratedDelegateT extends IsGeneratedDelegate<DataT, ColumnCollectionT>>(delegate: IsGeneratedDelegateT): (TableBuilder<AliasT, NameT, ColumnCollectionT, TableDataUtil.IsGenerated<DataT, ColumnCollectionT, IsGeneratedDelegateT>>);
    setHasDefaultValue<HasDefaultValueDelegateT extends HasDefaultValueDelegate<DataT, ColumnCollectionT>>(delegate: HasDefaultValueDelegateT): (TableBuilder<AliasT, NameT, ColumnCollectionT, TableDataUtil.HasDefaultValue<DataT, ColumnCollectionT, HasDefaultValueDelegateT>>);
    setIsMutable<IsMutableDelegateT extends IsMutableDelegate<DataT, ColumnCollectionT>>(delegate: IsMutableDelegateT): (TableBuilder<AliasT, NameT, ColumnCollectionT, TableDataUtil.IsMutable<DataT, ColumnCollectionT, IsMutableDelegateT>>);
    setImmutable(): (TableBuilder<AliasT, NameT, ColumnCollectionT, TableDataUtil.Immutable<DataT>>);
    withName<NewNameT extends string>(newName: NewNameT): (TableBuilder<NewNameT, NewNameT, ColumnCollectionUtil.WithTableAlias<ColumnCollectionT, NewNameT>, TableDataUtil.WithTableAlias<DataT, NewNameT>>);
    addColumns<TupleT extends fieldUtil.AnyFieldTuple>(fields: TupleT): (TableBuilder<AliasT, NameT, ColumnCollectionUtil.Merge<ColumnCollectionT, RawColumnCollectionUtil.ToColumnCollection<AliasT, fieldUtil.FieldsToObject<TupleT>>>, DataT>);
    addColumns<RawColumnCollectionT extends RawColumnCollection>(rawColumnCollection: RawColumnCollectionT): (TableBuilder<AliasT, NameT, ColumnCollectionUtil.Merge<ColumnCollectionT, RawColumnCollectionUtil.ToColumnCollection<AliasT, RawColumnCollectionT>>, DataT>);
    setId<IdDelegateT extends IdDelegate<DataT, ColumnCollectionT>>(this: TableBuilder<any, any, any, {
        readonly [key in keyof DataT]: (key extends "autoIncrement" ? undefined : key extends "id" ? undefined : any);
    }>, delegate: IdDelegateT): (TableBuilder<AliasT, NameT, ColumnCollectionT, TableDataUtil.Id<DataT, ColumnCollectionT, IdDelegateT>>);
    addUniqueKey<AddUniqueKeyDelegateT extends AddUniqueKeyDelegate<ColumnCollectionT>>(delegate: AddUniqueKeyDelegateT): (TableBuilder<AliasT, NameT, ColumnCollectionT, TableDataUtil.AddUniqueKey<DataT, ColumnCollectionT, AddUniqueKeyDelegateT>>);
    addUniqueKeyFromFieldsUnsafe<FieldsT extends fieldUtil.AnyFieldTuple>(fields: FieldsT): (TableBuilder<AliasT, NameT, ColumnCollectionT, TableDataUtil.AddUniqueKeyFromFieldsUnsafe<DataT, FieldsT>>);
    addParent<ParentT extends AnyTable>(parent: ParentT): TableBuilder<AliasT, NameT, ColumnCollectionT, TableDataUtil.AddParentTable<DataT, ParentT>>;
    noInsert(): TableBuilder<AliasT, NameT, ColumnCollectionT, TableDataUtil.NoInsert<DataT>>;
    build(): Table<AliasT, NameT, ColumnCollectionT, DataT>;
}
export declare function table<NameT extends string, RawColumnCollectionT extends RawColumnCollection>(name: NameT, rawColumnCollection: RawColumnCollectionT): (TableBuilder<NameT, NameT, RawColumnCollectionUtil.ToColumnCollection<NameT, RawColumnCollectionT>, {
    autoIncrement: undefined;
    isGenerated: {};
    hasDefaultValue: {
        [name in RawColumnCollectionUtil.NullableColumnNames<RawColumnCollectionT>]: true;
    };
    isMutable: {
        [name in Extract<keyof RawColumnCollectionT, string>]: true;
    };
    id: undefined;
    uniqueKeys: undefined;
    parentTables: undefined;
    noInsert: false;
}>);
export declare function table<NameT extends string, TupleT extends fieldUtil.AnyFieldTuple>(name: NameT, tuple: TupleT): (TableBuilder<NameT, NameT, RawColumnCollectionUtil.ToColumnCollection<NameT, fieldUtil.FieldsToObject<TupleT>>, {
    autoIncrement: undefined;
    isGenerated: {};
    hasDefaultValue: {
        [name in RawColumnCollectionUtil.NullableColumnNames<fieldUtil.FieldsToObject<TupleT>>]: true;
    };
    isMutable: {
        [name in Extract<keyof fieldUtil.FieldsToObject<TupleT>, string>]: true;
    };
    id: undefined;
    uniqueKeys: undefined;
    parentTables: undefined;
    noInsert: false;
}>);
export declare function table<TableT extends AnyTable>(table: TableT): (TableBuilder<TableT["alias"], TableT["name"], TableT["columns"], TableT["data"]>);
//# sourceMappingURL=table-builder.d.ts.map