import * as d from "../declaration";
export declare class Table<AliasT extends string, NameT extends string, RawColumnCollectionT extends d.RawColumnCollection, DataT extends d.RawTableData> implements d.ITable<AliasT, NameT, RawColumnCollectionT, DataT> {
    readonly alias: AliasT;
    readonly name: NameT;
    readonly columns: d.ColumnCollection<AliasT, RawColumnCollectionT>;
    readonly data: DataT;
    readonly query: string;
    constructor(alias: AliasT, name: NameT, columns: RawColumnCollectionT, data: DataT);
    querify(sb: d.IStringBuilder): void;
    as<NewAliasT extends string>(alias: NewAliasT): d.AliasedTable<NewAliasT, NameT, RawColumnCollectionT>;
    assertIsOwnColumn(name: string, other: d.AnyColumn): void;
    autoIncrement<AutoIncrementDelegateT extends d.AutoIncrementDelegate<d.ColumnCollection<AliasT, RawColumnCollectionT>>>(autoIncrementDelegate: AutoIncrementDelegateT): any;
    setHasServerDefaultValue<HasServerDefaultValueDelegateT extends d.HasServerDefaultValueDelegate<d.ColumnCollection<AliasT, RawColumnCollectionT>>>(hasServerDefaultValueDelegate: HasServerDefaultValueDelegateT): any;
}
export declare const table: d.CreateTableDelegate;