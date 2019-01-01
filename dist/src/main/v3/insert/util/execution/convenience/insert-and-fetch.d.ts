import { ITable, TableUtil } from "../../../../table";
import { IConnection } from "../../../../execution";
import { InsertRow } from "../../../insert";
import { RawExpr, RawExprUtil } from "../../../../raw-expr";
export declare type InsertAndFetchResult<TableT extends ITable & {
    insertAllowed: true;
}, RowT extends InsertRow<TableT>> = ({
    readonly [columnName in Extract<keyof TableT["columns"], string>]: (columnName extends keyof RowT ? (RowT[columnName] extends RawExpr<ReturnType<TableT["columns"][columnName]["assertDelegate"]>> ? RawExprUtil.TypeOf<RowT[columnName]> : ReturnType<TableT["columns"][columnName]["assertDelegate"]>) : ReturnType<TableT["columns"][columnName]["assertDelegate"]>);
});
export declare function insertAndFetch<TableT extends ITable & {
    insertAllowed: true;
}, RowT extends InsertRow<TableT>>(connection: (IConnection & TableUtil.AssertHasCandidateKey<TableT>), table: TableT, insertRow: RowT): Promise<InsertAndFetchResult<TableT, RowT>>;
//# sourceMappingURL=insert-and-fetch.d.ts.map