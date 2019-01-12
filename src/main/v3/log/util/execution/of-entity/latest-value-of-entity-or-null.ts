import * as sd from "schema-decorator";
import {LogNoTrackedDefaults} from "../../../log";
import {QueryUtil} from "../../../../query";
import {latestOfEntity} from "./latest-of-entity";
import {ColumnMapUtil} from "../../../../column-map";
import {ColumnIdentifierMapUtil} from "../../../../column-identifier-map";
import {ExprUtil, IExpr} from "../../../../expr";
import {ColumnRefUtil} from "../../../../column-ref";
import {ColumnUtil} from "../../../../column";
import {ALIASED} from "../../../../constants";
import {LatestValueDelegate} from "../latest-value-delegate";

export type LatestValueOfEntityOrNull<
    LogT extends LogNoTrackedDefaults,
    DelegateT extends LatestValueDelegate<LogT>
> = (
    ExprUtil.As<
        IExpr<{
            usedRef : ColumnRefUtil.FromColumnArray<
                ColumnUtil.FromColumnMap<LogT["entity"]["columns"]>[]
            >,
            assertDelegate : sd.AssertDelegate<
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
export function latestValueOfEntityOrNull<
    LogT extends LogNoTrackedDefaults,
    DelegateT extends LatestValueDelegate<LogT>
> (
    log : LogT,
    delegate : DelegateT
) : (
    LatestValueOfEntityOrNull<LogT, DelegateT>
) {
    const columns = ColumnMapUtil.pick(
        log.table.columns,
        log.tracked
    );
    const column = delegate(columns);
    ColumnIdentifierMapUtil.assertHasColumnIdentifier(columns, column);

    const expr = ExprUtil.fromRawExpr(
        QueryUtil.select(
            latestOfEntity(log),
            (() => [column]) as any
        )
    );
    const result = expr.as(column.name);
    return result as unknown as LatestValueOfEntityOrNull<LogT, DelegateT>;
}