import { CompletedLog, EntityIdentifier, LogNoTrackedDefaults } from "../../log";
import { TypeMapUtil } from "../../../type-map";
import { IConnection } from "../../../execution";
import { ITable } from "../../../table";
import { TrackRow } from "../../../track-row";
export declare type TrackResult<LogT extends LogNoTrackedDefaults & {
    table: ITable & {
        insertAllowed: true;
    };
}> = ({
    changed: true;
    row: TypeMapUtil.FromTable<LogT["table"]>;
} | {
    changed: false;
    row: undefined;
});
export declare function track<LogT extends CompletedLog & {
    table: ITable & {
        insertAllowed: true;
    };
}>(log: LogT, entityIdentifier: EntityIdentifier<LogT>, trackRow: TrackRow<LogT>, connection: IConnection): Promise<TrackResult<LogT>>;
//# sourceMappingURL=track.d.ts.map