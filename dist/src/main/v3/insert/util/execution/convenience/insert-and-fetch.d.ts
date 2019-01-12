import { InsertableTable, TableUtil } from "../../../../table";
import { IConnection } from "../../../../execution";
import { InsertRow } from "../../../insert";
import { RawExpr, RawExprUtil } from "../../../../raw-expr";
export declare type InsertAndFetchResult<TableT extends InsertableTable, RowT extends InsertRow<TableT>> = ({
    readonly [columnName in Extract<keyof TableT["columns"], string>]: (columnName extends keyof RowT ? (RowT[columnName] extends RawExpr<ReturnType<TableT["columns"][columnName]["assertDelegate"]>> ? RawExprUtil.TypeOf<RowT[columnName]> : ReturnType<TableT["columns"][columnName]["assertDelegate"]>) : ReturnType<TableT["columns"][columnName]["assertDelegate"]>);
});
export declare function insertAndFetch<TableT extends InsertableTable, RowT extends InsertRow<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, insertRow: RowT): Promise<InsertAndFetchResult<TableT, RowT>>;
//# sourceMappingURL=insert-and-fetch.d.ts.map