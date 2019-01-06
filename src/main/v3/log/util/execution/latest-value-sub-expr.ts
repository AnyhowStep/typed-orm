import {CompletedLog} from "../../log";
import {QueryUtil} from "../../../query";
import {ColumnMapUtil} from "../../../column-map";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";
import {ALIASED} from "../../../constants";
import {ExprUtil, IExpr} from "../../../expr";
import {LatestValueDelegate} from "./latest-value-query";
import {latestValueSubQuery} from "./latest-value-sub-query";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnUtil} from "../../../column";

export type LatestValueSubExpr<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> = (
    ExprUtil.As<
        IExpr<{
            usedRef : ColumnRefUtil.FromColumnArray<
                ColumnUtil.FromColumnMap<LogT["entity"]["columns"]>[]
            >,
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
export function latestValueSubExpr<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> (
    log : LogT,
    delegate : DelegateT
) : (
    LatestValueSubExpr<LogT, DelegateT>
) {
    const columns = ColumnMapUtil.pick(
        log.table.columns,
        Object.keys(log.trackedDefaults)
    );
    const column = delegate(columns);
    ColumnIdentifierMapUtil.assertHasColumnIdentifier(columns, column);

    return QueryUtil.coalesce(
        latestValueSubQuery(log, delegate),
        log.trackedDefaults[column.name]
    ).as(column.name);
}