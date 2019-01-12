import {EntityIdentifier, LogNoTrackedDefaults} from "../../log";
import {QueryUtil} from "../../../query";
import {IConnection} from "../../../execution";
import {LatestValueDelegate} from "./latest-value-delegate";
import {latestValueQuery} from "./of-entity-identifier";

export function fetchLatestValueOrError<
    LogT extends LogNoTrackedDefaults,
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
    return QueryUtil.fetchValue(
        latestValueQuery(log, entityIdentifier, delegate),
        connection
    ) as Promise<any>;
}