import { CompletedLog, EntityIdentifier, InsertableLog } from "../../../log";
import { Row } from "../../../../row";
import { IConnection } from "../../../../execution";
import { TrackRow } from "../../../../track-row";
export declare type TrackResult<LogT extends InsertableLog> = ({
    changed: true;
    row: Row<LogT["table"]>;
} | {
    changed: false;
    row: undefined;
});
export declare function track<LogT extends CompletedLog & InsertableLog>(log: LogT, connection: IConnection, entityIdentifier: EntityIdentifier<LogT>, trackRow: TrackRow<LogT>): Promise<TrackResult<LogT>>;
//# sourceMappingURL=track.d.ts.map