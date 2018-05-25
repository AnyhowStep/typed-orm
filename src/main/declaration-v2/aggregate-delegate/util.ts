import {AggregateDelegate} from "./aggregate-delegate";
import {AnyFetchRow} from "../fetch-row";

export namespace AggregateDelegateUtil {
    export type Aggregate<
        FetchRowT extends AnyFetchRow,
        AggregateDelegateT extends AggregateDelegate<FetchRowT>|undefined
    > = (
        AggregateDelegateT extends AggregateDelegate<FetchRowT> ?
            ReturnType<AggregateDelegateT> :
            FetchRowT
    );
    export type AggregatedRow<
        FetchRowT extends AnyFetchRow,
        AggregateDelegateT extends AggregateDelegate<FetchRowT>|undefined
    > = (
        Aggregate<FetchRowT, AggregateDelegateT> extends Promise<infer R> ?
            R :
            Aggregate<FetchRowT, AggregateDelegateT>
    );
    export function aggregate<
        FetchRowT extends AnyFetchRow,
        AggregateDelegateT extends AggregateDelegate<FetchRowT>|undefined
    > (
        fetchRow : FetchRowT,
        aggregateDelegate : AggregateDelegateT
    ) : (
        Aggregate<FetchRowT, AggregateDelegateT>
    ) {
        if (aggregateDelegate == undefined) {
            return fetchRow as any;
        } else {
            return aggregateDelegate(fetchRow);
        }
    }
}