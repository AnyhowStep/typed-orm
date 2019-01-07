import {ITable} from "../../../table";
import {IConnection, DeleteZeroOrOneResult} from "../../../execution";
import {IAnonymousTypedExpr} from "../../../expr";
import {QueryUtil} from "../../../query";
import {from} from "./from";
import {DeleteUtil} from "../../../delete";
import {calculateDeleteOrder} from "./delete";

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
        const resultRef : any = await QueryUtil.fetchZeroOrOne(
            QueryUtil.select(
                QueryUtil.where(
                    from(table),
                    (() => where) as any
                ),
                ((c : any) => [c]) as any
            ),
            connection
        );
        //There may be tables in this array that cannot be deleted from.
        //This is not so bad. We let run-time errors catch it for now.
        //TODO-FEATURE, Implement way to check if a table and its parents
        //can all be deleted, shouldn't be too hard.
        const tables = calculateDeleteOrder(table);
        if (resultRef == undefined) {
            //Nothing to delete
            return {
                fieldCount   : -1,
                affectedRows : 0,
                //Should always be zero
                insertId     : 0,
                serverStatus : -1,
                warningCount : 0,
                message      : `No rows found for ${table.alias}, no rows deleted`,
                protocol41   : true,
                //Should always be zero
                changedRows  : 0,

                //Alias for affectedRows + warningCount
                rawFoundRowCount : 0,
                //Alias for affectedRows
                rawDeletedRowCount : 0,
                deletedTableCount : tables.length,
                foundRowCount : 0,
                deletedRowCount : 0,
            };
        }
        for (let t of tables) {
            await DeleteUtil.deleteOneByCk(
                connection,
                t as any,
                //This should have all the candidate key values we need.
                resultRef[t.alias]
            );
        }
        return {
            fieldCount   : -1,
            affectedRows : tables.length,
            //Should always be zero
            insertId     : 0,
            serverStatus : -1,
            warningCount : 0,
            message      : ``,
            protocol41   : true,
            //Should always be zero
            changedRows  : 0,

            //Alias for affectedRows + warningCount
            rawFoundRowCount : tables.length,
            //Alias for affectedRows
            rawDeletedRowCount : tables.length,
            deletedTableCount : tables.length,
            foundRowCount : 1,
            deletedRowCount : 1,
        };
    });
}