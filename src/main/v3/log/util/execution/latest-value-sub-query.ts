import {CompletedLog} from "../../log";
import {QueryUtil} from "../../../query";
import {latestSubQuery, LatestSubQuery} from "./latest-sub-query";
import {LatestValueDelegate} from "./latest-value-query";
import {ColumnMapUtil} from "../../../column-map";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";

export type LatestValueSubQuery<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> = (
    QueryUtil.Select<
        LatestSubQuery<LogT>,
        () => [
            LogT["table"]["columns"][
                ReturnType<DelegateT>["name"]
            ]
        ]
    >
);
export function latestValueSubQuery<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> (
    log : LogT,
    delegate : DelegateT
) : (
    LatestValueSubQuery<LogT, DelegateT>
) {
    const columns = ColumnMapUtil.pick(
        log.table.columns,
        Object.keys(log.trackedDefaults)
    );
    const column = delegate(columns);
    ColumnIdentifierMapUtil.assertHasColumnIdentifier(columns, column);

    return QueryUtil.select(
        latestSubQuery(log),
        (() => [column]) as any
    );
}