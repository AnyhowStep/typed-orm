import {MainQuery} from "../predicate";
import {IConnection} from "../../../execution";
import {exists} from "./exists";
import {RowNotFoundError} from "./error";

export async function assertExists(
    query : MainQuery,
    connection : IConnection
) : Promise<void> {
    const found = await exists(query, connection);
    if (!found) {
        if (query._joins == undefined || query._joins.length == 0) {
            throw new RowNotFoundError(`Row does not exist`);
        } else {
            throw new RowNotFoundError(`Row of ${query._joins[0].aliasedTable.alias} does not exist`);
        }
    }
}