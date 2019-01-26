import {AggregateDelegate, AggregateDelegatePeekOriginal} from "./aggregate-delegate";
//import {AnyFetchRow} from "../fetch-row";

export namespace AggregateDelegateUtil {
    export type AggregatedRow<
        FetchRowT,
        AggregateDelegateT extends AggregateDelegate<FetchRowT>|AggregateDelegatePeekOriginal<FetchRowT, any>|undefined
    > = (
        AggregateDelegateT extends (...args : any[]) => infer R ?
        (
            R extends Promise<infer PromiseR> ?
            PromiseR :
            R
        ) :
        FetchRowT
    );

    export function isAggregateDelegate<
        T extends AggregateDelegate<any>|AggregateDelegatePeekOriginal<any, any>
    > (mixed : T) : mixed is Extract<T, AggregateDelegate<any>> {
        return mixed.length < 2;
    }
}