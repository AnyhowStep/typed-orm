import {MainQuery, OneSelectItemQuery, isOneSelectItemQuery} from "../predicate";
import {IConnection} from "../../../execution";
import {fetchAllUnmapped} from "./fetch-all-unmapped";
import {SelectItemUtil} from "../../../select-item";
import {NoColumnsSelectedError, TooManyColumnsSelectedError} from "./error";

export type FetchValueArray<
    QueryT extends MainQuery & OneSelectItemQuery<any>
> = (
    SelectItemUtil.TypeOf<QueryT["_selects"][0]>[]
);
export async function fetchValueArray<
    QueryT extends MainQuery & OneSelectItemQuery<any>
>(
    query : QueryT,
    connection : IConnection
) : Promise<FetchValueArray<QueryT>> {
    if (!isOneSelectItemQuery(query)) {
        throw new Error("Expected a query with one select item");
    }

    const unmappedRows : any[] = await fetchAllUnmapped(query, connection);
    if (unmappedRows.length == 0) {
        return unmappedRows;
    }

    const keys = Object.keys(unmappedRows[0]);
    if (keys.length == 0) {
        if (query._joins == undefined || query._joins.length == 0) {
            throw new NoColumnsSelectedError(`No columns were selected`);
        } else {
            throw new NoColumnsSelectedError(`No columns were selected from ${query._joins[0].aliasedTable.alias}`);
        }
    } else if (keys.length > 1) {
        if (query._joins == undefined || query._joins.length == 0) {
            throw new TooManyColumnsSelectedError(`Too many columns were selected`);
        } else {
            throw new TooManyColumnsSelectedError(`Too many columns were selected from ${query._joins[0].aliasedTable.alias}`);
        }
    }
    const key = keys[0];

    return unmappedRows.map(row => row[key]);
}
