import * as sd from "type-mapping";
import {LogNoTrackedDefaults} from "../../../log";
import {ALIASED} from "../../../../constants";
import {ExprUtil, IExpr} from "../../../../expr";
import {ColumnRefUtil} from "../../../../column-ref";
import {ColumnUtil} from "../../../../column";
import * as exprLib from "../../../../expr-library";
import {TableUtil} from "../../../../table";
import {QueryUtil} from "../../../../query";
import {JoinDeclarationUtil} from "../../../../join-declaration";

export type IsLatest<
    LogT extends LogNoTrackedDefaults
> = (
    ExprUtil.As<
        IExpr<{
            usedRef : ColumnRefUtil.FromColumnArray<
                ColumnUtil.FromColumnMap<LogT["table"]["columns"]>[]
            >,
            assertDelegate : sd.SafeMapper<boolean>,
            tableAlias : typeof ALIASED,
        }>,
        "isLatest"
    >
);
export function isLatest<
    LogT extends LogNoTrackedDefaults
> (
    log : LogT
) : (
    IsLatest<LogT>
) {
    const latest = TableUtil.as(log.table, "latest");
    const latestOrderSubQuery = QueryUtil.newInstance()
        .requireParentJoins(...([log.table] as any))
        .from(latest as any)
        .select(() => [
            latest.columns[log.latestOrder[0].name]
        ])
        .where(() => {
            return JoinDeclarationUtil.innerJoinUsing(
                latest,
                log.table as any,
                c => {
                    return log.entityIdentifier.map(
                        columnName => c[columnName]
                    ) as any;
                }
            ).eq()
        })
        .orderBy(() => [
            [
                latest.columns[log.latestOrder[0].name],
                log.latestOrder[1]
            ]
        ])
        .limit(1);
    return exprLib.nullSafeEq(
        log.table.columns[log.latestOrder[0].name],
        latestOrderSubQuery
    ).as("isLatest") as any;
}