import { CompletedLog } from "../../log";
import { QueryUtil } from "../../../query";
import { LatestSubQuery } from "./latest-sub-query";
import { LatestValueDelegate } from "./latest-value-query";
export declare type LatestValueSubQuery<LogT extends CompletedLog, DelegateT extends LatestValueDelegate<LogT>> = (QueryUtil.Select<LatestSubQuery<LogT>, () => [LogT["table"]["columns"][ReturnType<DelegateT>["name"]]]>);
export declare function latestValueSubQuery<LogT extends CompletedLog, DelegateT extends LatestValueDelegate<LogT>>(log: LogT, delegate: DelegateT): (LatestValueSubQuery<LogT, DelegateT>);
//# sourceMappingURL=latest-value-sub-query.d.ts.map