import { EntityIdentifier, LogNoTrackedDefaults } from "../../log";
import { IConnection } from "../../../execution";
export declare function fetchLatestOrderOrError<LogT extends LogNoTrackedDefaults>(log: LogT, connection: IConnection, entityIdentifier: EntityIdentifier<LogT>): Promise<ReturnType<LogT["latestOrder"][0]["assertDelegate"]>>;
//# sourceMappingURL=fetch-latest-order-or-error.d.ts.map