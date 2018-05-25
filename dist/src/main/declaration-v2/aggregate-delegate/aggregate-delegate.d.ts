import { AnyFetchRow } from "../fetch-row";
export declare type AggregateDelegate<FetchRowT extends AnyFetchRow> = ((row: FetchRowT) => any | Promise<any>);
