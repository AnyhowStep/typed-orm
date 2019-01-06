import { LogNoTrackedDefaults } from "../../log";
import { QueryUtil } from "../../../query";
export declare type LatestSubQuery<LogT extends LogNoTrackedDefaults> = (QueryUtil.Limit<QueryUtil.OrderBy<QueryUtil.Where<QueryUtil.From<QueryUtil.RequireParentJoins<QueryUtil.NewInstance, false, [LogT["entity"]]>, LogT["table"]>>>, 1>);
export declare function latestSubQuery<LogT extends LogNoTrackedDefaults>(log: LogT): (LatestSubQuery<LogT>);
//# sourceMappingURL=latest-sub-query.d.ts.map