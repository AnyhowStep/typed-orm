import {EntityIdentifier, LogNoTrackedDefaults} from "../../../log";
import {QueryUtil} from "../../../../query";
import {latest, Latest} from "./latest";

export type LatestOrderQuery<
    LogT extends LogNoTrackedDefaults
> = (
    QueryUtil.Select<
        Latest<LogT>,
        () => [
            LogT["latestOrder"][0]
        ]
    >
);
export function latestOrderQuery<
    LogT extends LogNoTrackedDefaults
> (
    log : LogT,
    entityIdentifier : EntityIdentifier<LogT>
) : (
    LatestOrderQuery<LogT>
) {
    return QueryUtil.select(
        latest(log, entityIdentifier),
        (() => [log.latestOrder[0]]) as any
    ) as any;
}