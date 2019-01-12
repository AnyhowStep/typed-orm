import { EntityIdentifier, LogNoTrackedDefaults } from "../../../log";
import { QueryUtil } from "../../../../query";
import { LatestValueDelegate } from "../latest-value-delegate";
import { Latest } from "./latest";
export declare type LatestValueQuery<LogT extends LogNoTrackedDefaults, DelegateT extends LatestValueDelegate<LogT>> = (QueryUtil.Select<Latest<LogT>, () => [LogT["table"]["columns"][ReturnType<DelegateT>["name"]]]>);
export declare function latestValueQuery<LogT extends LogNoTrackedDefaults, DelegateT extends LatestValueDelegate<LogT>>(log: LogT, entityIdentifier: EntityIdentifier<LogT>, delegate: DelegateT): (LatestValueQuery<LogT, DelegateT>);
//# sourceMappingURL=latest-value-query.d.ts.map