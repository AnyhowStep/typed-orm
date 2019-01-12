import { LogNoTrackedDefaults, EntityIdentifier } from "../../log";
import { TypeMapUtil } from "../../../type-map";
import { IConnection } from "../../../execution";
export declare function fetchLatestOrUndefined<LogT extends LogNoTrackedDefaults>(log: LogT, connection: IConnection, entityIdentifier: EntityIdentifier<LogT>): Promise<TypeMapUtil.FromTable<LogT["table"]> | undefined>;
//# sourceMappingURL=fetch-latest-or-undefined.d.ts.map