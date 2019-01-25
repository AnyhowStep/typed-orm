import { EntityIdentifier, LogNoTrackedDefaults } from "../../../log";
import { QueryUtil } from "../../../../query";
export declare type Latest<LogT extends LogNoTrackedDefaults> = (QueryUtil.Limit<QueryUtil.OrderBy<QueryUtil.WhereEqColumns<QueryUtil.From<QueryUtil.NewInstance, LogT["table"]>>>, 1>);
export declare function latest<LogT extends LogNoTrackedDefaults>(log: LogT, entityIdentifier: EntityIdentifier<LogT>): (Latest<LogT>);
