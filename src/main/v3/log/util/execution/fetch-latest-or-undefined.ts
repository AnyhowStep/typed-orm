import {LogNoTrackedDefaults, EntityIdentifier} from "../../log";
import {QueryUtil} from "../../../query";
import {TypeMapUtil} from "../../../type-map";
import {latestQuery} from "./latest-query";
import {IConnection} from "../../../execution";

export function fetchLatestOrUndefined<LogT extends LogNoTrackedDefaults> (
    log : LogT,
    entityIdentifier : EntityIdentifier<LogT>,
    connection : IConnection
) : Promise<TypeMapUtil.FromTable<LogT["table"]>|undefined> {
    return QueryUtil
        .select(
            latestQuery(log, entityIdentifier) as any,
            ((c : any) => [c]) as any
        )
        .fetchZeroOrOne(connection)
}