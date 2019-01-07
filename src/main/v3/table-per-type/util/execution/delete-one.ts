import {ITable} from "../../../table";
import {IConnection, DeleteOneResult} from "../../../execution";
import {IAnonymousTypedExpr} from "../../../expr";
import {RowNotFoundError} from "../../../query/util";
import {deleteZeroOrOne} from "./delete-zero-or-one";

export async function deleteOne<
    TableT extends ITable & { deleteAllowed : true }
> (
    connection : IConnection,
    table : TableT,
    where : IAnonymousTypedExpr<boolean>
) : Promise<DeleteOneResult> {
    const deleteResult = await deleteZeroOrOne(
        connection,
        table,
        where
    );
    if (deleteResult.deletedRowCount == 0) {
        throw new RowNotFoundError(`Expected to delete one row of ${table.alias}; found ${deleteResult.deletedRowCount} rows`);
    }
    return deleteResult;
}