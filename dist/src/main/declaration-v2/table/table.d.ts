import { AliasedTable } from "../aliased-table";
import { ColumnCollection, ColumnCollectionUtil } from "../column-collection";
import { TableData } from "../table-data";
import * as sd from "schema-decorator";
import { UniqueKeyCollectionUtil, UniqueKeyCollection } from "../unique-key-collection";
export declare class Table<AliasT extends string, NameT extends string, ColumnCollectionT extends ColumnCollection, DataT extends TableData> extends AliasedTable<AliasT, NameT, ColumnCollectionT> {
    readonly data: DataT;
    constructor(alias: AliasT, name: NameT, columns: ColumnCollectionT, data: DataT);
    as<NewAliasT extends string>(newAlias: NewAliasT): (AliasedTable<NewAliasT, NameT, ColumnCollectionUtil.WithTableAlias<ColumnCollectionT, NewAliasT>>);
    private uniqueKeyAssertDelegate;
    getUniqueKeyAssertDelegate(): sd.AssertDelegate<UniqueKeys<this>>;
    private minimalUniqueKeyAssertDelegate;
    getMinimalUniqueKeyAssertDelegate(): sd.AssertDelegate<MinimalUniqueKeys<this>>;
    assertUniqueKey(name: string, mixed: any): UniqueKeys<this>;
    assertMinimalUniqueKey(name: string, mixed: any): MinimalUniqueKeys<this>;
}
export declare type AnyTable = (Table<string, string, ColumnCollection, any>);
export declare type TableRow<TableT extends AnyTable> = (ColumnCollectionUtil.Type<TableT["columns"]>);
export declare type MinimalUniqueKeys<TableT extends AnyTable> = (TableT["data"]["uniqueKeys"] extends UniqueKeyCollection ? UniqueKeyCollectionUtil.MinimalWithType<TableT["data"]["uniqueKeys"], TableT["columns"]> : never);
export declare type UniqueKeys<TableT extends AnyTable> = (MinimalUniqueKeys<TableT> | (TableT["data"]["uniqueKeys"] extends UniqueKeyCollection ? UniqueKeyCollectionUtil.WithType<TableT["data"]["uniqueKeys"], TableT["columns"]> : never));
