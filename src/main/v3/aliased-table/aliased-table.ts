import {ColumnMap, ColumnMapUtil} from "../column-map";
import {escapeId} from "sqlstring";

export interface AliasedTableData {
    readonly alias : string;
    readonly name  : string;
    readonly columns : ColumnMap;
}

export interface IAliasedTable<DataT extends AliasedTableData=AliasedTableData> {
    readonly alias : DataT["alias"];
    readonly name  : DataT["name"];
    readonly columns : DataT["columns"];

    //HACK to fake multi-database support
    //TODO decide if multi-database support should be a thing
    //TODO Move this to Table, not AliasedTable?
    readonly __databaseName? : string|undefined;
}

export class AliasedTable<DataT extends AliasedTableData> implements IAliasedTable<DataT> {
    readonly alias : DataT["alias"];
    readonly name  : DataT["name"];
    readonly columns : DataT["columns"];

    __databaseName? : string|undefined;

    constructor (
        data : DataT,
        __databaseName? : string|undefined
    ) {
        this.alias = data.alias;
        this.name = data.name;
        this.columns = data.columns;

        this.__databaseName = __databaseName;
    }

    queryTree () {
        return AliasedTable.queryTree(this);
    }
}
export namespace AliasedTable {
    export function queryTree (
        {
            alias,
            name,
            __databaseName
        } : IAliasedTable
    ) {
        const result : string[] = [];
        if (__databaseName != undefined) {
            result.push(escapeId(__databaseName));
            result.push(".");
        }
        if (name == alias) {
            result.push(escapeId(name));
        } else {
            result.push(escapeId(name));
            result.push(" AS ");
            result.push(escapeId(alias));
        }
        return result.join("");
    }
    export function isAliasedTable (raw : any) : raw is IAliasedTable {
        return (
            raw != undefined &&
            (raw instanceof Object) &&
            ("alias" in raw) &&
            ("name" in raw) &&
            ("columns" in raw) &&
            (typeof raw.alias == "string") &&
            (typeof raw.name == "string") &&
            ColumnMapUtil.isColumnMap(raw.columns) &&
            (
                raw.__databaseName === undefined ||
                typeof raw.__databaseName == "string"
            )
        );
    }
}