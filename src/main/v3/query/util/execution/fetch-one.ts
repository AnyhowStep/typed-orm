import {AfterSelectClause, MainQuery} from "../predicate";
import {IConnection} from "../../../execution";
import {MappedType} from "../operation";
import {fetchZeroOrOne} from "./fetch-zero-or-one";
import {RowNotFoundError} from "./error";

export type FetchOne<
    QueryT extends AfterSelectClause & MainQuery
> = (
    MappedType<QueryT>
);
export async function fetchOne<
    QueryT extends AfterSelectClause & MainQuery
>(
    query : QueryT,
    connection : IConnection
) : Promise<FetchOne<QueryT>> {
    const result = await fetchZeroOrOne(
        query,
        connection
    );
    if (result == undefined) {
        throw new RowNotFoundError(`Expected one row, found zero`);
    } else {
        return result;
    }
}