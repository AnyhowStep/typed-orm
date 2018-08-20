//import {AnyFetchRow} from "../fetch-row";

export type AggregateDelegate<FetchRowT> = (
    (row : FetchRowT) => any|Promise<any>
);

//TODO Give this a better name
export type AggregateDelegatePeekOriginal<FetchRowT, OriginalFetchRowT> = (
    (row : FetchRowT, originalRow : OriginalFetchRowT) => any|Promise<any>
);