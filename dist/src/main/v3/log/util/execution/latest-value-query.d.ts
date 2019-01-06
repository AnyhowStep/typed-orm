import { CompletedLog, EntityIdentifier } from "../../log";
import { QueryUtil } from "../../../query";
import { ColumnUtil } from "../../../column";
import { LatestQuery } from "./latest-query";
export declare type LatestValueQuery<LogT extends CompletedLog, DelegateT extends LatestValueDelegate<LogT>> = (QueryUtil.Select<LatestQuery<LogT>, () => [LogT["table"]["columns"][ReturnType<DelegateT>["name"]]]>);
export declare type LatestValueDelegate<LogT extends CompletedLog> = ((columns: Pick<LogT["table"]["columns"], Extract<keyof LogT["trackedDefaults"], string>>) => ColumnUtil.FromColumnMap<Pick<LogT["table"]["columns"], Extract<keyof LogT["trackedDefaults"], string>>>);
export declare function latestValueQuery<LogT extends CompletedLog, DelegateT extends LatestValueDelegate<LogT>>(log: LogT, entityIdentifier: EntityIdentifier<LogT>, delegate: DelegateT): (LatestValueQuery<LogT, DelegateT>);
//# sourceMappingURL=latest-value-query.d.ts.map