import { EntityIdentifier, LogNoTrackedDefaults } from "../../log";
import { TypeMapUtil } from "../../../type-map";
import { IConnection } from "../../../execution";
export declare function fetchLatestOrError<LogT extends LogNoTrackedDefaults>(log: LogT, connection: IConnection, entityIdentifier: EntityIdentifier<LogT>): Promise<TypeMapUtil.FromTable<LogT["table"]>>;
//# sourceMappingURL=fetch-latest-or-error.d.ts.map