import {CompletedLog} from "../../../log";
import {QueryUtil} from "../../../../query";
import {ALIASED} from "../../../../constants";
import {ExprUtil, IExpr} from "../../../../expr";
import {ColumnRefUtil} from "../../../../column-ref";
import {ColumnUtil} from "../../../../column";
import {LatestValueDelegate} from "../latest-value-delegate";
import {latestValueOfEntityOrNull} from "./latest-value-of-entity-or-null";

export type LatestValueOfEntity<
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
export function latestValueOfEntity<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> (
    log : LogT,
    delegate : DelegateT
) : (
    LatestValueOfEntity<LogT, DelegateT>
) {
    const expr = latestValueOfEntityOrNull(log, delegate as any)
    if (log.tracked.indexOf(expr.alias) < 0) {
        throw new Error(`${log.table.alias}.${expr.alias} is not a tracked column`);
    }
    return QueryUtil.coalesce(
        expr,
        log.trackedDefaults[expr.alias]
    ).as(expr.alias) as any;
}