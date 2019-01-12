import { EntityIdentifier, LogNoTrackedDefaults } from "../../../log";
import { QueryUtil } from "../../../../query";
import { Latest } from "./latest";
export declare type LatestOrderQuery<LogT extends LogNoTrackedDefaults> = (QueryUtil.Select<Latest<LogT>, () => [LogT["latestOrder"][0]]>);
export declare function latestOrderQuery<LogT extends LogNoTrackedDefaults>(log: LogT, entityIdentifier: EntityIdentifier<LogT>): (LatestOrderQuery<LogT>);
//# sourceMappingURL=latest-order-query.d.ts.map