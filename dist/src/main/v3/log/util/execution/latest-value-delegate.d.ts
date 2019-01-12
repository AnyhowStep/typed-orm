import { LogNoTrackedDefaults } from "../../log";
import { ColumnUtil } from "../../../column";
export declare type LatestValueDelegate<LogT extends LogNoTrackedDefaults> = ((columns: Pick<LogT["table"]["columns"], LogT["tracked"][number]>) => ColumnUtil.FromColumnMap<Pick<LogT["table"]["columns"], LogT["tracked"][number]>>);
//# sourceMappingURL=latest-value-delegate.d.ts.map