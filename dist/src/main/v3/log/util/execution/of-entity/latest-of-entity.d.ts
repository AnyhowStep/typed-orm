import { LogNoTrackedDefaults } from "../../../log";
import { QueryUtil } from "../../../../query";
export declare type LatestOfEntity<LogT extends LogNoTrackedDefaults> = (QueryUtil.Limit<QueryUtil.OrderBy<QueryUtil.Where<QueryUtil.From<QueryUtil.RequireParentJoins<QueryUtil.NewInstance, false, [LogT["entity"]]>, LogT["table"]>>>, 1>);
export declare function latestOfEntity<LogT extends LogNoTrackedDefaults>(log: LogT): (LatestOfEntity<LogT>);
