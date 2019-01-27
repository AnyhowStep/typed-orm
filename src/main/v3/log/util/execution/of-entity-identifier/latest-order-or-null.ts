import * as sd from "schema-decorator";
import {EntityIdentifier, LogNoTrackedDefaults} from "../../../log";
import {ALIASED} from "../../../../constants";
import {ExprUtil, IExpr} from "../../../../expr";
import {latestOrderQuery} from "./latest-order-query";

export type LatestOrderOrNull<
    LogT extends LogNoTrackedDefaults
> = (
    ExprUtil.As<
        IExpr<{
            usedColumns : never[],
            assertDelegate : sd.AssertDelegate<
                ReturnType<
                    LogT["latestOrder"][0]["assertDelegate"]
                >|
                null
            >,
            tableAlias : typeof ALIASED,
        }>,
        LogT["latestOrder"][0]["name"]
    >
);
export function latestOrderOrNull<
    LogT extends LogNoTrackedDefaults
> (
    log : LogT,
    entityIdentifier : EntityIdentifier<LogT>
) : (
    LatestOrderOrNull<LogT>
) {
    const expr = ExprUtil.fromRawExpr(
        latestOrderQuery(log, entityIdentifier)
    );
    const result = expr.as(log.latestOrder[0].name);
    return result;
}