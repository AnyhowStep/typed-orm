import * as sd from "schema-decorator";
import { ILog, EntityIdentifier } from "../../log";
export declare function entityIdentifierAssertDelegate<LogT extends ILog & {
    entityIdentifier: string[];
}>(log: LogT): sd.AssertDelegate<EntityIdentifier<LogT>>;
