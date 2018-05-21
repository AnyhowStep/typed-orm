import {AnyFetchRow} from "../fetch-row";

export type AggregateDelegate<FetchRowT extends AnyFetchRow> = (
    (row : FetchRowT) => any|Promise<any>
);