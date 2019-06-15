import * as sd from "type-mapping";
import { ILog, EntityIdentifier } from "../../log";
export declare function entityIdentifierAssertDelegate<LogT extends ILog & {
    entityIdentifier: string[];
}>(log: LogT): sd.SafeMapper<EntityIdentifier<LogT>>;
