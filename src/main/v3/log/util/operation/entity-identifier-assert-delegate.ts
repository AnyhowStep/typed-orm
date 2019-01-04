import * as sd from "schema-decorator";
import {ILog, EntityIdentifier} from "../../log";

export function entityIdentifierAssertDelegate<LogT extends ILog & { entityIdentifier : string[] }> (
    log : LogT
) : sd.AssertDelegate<EntityIdentifier<LogT>> {
    const obj : any = {};
    for (let columnName of log.entityIdentifier) {
        obj[columnName] = log.table.columns[columnName].assertDelegate;
    }
    return sd.toSchema(obj) as any;
}