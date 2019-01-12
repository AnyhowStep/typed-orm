import {EntityIdentifier, LogNoTrackedDefaults} from "../../log";
import {QueryUtil} from "../../../query";
import {TypeMapUtil} from "../../../type-map";
import {latest} from "./of-entity-identifier";
import {IConnection} from "../../../execution";

export function fetchLatestOrError<LogT extends LogNoTrackedDefaults> (
    log : LogT,
    connection : IConnection,
    entityIdentifier : EntityIdentifier<LogT>
) : Promise<TypeMapUtil.FromTable<LogT["table"]>> {
    return QueryUtil
        .select(
            latest(log, entityIdentifier) as any,
            ((c : any) => [c]) as any
        )
        .fetchOne(connection)
}