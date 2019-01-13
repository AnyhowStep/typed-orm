import {LogNoTrackedDefaults, EntityIdentifier} from "../../log";
import {QueryUtil} from "../../../query";
import {Row} from "../../../row";
import {latest} from "./of-entity-identifier";
import {IConnection} from "../../../execution";

export function fetchLatestOrUndefined<LogT extends LogNoTrackedDefaults> (
    log : LogT,
    connection : IConnection,
    entityIdentifier : EntityIdentifier<LogT>
) : Promise<Row<LogT["table"]>|undefined> {
    return QueryUtil
        .select(
            latest(log, entityIdentifier) as any,
            ((c : any) => [c]) as any
        )
        .fetchZeroOrOne(connection)
}