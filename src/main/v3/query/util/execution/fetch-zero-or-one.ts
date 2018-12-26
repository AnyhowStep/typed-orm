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
        limit(query, 2),
        connection
    );
    if (result.length == 0) {
        return undefined;
    } else if (result.length == 1) {
        return result[0];
    } else {
        throw new TooManyRowsFoundError(`Expected zero or one row, fetched more than that`);
    }
}