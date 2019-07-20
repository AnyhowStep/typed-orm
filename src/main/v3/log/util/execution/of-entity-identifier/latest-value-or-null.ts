import * as sd from "type-mapping";
import {EntityIdentifier, LogNoTrackedDefaults} from "../../../log";
import {ExprUtil, IExpr} from "../../../../expr";
import {ALIASED} from "../../../../constants";
import {LatestValueDelegate} from "../latest-value-delegate";
import {latestValueQuery} from "./latest-value-query";

export type LatestValueOrNull<
    LogT extends LogNoTrackedDefaults,
    DelegateT extends LatestValueDelegate<LogT>
> = (
    ExprUtil.As<
        IExpr<{
            usedRef : {},
            assertDelegate : sd.SafeMapper<
                ReturnType<
                    LogT["table"]["columns"][
                        ReturnType<DelegateT>["name"]
                    ]["assertDelegate"]
                >|
                null
            >,
            tableAlias : typeof ALIASED,
        }>,
        ReturnType<DelegateT>["name"]
    >
);
export function latestValueOrNull<
    LogT extends LogNoTrackedDefaults,
    DelegateT extends LatestValueDelegate<LogT>
> (
    log : LogT,
    entityIdentifier : EntityIdentifier<LogT>,
    delegate : DelegateT
) : (
    LatestValueOrNull<LogT, DelegateT>
) {
    const query = latestValueQuery(log, entityIdentifier, delegate);
    const expr = ExprUtil.fromRawExpr(
        query
    );
    const result = expr.as((query._selects[0] as any).name);

    return result;
}