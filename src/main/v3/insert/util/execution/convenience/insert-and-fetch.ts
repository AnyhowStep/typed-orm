import {ITable, TableUtil} from "../../../../table";
import {IConnection} from "../../../../execution";
import {InsertRow} from "../../../insert";
import {executeAndFetch} from "../execute-and-fetch";
import {insertInto} from "../../constructor";
import { RawExpr, RawExprUtil } from "../../../../raw-expr";

export type InsertAndFetchResult<
    TableT extends ITable & { insertAllowed : true },
    RowT extends InsertRow<TableT>
> = (
    {
        readonly [columnName in Extract<keyof TableT["columns"], string>] : (
            columnName extends keyof RowT ?
            (
                RowT[columnName] extends RawExpr<
                    ReturnType<TableT["columns"][columnName]["assertDelegate"]>
                > ?
                RawExprUtil.TypeOf<RowT[columnName]> :
                ReturnType<TableT["columns"][columnName]["assertDelegate"]>
            ) :
            ReturnType<TableT["columns"][columnName]["assertDelegate"]>
        )
    }
);
export async function insertAndFetch<
    TableT extends ITable & { insertAllowed : true },
    RowT extends InsertRow<TableT>
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    insertRow : RowT
) : Promise<InsertAndFetchResult<TableT, RowT>> {
    return executeAndFetch(
        insertInto<TableT>(table)
            .values(insertRow),
        connection as any
    ) as any;
}