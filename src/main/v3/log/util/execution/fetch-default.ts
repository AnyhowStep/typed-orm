import {CompletedLog, EntityIdentifier, PreviousRow} from "../../log";
import {IConnection} from "../../../execution";
import {entityIdentifierAssertDelegate} from "../operation";

export function fetchDefault<LogT extends CompletedLog> (
    log : LogT,
    entityIdentifier : EntityIdentifier<LogT>,
    connection : IConnection
) : Promise<PreviousRow<LogT>> {
    const assertDelegate = entityIdentifierAssertDelegate(log);
    entityIdentifier = assertDelegate(
        `${log.table.alias}.entityIdentifier`,
        entityIdentifier
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