import {ITable, TableUtil} from "../table"
import {RawExprNoUsedRef} from "../raw-expr";
import * as InsertUtil from "./util";
import {IConnection} from "../execution";
import {TypeMapUtil} from "../type-map";

export type InsertRow<TableT extends ITable> = (
    {
        [name in TableUtil.RequiredColumnNames<TableT>] : (
            RawExprNoUsedRef<
                ReturnType<TableT["columns"][name]["assertDelegate"]>
            >
        )
    } &
    {
        [name in TableUtil.OptionalColumnNames<TableT>]? : (
            RawExprNoUsedRef<
                ReturnType<TableT["columns"][name]["assertDelegate"]>
            >
        )
    }
);
export type InsertRowLiteral<TableT extends ITable> = (
    {
        [name in TableUtil.RequiredColumnNames<TableT>] : (
            ReturnType<TableT["columns"][name]["assertDelegate"]>
        )
    } &
    {
        [name in TableUtil.OptionalColumnNames<TableT>]? : (
            ReturnType<TableT["columns"][name]["assertDelegate"]>
        )
    }
);

export enum InsertModifier {
    IGNORE = "IGNORE",
    REPLACE = "REPLACE",
}

export interface InsertData {
    _table : ITable & { insertAllowed : true },
    _values : InsertRow<ITable>[]|undefined,
    _modifier : InsertModifier|undefined,
}

export interface IInsert<DataT extends InsertData=InsertData> {
    readonly _table : DataT["_table"];
    readonly _values : DataT["_values"];
    readonly _modifier : DataT["_modifier"];
}

export class Insert<DataT extends InsertData> implements IInsert<DataT> {
    readonly _table : DataT["_table"];
    readonly _values : DataT["_values"];
    readonly _modifier : DataT["_modifier"];

    constructor (
        data : DataT
    ) {
        if (!data._table.insertAllowed) {
            throw new Error(`Cannot insert into table ${data._table.alias}`);
        }
        this._table = data._table;
        this._values = data._values;
        this._modifier = data._modifier;
    }

    ignore () : InsertUtil.Ignore<this> {
        return InsertUtil.ignore(this);
    }
    replace () : InsertUtil.Replace<this> {
        return InsertUtil.replace(this);
    }
    values (
        ...values : InsertRow<this["_table"]>[]
    ) : InsertUtil.Values<this> {
        return InsertUtil.values(this, ...values);
    }
    execute (
        this : Extract<this, IInsert & { _values : InsertRow<ITable>[] }>,
        connection : IConnection
    ) : (
        Promise<InsertUtil.Execute<
            Extract<this, IInsert & { _values : InsertRow<ITable>[] }>
        >>
    ) {
        return InsertUtil.execute(this, connection);
    }
    executeAndFetch (
        this : Extract<this, IInsert & { _values : InsertRow<ITable>[] }>,
        connection : IConnection
    ) : (
        Promise<TypeMapUtil.FromTable<this["_table"]>>
    ) {
        return InsertUtil.executeAndFetch(this, connection);
    }
    printSql (
        this : Extract<this, IInsert & { _values : InsertRow<ITable>[] }>
    ) : this {
        InsertUtil.printSql(this);
        return this;
    }
}