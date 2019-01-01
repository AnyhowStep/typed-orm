import {ITable} from "../../../../table";
import {IConnection, DeleteZeroOrOneResult} from "../../../../execution";
import {QueryUtil} from "../../../../query";
import {TooManyRowsFoundError} from "../../../../query/util";
import {IAnonymousTypedExpr} from "../../../../expr";

//Not meant to be called directly
export function deleteZeroOrOne<
    TableT extends ITable & { deleteAllowed : true }
> (
    connection : IConnection,
    table : TableT,
    where : IAnonymousTypedExpr<boolean>
) : (
    Promise<DeleteZeroOrOneResult>
) {
    return connection.transactionIfNotInOne(async (connection) : Promise<DeleteZeroOrOneResult> => {
        const result = await QueryUtil.newInstance()
            .from(table as any)
            .where(() => where)
            .delete(() => [table])
            .execute(connection);
        if (result.rawDeletedRowCount == 0) {
            return {
                ...result,
                foundRowCount : result.rawDeletedRowCount,
                deletedRowCount : result.rawDeletedRowCount,
            };
        }
        if (result.rawDeletedRowCount == 1) {
            return {
                ...result,
                foundRowCount : result.rawDeletedRowCount,
                deletedRowCount : result.rawDeletedRowCount,
            };
        }
        throw new TooManyRowsFoundError(`Expected to delete zero or one row of ${table.alias}; found ${result.rawDeletedRowCount} rows`);
    })
}