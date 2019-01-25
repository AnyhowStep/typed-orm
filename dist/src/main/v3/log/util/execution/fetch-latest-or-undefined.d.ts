import { LogNoTrackedDefaults, EntityIdentifier } from "../../log";
import { Row } from "../../../row";
import { IConnection } from "../../../execution";
export declare function fetchLatestOrUndefined<LogT extends LogNoTrackedDefaults>(log: LogT, connection: IConnection, entityIdentifier: EntityIdentifier<LogT>): Promise<Row<LogT["table"]> | undefined>;
