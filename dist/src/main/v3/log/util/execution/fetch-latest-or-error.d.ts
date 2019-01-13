import { EntityIdentifier, LogNoTrackedDefaults } from "../../log";
import { Row } from "../../../row";
import { IConnection } from "../../../execution";
export declare function fetchLatestOrError<LogT extends LogNoTrackedDefaults>(log: LogT, connection: IConnection, entityIdentifier: EntityIdentifier<LogT>): Promise<Row<LogT["table"]>>;
//# sourceMappingURL=fetch-latest-or-error.d.ts.map