import {AfterSelectClause, MainQuery} from "../predicate";
import {IConnection} from "../../../execution";
import {MappedType} from "../operation";
import {fetchAll} from "./fetch-all";
import {limit} from "../operation";
import {TooManyRowsFoundError} from "./error";

export type FetchZeroOrOne<
    QueryT extends AfterSelectClause & MainQuery
> = (
    MappedType<QueryT>|undefined
);
export async function fetchZeroOrOne<
    QueryT extends AfterSelectClause & MainQuery
>(
    query : QueryT,
    connection : IConnection
) : Promise<FetchZeroOrOne<QueryT>> {
    const result = await fetchAll(
        /*
            We use LIMIT 2,
            because if we fetch more than one row,
            we've messed up.

            But I don't want to fetch 1 million rows if we mess up.
            This limits our failure.
        */
        (query._limit == undefined) ?
            limit(query, 2) :
            //The user already specified a custom limit.
            //We don't want to mess with it.
            query,
        connection
    );
    if (result.length == 0) {
        return undefined;
    } else if (result.length == 1) {
        return result[0];
    } else {
        if (query._joins == undefined || query._joins.length == 0) {
            throw new TooManyRowsFoundError(`Expected zero or one row, fetched more than that`);
        } else {
            throw new TooManyRowsFoundError(`Expected zero or one row from ${query._joins[0].aliasedTable.alias}, fetched more than that`);
        }
    }
}