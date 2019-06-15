import * as  sd from "type-mapping";
import {ITable, TableUtil, InsertableTable} from "../table"
import * as InsertSelectUtil from "./util";
import {QueryUtil} from "../query";
import {ColumnUtil} from "../column";
import {ColumnRefUtil} from "../column-ref";
import {IConnection} from "../execution";

export type InsertSelectRowDelegate<
    QueryT extends QueryUtil.AfterSelectClause,
    TableT extends ITable
> = (
    (
        columns : ColumnRefUtil.ToConvenient<
            ColumnRefUtil.FromSelectItemArray<QueryT["_selects"]>
        >
    ) => InsertSelectRow<QueryT, TableT>
);
export type InsertSelectRow<
    QueryT extends QueryUtil.AfterSelectClause,
    TableT extends ITable
> = (
    {
        [name in TableUtil.RequiredColumnNames<TableT>] : (
            ReturnType<TableT["columns"][name]["assertDelegate"]> |
            Extract<
                ColumnUtil.FromColumnRef<
                    ColumnRefUtil.FromSelectItemArray<
                        QueryT["_selects"]
                    >
                >,
                {
                    assertDelegate : sd.SafeMapper<
                        ReturnType<TableT["columns"][name]["assertDelegate"]>
                    >
                }
            >
        )
    } &
    {
        [name in TableUtil.OptionalColumnNames<TableT>]? : (
            ReturnType<TableT["columns"][name]["assertDelegate"]> |
            Extract<
                ColumnUtil.FromColumnRef<
                    ColumnRefUtil.FromSelectItemArray<
                        QueryT["_selects"]
                    >
                >,
                {
                    assertDelegate : sd.SafeMapper<
                        ReturnType<TableT["columns"][name]["assertDelegate"]>
                    >
                }
            >
        )
    }
);
export type InsertSelectRowLiteral<TableT extends ITable> = (
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

export enum InsertSelectModifier {
    IGNORE = "IGNORE",
    REPLACE = "REPLACE",
}

export interface InsertSelectData {
    readonly _query : QueryUtil.AfterSelectClause,
    readonly _table : InsertableTable,
    readonly _row : InsertSelectRow<QueryUtil.AfterSelectClause, ITable>|undefined,
    readonly _modifier : InsertSelectModifier|undefined,
}

export interface IInsertSelect<DataT extends InsertSelectData=InsertSelectData> {
    readonly _query : DataT["_query"];
    readonly _table : DataT["_table"];
    readonly _row : DataT["_row"];
    readonly _modifier : DataT["_modifier"];
}

export class InsertSelect<DataT extends InsertSelectData> implements IInsertSelect<DataT> {
    readonly _query : DataT["_query"];
    readonly _table : DataT["_table"];
    readonly _row : DataT["_row"];
    readonly _modifier : DataT["_modifier"];

    constructor (
        data : DataT
    ) {
        if (!data._table.insertAllowed) {
            throw new Error(`Cannot insert into table ${data._table.alias}`);
        }
        this._query = data._query;
        this._table = data._table;
        this._row = data._row;
        this._modifier = data._modifier;
    }

    execute (
        this : Extract<
            this,
            ExecutableInsertSelect
        >,
        connection : IConnection
    ) : (
        Promise<InsertSelectUtil.Execute<
            Extract<
                this,
                ExecutableInsertSelect
            >
        >>
    ) {
        return InsertSelectUtil.execute(this, connection);
    }
}

export type ExecutableInsertSelect = (
    IInsertSelect<{
        readonly _query : QueryUtil.AfterSelectClause,
        readonly _table : InsertableTable,
        readonly _row : InsertSelectRow<QueryUtil.AfterSelectClause, ITable>,
        readonly _modifier : InsertSelectModifier|undefined,
    }>
)