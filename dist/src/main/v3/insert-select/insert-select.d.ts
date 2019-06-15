import * as sd from "type-mapping";
import { ITable, TableUtil, InsertableTable } from "../table";
import * as InsertSelectUtil from "./util";
import { QueryUtil } from "../query";
import { ColumnUtil } from "../column";
import { ColumnRefUtil } from "../column-ref";
import { IConnection } from "../execution";
export declare type InsertSelectRowDelegate<QueryT extends QueryUtil.AfterSelectClause, TableT extends ITable> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromSelectItemArray<QueryT["_selects"]>>) => InsertSelectRow<QueryT, TableT>);
export declare type InsertSelectRow<QueryT extends QueryUtil.AfterSelectClause, TableT extends ITable> = ({
    [name in TableUtil.RequiredColumnNames<TableT>]: (ReturnType<TableT["columns"][name]["assertDelegate"]> | Extract<ColumnUtil.FromColumnRef<ColumnRefUtil.FromSelectItemArray<QueryT["_selects"]>>, {
        assertDelegate: sd.SafeMapper<ReturnType<TableT["columns"][name]["assertDelegate"]>>;
    }>);
} & {
    [name in TableUtil.OptionalColumnNames<TableT>]?: (ReturnType<TableT["columns"][name]["assertDelegate"]> | Extract<ColumnUtil.FromColumnRef<ColumnRefUtil.FromSelectItemArray<QueryT["_selects"]>>, {
        assertDelegate: sd.SafeMapper<ReturnType<TableT["columns"][name]["assertDelegate"]>>;
    }>);
});
export declare type InsertSelectRowLiteral<TableT extends ITable> = ({
    [name in TableUtil.RequiredColumnNames<TableT>]: (ReturnType<TableT["columns"][name]["assertDelegate"]>);
} & {
    [name in TableUtil.OptionalColumnNames<TableT>]?: (ReturnType<TableT["columns"][name]["assertDelegate"]>);
});
export declare enum InsertSelectModifier {
    IGNORE = "IGNORE",
    REPLACE = "REPLACE"
}
export interface InsertSelectData {
    readonly _query: QueryUtil.AfterSelectClause;
    readonly _table: InsertableTable;
    readonly _row: InsertSelectRow<QueryUtil.AfterSelectClause, ITable> | undefined;
    readonly _modifier: InsertSelectModifier | undefined;
}
export interface IInsertSelect<DataT extends InsertSelectData = InsertSelectData> {
    readonly _query: DataT["_query"];
    readonly _table: DataT["_table"];
    readonly _row: DataT["_row"];
    readonly _modifier: DataT["_modifier"];
}
export declare class InsertSelect<DataT extends InsertSelectData> implements IInsertSelect<DataT> {
    readonly _query: DataT["_query"];
    readonly _table: DataT["_table"];
    readonly _row: DataT["_row"];
    readonly _modifier: DataT["_modifier"];
    constructor(data: DataT);
    execute(this: Extract<this, ExecutableInsertSelect>, connection: IConnection): (Promise<InsertSelectUtil.Execute<Extract<this, ExecutableInsertSelect>>>);
}
export declare type ExecutableInsertSelect = (IInsertSelect<{
    readonly _query: QueryUtil.AfterSelectClause;
    readonly _table: InsertableTable;
    readonly _row: InsertSelectRow<QueryUtil.AfterSelectClause, ITable>;
    readonly _modifier: InsertSelectModifier | undefined;
}>);
