import * as sd from "schema-decorator";
import {LogNoTrackedDefaults} from "../../../log";
import {QueryUtil} from "../../../../query";
import {ALIASED} from "../../../../constants";
import {ExprUtil, IExpr} from "../../../../expr";
import {ColumnUtil} from "../../../../column";
import {latestOfEntity} from "./latest-of-entity";

export type LatestOrderOfEntityOrNull<
    LogT extends LogNoTrackedDefaults
> = (
    ExprUtil.As<
        IExpr<{
            usedColumns : ColumnUtil.FromColumnMap<LogT["entity"]["columns"]>[],
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
export function latestOrderOfEntityOrNull<
    LogT extends LogNoTrackedDefaults
> (
    log : LogT
) : (
    LatestOrderOfEntityOrNull<LogT>
) {
    const expr = ExprUtil.fromRawExpr(
        QueryUtil.select(
            latestOfEntity(log),
            (() => [log.latestOrder[0]]) as any
        )
    );
    const result = expr.as(log.latestOrder[0].name);
    return result as unknown as LatestOrderOfEntityOrNull<LogT>;
}