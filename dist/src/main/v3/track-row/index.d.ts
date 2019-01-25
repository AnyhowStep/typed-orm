import { LogNoTrackedDefaults, PreviousRow } from "../log";
import { InsertRowLiteral } from "../insert";
import { TableUtil } from "../table";
export declare type TrackRow<LogT extends LogNoTrackedDefaults> = ({
    readonly [columnName in LogT["tracked"][number]]?: (ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>);
} & {
    readonly [columnName in Extract<LogT["doNotCopy"][number], TableUtil.RequiredColumnNames<LogT["table"]>>]: (ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>);
} & {
    readonly [columnName in Extract<LogT["doNotCopy"][number], TableUtil.OptionalColumnNames<LogT["table"]>>]?: (ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>);
});
export declare namespace TrackRowUtil {
    function toInsertRowLiteral<LogT extends LogNoTrackedDefaults>(log: LogT, newRow: TrackRow<LogT>, prvRow: PreviousRow<LogT>): {
        changed: boolean;
        insertRow: InsertRowLiteral<LogT["table"]>;
    };
}
