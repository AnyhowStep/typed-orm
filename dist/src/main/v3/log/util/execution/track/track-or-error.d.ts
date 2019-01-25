import { EntityIdentifier, LogNoTrackedDefaults, InsertableLog } from "../../../log";
import { IConnection } from "../../../../execution";
import { TrackRow } from "../../../../track-row";
import { TrackResult } from "./track";
export declare function trackOrError<LogT extends LogNoTrackedDefaults & InsertableLog>(log: LogT, connection: IConnection, entityIdentifier: EntityIdentifier<LogT>, trackRow: TrackRow<LogT>): Promise<TrackResult<LogT>>;
