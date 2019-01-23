import {CompletedLog, EntityIdentifier, PreviousRow} from "../../log";
import {IConnection} from "../../../execution";
import {entityIdentifierAssertDelegate} from "../operation";
import {QueryUtil} from "../../../query";

export async function fetchDefault<LogT extends CompletedLog> (
    log : LogT,
    connection : IConnection,
    entityIdentifier : EntityIdentifier<LogT>
) : Promise<PreviousRow<LogT>> {
    const assertDelegate = entityIdentifierAssertDelegate(log);
    entityIdentifier = assertDelegate(
        `${log.table.alias}.entityIdentifier`,
        entityIdentifier
    );
    //If the entity does not exist, there is no default value
    await QueryUtil.assertExistsByCk(
        connection,
        log.entity,
        entityIdentifier as any
    );
    return log.copyDefaultsDelegate({
        entityIdentifier,
        connection
    }).then((copyDefaults) : PreviousRow<LogT> => {
        return {
            ...copyDefaults,
            ...log.trackedDefaults,
            ...entityIdentifier,
        } as unknown as PreviousRow<LogT>;
    });
}