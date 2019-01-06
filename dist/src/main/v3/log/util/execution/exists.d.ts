import { LogNoTrackedDefaults, EntityIdentifier } from "../../log";
import { IConnection } from "../../../execution";
export declare function exists<LogT extends LogNoTrackedDefaults>(log: LogT, entityIdentifier: EntityIdentifier<LogT>, connection: IConnection): Promise<boolean>;
//# sourceMappingURL=exists.d.ts.map