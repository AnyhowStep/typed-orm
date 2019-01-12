import { CompletedLog, EntityIdentifier, PreviousRow } from "../../log";
import { TypeMapUtil } from "../../../type-map";
import { IConnection } from "../../../execution";
export declare type FetchLatestOrDefaultResult<LogT extends CompletedLog> = ({
    isDefault: false;
    latest: TypeMapUtil.FromTable<LogT["table"]>;
    row: PreviousRow<LogT>;
} | {
    isDefault: true;
    default: PreviousRow<LogT>;
    row: PreviousRow<LogT>;
});
export declare function fetchLatestOrDefault<LogT extends CompletedLog>(log: LogT, connection: IConnection, entityIdentifier: EntityIdentifier<LogT>): Promise<FetchLatestOrDefaultResult<LogT>>;
//# sourceMappingURL=fetch-latest-or-default.d.ts.map