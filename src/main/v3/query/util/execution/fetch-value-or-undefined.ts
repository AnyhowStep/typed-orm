import {MainQuery, OneSelectItemQuery} from "../predicate";
import {IConnection} from "../../../execution";
import {limit} from "../operation";
import {TooManyRowsFoundError} from "./error";
import {SelectItemUtil} from "../../../select-item";
import { fetchValueArray } from "./fetch-value-array";

export type FetchValueOrUndefined<
    QueryT extends MainQuery & OneSelectItemQuery<any>
> = (
    SelectItemUtil.TypeOf<QueryT["_selects"][0]>|undefined
);
export async function fetchValueOrUndefined<
    QueryT extends MainQuery & OneSelectItemQuery<any>
>(
    query : QueryT,
    connection : IConnection
) : Promise<FetchValueOrUndefined<QueryT>> {
    const result = await fetchValueArray(
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
        if (query._joins == undefined || query._joins.length == 0) {
            throw new TooManyRowsFoundError(`Expected zero or one value, fetched more than that`);
        } else {
            throw new TooManyRowsFoundError(`Expected zero or one value from ${query._joins[0].aliasedTable.alias}, fetched more than that`);
        }
    }
}