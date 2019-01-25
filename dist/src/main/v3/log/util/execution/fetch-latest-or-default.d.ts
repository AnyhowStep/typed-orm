import { CompletedLog, EntityIdentifier, PreviousRow } from "../../log";
import { Row } from "../../../row";
import { IConnection } from "../../../execution";
export declare type FetchLatestOrDefaultResult<LogT extends CompletedLog> = ({
    isDefault: false;
    latest: Row<LogT["table"]>;
    row: PreviousRow<LogT>;
} | {
    isDefault: true;
    latest: PreviousRow<LogT>;
    row: PreviousRow<LogT>;
    default: PreviousRow<LogT>;
});
export declare function fetchLatestOrDefault<LogT extends CompletedLog>(log: LogT, connection: IConnection, entityIdentifier: EntityIdentifier<LogT>): Promise<FetchLatestOrDefaultResult<LogT>>;
