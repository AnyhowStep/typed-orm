import { EntityIdentifier, LogNoTrackedDefaults } from "../../log";
import { IConnection } from "../../../execution";
import { LatestValueDelegate } from "./latest-value-delegate";
export declare function fetchLatestValueOrUndefined<LogT extends LogNoTrackedDefaults, DelegateT extends LatestValueDelegate<LogT>>(log: LogT, connection: IConnection, entityIdentifier: EntityIdentifier<LogT>, delegate: DelegateT): Promise<ReturnType<LogT["table"]["columns"][ReturnType<DelegateT>["name"]]["assertDelegate"]> | undefined>;
