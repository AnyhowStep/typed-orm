import * as sd from "type-mapping";
import {LogNoTrackedDefaults} from "../../../log";
import {QueryUtil} from "../../../../query";
import {latestOfEntity} from "./latest-of-entity";
import {ColumnMapUtil} from "../../../../column-map";
import {ColumnIdentifierMapUtil} from "../../../../column-identifier-map";
import {ExprUtil, IExpr} from "../../../../expr";
import {ColumnRefUtil} from "../../../../column-ref";
import {ColumnUtil} from "../../../../column";
import {ALIASED} from "../../../../constants";
import {LatestValueOrNullDelegate} from "../latest-value-or-null-delegate";

export type LatestValueOfEntityOrNull<
    LogT extends LogNoTrackedDefaults,
    DelegateT extends LatestValueOrNullDelegate<LogT>
> = (
    ExprUtil.As<
        IExpr<{
            usedRef : ColumnRefUtil.FromColumnArray<
                ColumnUtil.FromColumnMap<LogT["entity"]["columns"]>[]
            >,
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
export function latestValueOfEntityOrNull<
    LogT extends LogNoTrackedDefaults,
    DelegateT extends LatestValueOrNullDelegate<LogT>
> (
    log : LogT,
    delegate : DelegateT
) : (
    LatestValueOfEntityOrNull<LogT, DelegateT>
) {
    const columns = ColumnMapUtil.pick(
        log.table.columns,
        [
            ...log.table.generated,
            ...log.tracked,
            ...log.doNotCopy,
        ]
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