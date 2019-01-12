import {EntityIdentifier, LogNoTrackedDefaults} from "../../../log";
import {QueryUtil} from "../../../../query";
import {ColumnMapUtil} from "../../../../column-map";
import {ColumnIdentifierMapUtil} from "../../../../column-identifier-map";
import {LatestValueDelegate} from "../latest-value-delegate";
import {latest, Latest} from "./latest";

export type LatestValueQuery<
    LogT extends LogNoTrackedDefaults,
    DelegateT extends LatestValueDelegate<LogT>
> = (
    QueryUtil.Select<
        Latest<LogT>,
        () => [
            LogT["table"]["columns"][ReturnType<DelegateT>["name"]]
        ]
    >
);
export function latestValueQuery<
    LogT extends LogNoTrackedDefaults,
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
        log.tracked
    );
    const column = delegate(columns);
    ColumnIdentifierMapUtil.assertHasColumnIdentifier(columns, column);

    return QueryUtil.select(
        latest(log, entityIdentifier),
        (() => [column]) as any
    );
}