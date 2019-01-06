import {CompletedLog, EntityIdentifier} from "../../log";
import {QueryUtil} from "../../../query";
import {ColumnUtil} from "../../../column";
import {latestQuery, LatestQuery} from "./latest-query";
import {ColumnMapUtil} from "../../../column-map";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";

export type LatestValueQuery<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> = (
    QueryUtil.Select<
        LatestQuery<LogT>,
        () => [
            LogT["table"]["columns"][
                ReturnType<DelegateT>["name"]
            ]
        ]
    >
);
export type LatestValueDelegate<LogT extends CompletedLog> = (
    (
        columns : Pick<
            LogT["table"]["columns"],
            Extract<keyof LogT["trackedDefaults"], string>
        >
    ) => ColumnUtil.FromColumnMap<Pick<
        LogT["table"]["columns"],
        Extract<keyof LogT["trackedDefaults"], string>
    >>
);
export function latestValueQuery<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> (
    log : LogT,
    entityIdentifier : EntityIdentifier<LogT>,
    delegate : DelegateT
) : (
    LatestValueQuery<LogT, DelegateT>
) {
    const columns = ColumnMapUtil.pick(
        log.table.columns,
        Object.keys(log.trackedDefaults)
    );
    const column = delegate(columns);
    ColumnIdentifierMapUtil.assertHasColumnIdentifier(columns, column);

    return QueryUtil.select(
        latestQuery(log, entityIdentifier),
        (() => [column]) as any
    );
}