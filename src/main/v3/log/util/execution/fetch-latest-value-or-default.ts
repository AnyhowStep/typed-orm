import {EntityIdentifier, CompletedLog} from "../../log";
import {QueryUtil} from "../../../query";
import {IConnection} from "../../../execution";
import {LatestValueDelegate} from "./latest-value-delegate";
import {latestValue} from "./of-entity-identifier";

export function fetchLatestValueOrDefault<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> (
    log : LogT,
    connection : IConnection,
    entityIdentifier : EntityIdentifier<LogT>,
    delegate : DelegateT
) : Promise<
    ReturnType<
        LogT["table"]["columns"][
            ReturnType<DelegateT>["name"]
        ]["assertDelegate"]
    >
> {
    return QueryUtil.selectExpr(
        QueryUtil.newInstance(),
        (() => latestValue(log, entityIdentifier, delegate)) as any
    ).fetchValue(connection);
}