import { AggregateDelegate } from "./aggregate-delegate";
export declare namespace AggregateDelegateUtil {
    type Aggregate<FetchRowT, AggregateDelegateT extends AggregateDelegate<FetchRowT> | undefined> = (AggregateDelegateT extends AggregateDelegate<any> ? ReturnType<AggregateDelegateT> : FetchRowT);
    type AggregatedRow<FetchRowT, AggregateDelegateT extends AggregateDelegate<FetchRowT> | undefined> = (AggregateDelegateT extends (...args: any[]) => infer R ? (R extends Promise<infer PromiseR> ? PromiseR : R) : FetchRowT);
    function aggregate<FetchRowT, AggregateDelegateT extends AggregateDelegate<FetchRowT> | undefined>(fetchRow: FetchRowT, aggregateDelegate: AggregateDelegateT): (Aggregate<FetchRowT, AggregateDelegateT>);
}
//# sourceMappingURL=util.d.ts.map