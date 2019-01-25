import { LogNoTrackedDefaults } from "../../log";
import { ColumnUtil } from "../../../column";
export declare type LatestValueOrNullDelegate<LogT extends LogNoTrackedDefaults> = ((columns: Pick<LogT["table"]["columns"], (LogT["tracked"][number] | LogT["doNotCopy"][number])>) => ColumnUtil.FromColumnMap<Pick<LogT["table"]["columns"], (LogT["tracked"][number] | LogT["doNotCopy"][number])>>);
