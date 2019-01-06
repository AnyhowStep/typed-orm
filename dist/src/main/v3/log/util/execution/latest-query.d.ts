import { EntityIdentifier, LogNoTrackedDefaults } from "../../log";
import { QueryUtil } from "../../../query";
export declare type LatestQuery<LogT extends LogNoTrackedDefaults> = (QueryUtil.Limit<QueryUtil.OrderBy<QueryUtil.WhereEqColumns<QueryUtil.From<QueryUtil.NewInstance, LogT["table"]>>>, 1>);
export declare function latestQuery<LogT extends LogNoTrackedDefaults>(log: LogT, entityIdentifier: EntityIdentifier<LogT>): (LatestQuery<LogT>);
//# sourceMappingURL=latest-query.d.ts.map