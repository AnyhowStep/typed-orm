import {CompletedLog, EntityIdentifier} from "../../log";
import {QueryUtil} from "../../../query";
import {ColumnMapUtil} from "../../../column-map";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";
import {ALIASED} from "../../../constants";
import {ExprUtil, IExpr} from "../../../expr";
import {latestValueQuery, LatestValueDelegate} from "./latest-value-query";

export type LatestValueExpr<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> = (
    ExprUtil.As<
        IExpr<{
            usedRef : {},
            assertDelegate : (
                LogT["table"]["columns"][
                    ReturnType<DelegateT>["name"]
                ]["assertDelegate"]
            ),
            tableAlias : typeof ALIASED,
        }>,
        ReturnType<DelegateT>["name"]
    >
);
export function latestValueExpr<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> (
    log : LogT,
    entityIdentifier : EntityIdentifier<LogT>,
    delegate : DelegateT
) : (
    LatestValueExpr<LogT, DelegateT>
) {
    const columns = ColumnMapUtil.pick(
        log.table.columns,
        Object.keys(log.trackedDefaults)
    );
    const column = delegate(columns);
    ColumnIdentifierMapUtil.assertHasColumnIdentifier(columns, column);

    return QueryUtil.coalesce(
        latestValueQuery(log, entityIdentifier, delegate),
        log.trackedDefaults[column.name]
    ).as(column.name);
}