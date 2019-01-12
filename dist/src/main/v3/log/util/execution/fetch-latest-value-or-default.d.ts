import { EntityIdentifier, CompletedLog } from "../../log";
import { IConnection } from "../../../execution";
import { LatestValueDelegate } from "./latest-value-delegate";
export declare function fetchLatestValueOrDefault<LogT extends CompletedLog, DelegateT extends LatestValueDelegate<LogT>>(log: LogT, connection: IConnection, entityIdentifier: EntityIdentifier<LogT>, delegate: DelegateT): Promise<ReturnType<LogT["table"]["columns"][ReturnType<DelegateT>["name"]]["assertDelegate"]>>;
//# sourceMappingURL=fetch-latest-value-or-default.d.ts.map