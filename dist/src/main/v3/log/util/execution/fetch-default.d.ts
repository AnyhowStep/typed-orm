import { CompletedLog, EntityIdentifier, PreviousRow } from "../../log";
import { IConnection } from "../../../execution";
export declare function fetchDefault<LogT extends CompletedLog>(log: LogT, entityIdentifier: EntityIdentifier<LogT>, connection: IConnection): Promise<PreviousRow<LogT>>;
//# sourceMappingURL=fetch-default.d.ts.map