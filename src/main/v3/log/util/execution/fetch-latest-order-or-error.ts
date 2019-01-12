import {EntityIdentifier, LogNoTrackedDefaults} from "../../log";
import {QueryUtil} from "../../../query";
import {IConnection} from "../../../execution";
import {latestOrderQuery} from "./of-entity-identifier";

export function fetchLatestOrderOrError<
    LogT extends LogNoTrackedDefaults
> (
    log : LogT,
    connection : IConnection,
    entityIdentifier : EntityIdentifier<LogT>
) : Promise<
    ReturnType<
        LogT["latestOrder"][0]["assertDelegate"]
    >
> {
    return QueryUtil.fetchValue(
        latestOrderQuery(log, entityIdentifier),
        connection
    ) as Promise<any>;
}