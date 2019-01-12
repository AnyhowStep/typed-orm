import {LogNoTrackedDefaults} from "../../log";
import {ColumnUtil} from "../../../column";

export type LatestValueDelegate<LogT extends LogNoTrackedDefaults> = (
    (
        columns : Pick<
            LogT["table"]["columns"],
            LogT["tracked"][number]
        >
    ) => ColumnUtil.FromColumnMap<Pick<
        LogT["table"]["columns"],
        LogT["tracked"][number]
    >>
);