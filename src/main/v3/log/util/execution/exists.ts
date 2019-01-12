import {LogNoTrackedDefaults, EntityIdentifier} from "../../log";
import {IConnection} from "../../../execution";
import {entityIdentifierAssertDelegate} from "../operation";
import {QueryUtil} from "../../../query";

export function exists<LogT extends LogNoTrackedDefaults> (
    log : LogT,
    connection : IConnection,
    entityIdentifier : EntityIdentifier<LogT>
) : Promise<boolean> {
    const assertDelegate = entityIdentifierAssertDelegate(log);
    entityIdentifier = assertDelegate(
        `${log.table.alias}.entityIdentifier`,
        entityIdentifier
    );
    return QueryUtil.newInstance()
        .from(log.table as any)
        .whereEqColumns(log.table, entityIdentifier)
        .exists(connection);
}