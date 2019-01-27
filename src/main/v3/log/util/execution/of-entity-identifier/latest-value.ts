import {CompletedLog, EntityIdentifier} from "../../../log";
import {QueryUtil} from "../../../../query";
import {ExprUtil, IExpr} from "../../../../expr";
import {ALIASED} from "../../../../constants";
import {LatestValueDelegate} from "../latest-value-delegate";
import {latestValueOrNull} from "./latest-value-or-null";

export type LatestValue<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> = (
    ExprUtil.As<
        IExpr<{
            usedColumns : never[],
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
export function latestValue<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> (
    log : LogT,
    entityIdentifier : EntityIdentifier<LogT>,
    delegate : DelegateT
) : (
    LatestValue<LogT, DelegateT>
) {
    const expr = latestValueOrNull(log, entityIdentifier, delegate);

    const result = QueryUtil.coalesce(
        expr,
        log.trackedDefaults[expr.alias]
    ).as(expr.alias);
    return result as any;
}