import {AfterSelectClause, MainQuery} from "../predicate";
import {IConnection} from "../../../execution";
import {MappedType} from "../operation";
import {fetchAllUnmapped} from "./fetch-all-unmapped";

export type FetchAll<
    QueryT extends AfterSelectClause & MainQuery
> = (
    MappedType<QueryT>[]
);
export async function fetchAll<
    QueryT extends AfterSelectClause & MainQuery
>(
    query : QueryT,
    connection : IConnection
) : Promise<FetchAll<QueryT>> {
    const unmappedRows : any[] = await fetchAllUnmapped(query, connection);
    if (unmappedRows.length == 0) {
        return unmappedRows;
    }

    if (query._mapDelegate == undefined) {
        return unmappedRows;
    } else {
        const rows : any[] = [];
        for (let unmapped of unmappedRows) {
            rows.push(
                await query._mapDelegate(unmapped, unmapped)
            );
        }
        return rows;
    }
}
