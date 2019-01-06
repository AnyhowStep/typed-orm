import { EntityIdentifier, CompletedLog } from "../../log";
import { IConnection } from "../../../execution";
import { LatestValueDelegate } from "./latest-value-query";
export declare function fetchLatestValueOrError<LogT extends CompletedLog, DelegateT extends LatestValueDelegate<LogT>>(log: LogT, entityIdentifier: EntityIdentifier<LogT>, delegate: DelegateT, connection: IConnection): Promise<ReturnType<LogT["table"]["columns"][ReturnType<DelegateT>["name"]]["assertDelegate"]> | undefined>;
//# sourceMappingURL=fetch-latest-value-or-error.d.ts.map