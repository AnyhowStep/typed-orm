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

    private uniqueKeyAssertDelegate : sd.AssertDelegate<TableUtil.UniqueKeys<this>>|undefined;
    getUniqueKeyAssertDelegate () : sd.AssertDelegate<TableUtil.UniqueKeys<this>> {
        if (this.uniqueKeyAssertDelegate == undefined) {
            this.uniqueKeyAssertDelegate = TableUtil.uniqueKeyAssertDelegate(this);
        }
        return this.uniqueKeyAssertDelegate;
    }
}

//TODO, make this <string, string, ColumnCollection, TableData>
export type AnyTable = (
    Table<string, string, ColumnCollection, any>
);

export type TableRow<TableT extends AnyTable> = (
    ColumnCollectionUtil.Type<TableT["columns"]>
);
export type UniqueKeys<TableT extends AnyTable> = (
    TableT["data"]["uniqueKeyCollection"] extends UniqueKeyCollection ?
        UniqueKeyCollectionUtil.WithType<TableT["data"]["uniqueKeyCollection"], TableT["columns"]> :
        never
);