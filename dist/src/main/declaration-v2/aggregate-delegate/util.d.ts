import { AggregateDelegate, AggregateDelegatePeekOriginal } from "./aggregate-delegate";
export declare namespace AggregateDelegateUtil {
    type AggregatedRow<FetchRowT, AggregateDelegateT extends AggregateDelegate<FetchRowT> | AggregateDelegatePeekOriginal<FetchRowT, any> | undefined> = (AggregateDelegateT extends (...args: any[]) => infer R ? (R extends Promise<infer PromiseR> ? PromiseR : R) : FetchRowT);
    function isAggregateDelegate<T extends AggregateDelegate<any> | AggregateDelegatePeekOriginal<any, any>>(mixed: T): mixed is Extract<T, AggregateDelegate<any>>;
}
//# sourceMappingURL=util.d.ts.map