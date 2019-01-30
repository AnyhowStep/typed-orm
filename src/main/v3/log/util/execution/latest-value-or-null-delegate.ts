import {LogNoTrackedDefaults} from "../../log";
import {ColumnUtil} from "../../../column";

export type LatestValueOrNullDelegate<LogT extends LogNoTrackedDefaults> = (
    (
        columns : Pick<
            LogT["table"]["columns"],
            (
                LogT["table"]["generated"][number]|
                LogT["tracked"][number]|
                LogT["doNotCopy"][number]
            )
        >
    ) => ColumnUtil.FromColumnMap<Pick<
        LogT["table"]["columns"],
        (
            LogT["table"]["generated"][number]|
            LogT["tracked"][number]|
            LogT["doNotCopy"][number]
        )
    >>
);