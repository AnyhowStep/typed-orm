import {ITable} from "../../../table";
import {IConnection, DeleteZeroOrOneResult} from "../../../execution";
import {IAnonymousTypedExpr} from "../../../expr";
import {QueryUtil} from "../../../query";
import {from} from "./from";
import {DeleteUtil} from "../../../delete";
import {TooManyRowsFoundError} from "../../../query/util";

export function deleteZeroOrOne<
    TableT extends ITable & { deleteAllowed : true }
> (
    connection : IConnection,
    table : TableT,
    where : IAnonymousTypedExpr<boolean>
) : Promise<DeleteZeroOrOneResult> {
    if (table.parents.length == 0) {
        return DeleteUtil.deleteZeroOrOne(connection, table, where);
    }
    return connection.transactionIfNotInOne(async (connection) : Promise<DeleteZeroOrOneResult> => {
        const result = await DeleteUtil.delete(
            QueryUtil.where(
                from(table),
                () => where
            ),
            undefined,
            () => [...table.parents, table] as any
        ).execute(connection);
        const foundRowCount = result.rawFoundRowCount / result.deletedTableCount;
        if (foundRowCount == 0) {
            return {
                ...result,
                foundRowCount : foundRowCount,
                deletedRowCount : foundRowCount,
            };
        }
        if (foundRowCount == 1) {
            return {
                ...result,
                foundRowCount : foundRowCount,
                deletedRowCount : foundRowCount,
            };
        }
        throw new TooManyRowsFoundError(`Expected to delete zero or one row of ${table.alias}; found ${foundRowCount} rows`);
    });
}