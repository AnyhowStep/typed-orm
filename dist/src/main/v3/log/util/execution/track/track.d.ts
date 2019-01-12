import { CompletedLog, EntityIdentifier, InsertableLog } from "../../../log";
import { TypeMapUtil } from "../../../../type-map";
import { IConnection } from "../../../../execution";
import { TrackRow } from "../../../../track-row";
export declare type TrackResult<LogT extends InsertableLog> = ({
    changed: true;
    row: TypeMapUtil.FromTable<LogT["table"]>;
} | {
    changed: false;
    row: undefined;
});
export declare function track<LogT extends CompletedLog & InsertableLog>(log: LogT, connection: IConnection, entityIdentifier: EntityIdentifier<LogT>, trackRow: TrackRow<LogT>): Promise<TrackResult<LogT>>;
//# sourceMappingURL=track.d.ts.map