import * as sd from "type-mapping";
import {ILog, EntityIdentifier} from "../../log";

export function entityIdentifierAssertDelegate<LogT extends ILog & { entityIdentifier : string[] }> (
    log : LogT
) : sd.SafeMapper<EntityIdentifier<LogT>> {
    const obj : any = {};
    for (let columnName of log.entityIdentifier) {
        obj[columnName] = log.table.columns[columnName].assertDelegate;
    }
    return sd.objectFromMap(obj) as any;
}