import { CompletedLog, EntityIdentifier } from "../../log";
import { QueryUtil } from "../../../query";
export declare type LatestQuery<LogT extends CompletedLog> = (QueryUtil.Limit<QueryUtil.OrderBy<QueryUtil.WhereEqColumns<QueryUtil.From<QueryUtil.NewInstance, LogT["table"]>>>, 1>);
export declare function latestQuery<LogT extends CompletedLog>(log: LogT, entityIdentifier: EntityIdentifier<LogT>): (LatestQuery<LogT>);
//# sourceMappingURL=latest-query.d.ts.map