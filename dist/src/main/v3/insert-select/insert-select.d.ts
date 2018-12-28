import * as sd from "schema-decorator";
import { ITable, TableUtil } from "../table";
import * as InsertSelectUtil from "./util";
import { QueryUtil } from "../query";
import { ColumnUtil } from "../column";
import { ColumnRefUtil } from "../column-ref";
import { IConnection } from "../execution";
export declare type InsertSelectRowDelegate<QueryT extends QueryUtil.AfterSelectClause, TableT extends ITable> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromSelectItemArray<QueryT["_selects"]>>) => InsertSelectRow<QueryT, TableT>);
export declare type InsertSelectRow<QueryT extends QueryUtil.AfterSelectClause, TableT extends ITable> = ({
    [name in TableUtil.RequiredColumnNames<TableT>]: (ReturnType<TableT["columns"][name]["assertDelegate"]> | Extract<ColumnUtil.FromColumnRef<ColumnRefUtil.FromSelectItemArray<QueryT["_selects"]>>, {
        assertDelegate: sd.AssertDelegate<ReturnType<TableT["columns"][name]["assertDelegate"]>>;
    }>);
} & {
    [name in TableUtil.OptionalColumnNames<TableT>]?: (ReturnType<TableT["columns"][name]["assertDelegate"]> | Extract<ColumnUtil.FromColumnRef<ColumnRefUtil.FromSelectItemArray<QueryT["_selects"]>>, {
        assertDelegate: sd.AssertDelegate<ReturnType<TableT["columns"][name]["assertDelegate"]>>;
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
    readonly _table: ITable & {
        insertAllowed: true;
    };
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
    execute(this: Extract<this, (IInsertSelect & {
        _row: InsertSelectRow<QueryUtil.AfterSelectClause, ITable>;
    })>, connection: IConnection): (Promise<InsertSelectUtil.Execute<Extract<this, (IInsertSelect & {
        _row: InsertSelectRow<QueryUtil.AfterSelectClause, ITable>;
    })>>>);
}
//# sourceMappingURL=insert-select.d.ts.map