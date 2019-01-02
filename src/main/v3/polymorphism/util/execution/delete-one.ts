import {ITable} from "../../../table";
import {IConnection, DeleteOneResult} from "../../../execution";
import {IAnonymousTypedExpr} from "../../../expr";
import {QueryUtil} from "../../../query";
import {from} from "./from";
import {DeleteUtil} from "../../../delete";
import {TooManyRowsFoundError, RowNotFoundError} from "../../../query/util";

export function deleteOne<
    TableT extends ITable & { deleteAllowed : true }
> (
    connection : IConnection,
    table : TableT,
    where : IAnonymousTypedExpr<boolean>
) : Promise<DeleteOneResult> {
    if (table.parents.length == 0) {
        return DeleteUtil.deleteOne(connection, table, where);
    }
    return connection.transactionIfNotInOne(async (connection) : Promise<DeleteOneResult> => {
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
            throw new RowNotFoundError(`Expected to delete one row of ${table.alias}; found ${foundRowCount} rows`);
        }
        if (foundRowCount == 1) {
            return {
                ...result,
                foundRowCount : foundRowCount,
                deletedRowCount : foundRowCount,
            };
        }
        throw new TooManyRowsFoundError(`Expected to delete one row of ${table.alias}; found ${foundRowCount} rows`);
    });
}