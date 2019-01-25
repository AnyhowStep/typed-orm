import { LogNoTrackedDefaults, EntityIdentifier } from "../log";
import { TableUtil } from "../table";
import { TrackRow } from "../track-row";
import { IConnection } from "../execution";
import { InsertRowLiteral } from "../insert";
export declare type FilledTrackRow<LogT extends LogNoTrackedDefaults> = ({
    readonly [columnName in LogT["tracked"][number]]: (ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>);
} & {
    readonly [columnName in Extract<LogT["doNotCopy"][number], TableUtil.RequiredColumnNames<LogT["table"]>>]: (ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>);
} & {
    readonly [columnName in Extract<LogT["doNotCopy"][number], TableUtil.OptionalColumnNames<LogT["table"]>>]?: (ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>);
});
export declare namespace FilledTrackRowUtil {
    function isFilledTrackRow<LogT extends LogNoTrackedDefaults>(log: LogT, newRow: TrackRow<LogT>): newRow is FilledTrackRow<LogT>;
    function assertFilledTrackRow<LogT extends LogNoTrackedDefaults>(log: LogT, newRow: TrackRow<LogT>): FilledTrackRow<LogT>;
    function toInsertLiteralRow<LogT extends LogNoTrackedDefaults>(log: LogT, entityIdentifier: EntityIdentifier<LogT>, newRow: FilledTrackRow<LogT>, connection: IConnection): Promise<InsertRowLiteral<LogT["table"]>>;
}
