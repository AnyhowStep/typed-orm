import {DeletableTable} from "../../../../table";
import {IConnection, DeleteOneResult} from "../../../../execution";
import {QueryUtil} from "../../../../query";
import {TooManyRowsFoundError, RowNotFoundError} from "../../../../query/util";
import {IAnonymousTypedExpr} from "../../../../expr";

//Not meant to be called directly
export function deleteOne<
    TableT extends DeletableTable
> (
    connection : IConnection,
    table : TableT,
    where : IAnonymousTypedExpr<boolean>
) : (
    Promise<DeleteOneResult>
) {
    return connection.transactionIfNotInOne(async (connection) : Promise<DeleteOneResult> => {
        const result = await QueryUtil.newInstance()
            .from(table as any)
            .__unsafeWhere(() => where)
            .delete(() => [table])
            .execute(connection);
        if (result.rawDeletedRowCount == 0) {
            throw new RowNotFoundError(`Expected to delete one row of ${table.alias}; found ${result.rawDeletedRowCount} rows`);
        }
        if (result.rawDeletedRowCount == 1) {
            return {
                ...result,
                foundRowCount : result.rawDeletedRowCount,
                deletedRowCount : result.rawDeletedRowCount,
            };
        }
        throw new TooManyRowsFoundError(`Expected to delete one row of ${table.alias}; found ${result.rawDeletedRowCount} rows`);
    })
}