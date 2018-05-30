import { AliasedTable } from "../aliased-table";
import { ColumnCollection, ColumnCollectionUtil } from "../column-collection";
import { TableData } from "../table-data";
import * as sd from "schema-decorator";
import { TableUtil } from "./util";
import { UniqueKeyCollectionUtil, UniqueKeyCollection } from "../unique-key-collection";
export declare class Table<AliasT extends string, NameT extends string, ColumnCollectionT extends ColumnCollection, DataT extends TableData> extends AliasedTable<AliasT, NameT, ColumnCollectionT> {
    readonly data: DataT;
    constructor(alias: AliasT, name: NameT, columns: ColumnCollectionT, data: DataT);
    as<NewAliasT extends string>(newAlias: NewAliasT): (AliasedTable<NewAliasT, NameT, ColumnCollectionUtil.WithTableAlias<ColumnCollectionT, NewAliasT>>);
    private uniqueKeyAssertDelegate;
    getUniqueKeyAssertDelegate(): sd.AssertDelegate<TableUtil.UniqueKeys<this>>;
}
export declare type AnyTable = (Table<string, string, ColumnCollection, any>);
export declare type TableRow<TableT extends AnyTable> = (ColumnCollectionUtil.Type<TableT["columns"]>);
export declare type UniqueKeys<TableT extends AnyTable> = (TableT["data"]["uniqueKeyCollection"] extends UniqueKeyCollection ? UniqueKeyCollectionUtil.WithType<TableT["data"]["uniqueKeyCollection"], TableT["columns"]> : never);
