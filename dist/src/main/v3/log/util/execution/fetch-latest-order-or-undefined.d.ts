import { EntityIdentifier, LogNoTrackedDefaults } from "../../log";
import { IConnection } from "../../../execution";
export declare function fetchLatestOrderOrUndefined<LogT extends LogNoTrackedDefaults>(log: LogT, connection: IConnection, entityIdentifier: EntityIdentifier<LogT>): Promise<ReturnType<LogT["latestOrder"][0]["assertDelegate"]> | undefined>;
//# sourceMappingURL=fetch-latest-order-or-undefined.d.ts.map