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
    setIsMutable<IsMutableDelegateT extends d.IsMutableDelegate<d.ColumnCollection<AliasT, RawColumnCollectionT>>>(isMutableDelegate: IsMutableDelegateT): any;
    setImmutable(): any;
}
export declare const table: d.CreateTableDelegate;
export declare type TableRow<TableT extends d.ITable<any, any, any, any>> = (TableT extends d.ITable<any, any, infer RawColumnCollectionT, any> ? ({
    [name in keyof RawColumnCollectionT]: d.TypeOf<RawColumnCollectionT[name]>;
}) : (never));
