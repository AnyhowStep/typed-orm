//import {AnyFetchRow} from "../fetch-row";

export type AggregateDelegate<FetchRowT> = (
    (row : FetchRowT) => any|Promise<any>
);