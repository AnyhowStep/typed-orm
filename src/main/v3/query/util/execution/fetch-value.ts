import {MainQuery, OneSelectItemQuery} from "../predicate";
import {IConnection} from "../../../execution";
import {RowNotFoundError} from "./error";
import {fetchValueOrUndefined} from "./fetch-value-or-undefined";
import {SelectItemUtil} from "../../../select-item";

export type FetchValue<
    QueryT extends MainQuery & OneSelectItemQuery<any>
> = (
    SelectItemUtil.TypeOf<QueryT["_selects"][0]>
);
export async function fetchValue<
    QueryT extends MainQuery & OneSelectItemQuery<any>
>(
    query : QueryT,
    connection : IConnection
) : Promise<FetchValue<QueryT>> {
    const result = await fetchValueOrUndefined(
        query,
        connection
    );
    if (result === undefined) {
        if (query._joins == undefined || query._joins.length == 0) {
            throw new RowNotFoundError(`Expected one value, found zero`);
        } else {
            throw new RowNotFoundError(`Expected one value from ${query._joins[0].aliasedTable.alias}, found zero`);
        }
    } else {
        return result;
    }
}