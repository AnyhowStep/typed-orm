import { LogNoTrackedDefaults, EntityIdentifier } from "../../log";
import { IConnection } from "../../../execution";
export declare function exists<LogT extends LogNoTrackedDefaults>(log: LogT, connection: IConnection, entityIdentifier: EntityIdentifier<LogT>): Promise<boolean>;
//# sourceMappingURL=exists.d.ts.map