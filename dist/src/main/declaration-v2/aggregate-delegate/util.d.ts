import { AggregateDelegate } from "./aggregate-delegate";
import { AnyFetchRow } from "../fetch-row";
export declare namespace AggregateDelegateUtil {
    type Aggregate<FetchRowT extends AnyFetchRow, AggregateDelegateT extends AggregateDelegate<FetchRowT> | undefined> = (AggregateDelegateT extends AggregateDelegate<FetchRowT> ? ReturnType<AggregateDelegateT> : FetchRowT);
    type AggregatedRow<FetchRowT extends AnyFetchRow, AggregateDelegateT extends AggregateDelegate<FetchRowT> | undefined> = (Aggregate<FetchRowT, AggregateDelegateT> extends Promise<infer R> ? R : Aggregate<FetchRowT, AggregateDelegateT>);
    function aggregate<FetchRowT extends AnyFetchRow, AggregateDelegateT extends AggregateDelegate<FetchRowT> | undefined>(fetchRow: FetchRowT, aggregateDelegate: AggregateDelegateT): (Aggregate<FetchRowT, AggregateDelegateT>);
}
