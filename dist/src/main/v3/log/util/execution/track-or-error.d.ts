import { EntityIdentifier, LogNoTrackedDefaults } from "../../log";
import { IConnection } from "../../../execution";
import { ITable } from "../../../table";
import { TrackRow } from "../../../track-row";
import { TrackResult } from "./track";
export declare function trackOrError<LogT extends LogNoTrackedDefaults & {
    table: ITable & {
        insertAllowed: true;
    };
}>(log: LogT, entityIdentifier: EntityIdentifier<LogT>, trackRow: TrackRow<LogT>, connection: IConnection): Promise<TrackResult<LogT>>;
//# sourceMappingURL=track-or-error.d.ts.map