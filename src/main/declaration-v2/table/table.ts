import {AliasedTable} from "../aliased-table";
import {ColumnCollection, ColumnCollectionUtil} from "../column-collection";
//import {RawColumnCollection, RawColumnCollectionUtil} from "../raw-column-collection";
import {
    TableData,
    //AutoIncrementDelegate,
    //IsGeneratedDelegate,
    //HasDefaultValueDelegate,
    //IsMutableDelegate,
    TableDataUtil,
    //AddUniqueKeyDelegate,
    //IdDelegate,
} from "../table-data";
//import * as fieldUtil from "../field-util";
//import {Column} from "../column";
import * as sd from "schema-decorator";
import {TableUtil} from "./util";
import { UniqueKeyCollectionUtil, UniqueKeyCollection } from "../unique-key-collection";

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

    private uniqueKeyAssertDelegate : sd.AssertDelegate<UniqueKeys<this>>|undefined;
    getUniqueKeyAssertDelegate () : sd.AssertDelegate<UniqueKeys<this>> {
        if (this.uniqueKeyAssertDelegate == undefined) {
            this.uniqueKeyAssertDelegate = TableUtil.uniqueKeyAssertDelegate(this as any);
        }
        return this.uniqueKeyAssertDelegate;
    }
    private minimalUniqueKeyAssertDelegate : sd.AssertDelegate<MinimalUniqueKeys<this>>|undefined;
    getMinimalUniqueKeyAssertDelegate () : sd.AssertDelegate<MinimalUniqueKeys<this>> {
        if (this.minimalUniqueKeyAssertDelegate == undefined) {
            this.minimalUniqueKeyAssertDelegate = TableUtil.minimalUniqueKeyAssertDelegate(this as any);
        }
        return this.minimalUniqueKeyAssertDelegate;
    }

    public assertUniqueKey (name : string, mixed : any) : UniqueKeys<this> {
        return this.getUniqueKeyAssertDelegate()(name, mixed);
    }
    public assertMinimalUniqueKey (name : string, mixed : any) : MinimalUniqueKeys<this> {
        return this.getMinimalUniqueKeyAssertDelegate()(name, mixed);
    }
}

//TODO, make this <string, string, ColumnCollection, TableData>
export type AnyTable = (
    Table<string, string, ColumnCollection, any>
);
export type AnyTableAllowInsert = (
    //TODO Find a way to make this work with noInsert without breaking everything
    AnyTable
    //Table<string, string, ColumnCollection, TableData & { noInsert : false }>
);

export type TableRow<TableT extends AnyTable> = (
    ColumnCollectionUtil.Type<TableT["columns"]>
);
export type MinimalUniqueKeys<TableT extends AnyTable> = (
    TableT["data"]["uniqueKeys"] extends UniqueKeyCollection ?
        UniqueKeyCollectionUtil.MinimalWithType<TableT["data"]["uniqueKeys"], TableT["columns"]> :
        never
);
export type UniqueKeys<TableT extends AnyTable> = (
    MinimalUniqueKeys<TableT> |
    (
        TableT["data"]["uniqueKeys"] extends UniqueKeyCollection ?
            UniqueKeyCollectionUtil.WithType<TableT["data"]["uniqueKeys"], TableT["columns"]> :
            never
    )
);