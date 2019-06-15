import * as sd from "type-mapping";
import {LogNoTrackedDefaults} from "../../../log";
import {QueryUtil} from "../../../../query";
import {ALIASED} from "../../../../constants";
import {ExprUtil, IExpr} from "../../../../expr";
import {ColumnRefUtil} from "../../../../column-ref";
import {ColumnUtil} from "../../../../column";
import {JoinDeclarationUtil} from "../../../../join-declaration";
import * as exprLib from "../../../../expr-library";

export type ExistsOfEntity<
    LogT extends LogNoTrackedDefaults
> = (
    ExprUtil.As<
        IExpr<{
            usedRef : ColumnRefUtil.FromColumnArray<
                ColumnUtil.FromColumnMap<LogT["entity"]["columns"]>[]
            >,
            assertDelegate : sd.SafeMapper<boolean>,
            tableAlias : typeof ALIASED,
        }>,
        "exists"
    >
);
export function existsOfEntity<
    LogT extends LogNoTrackedDefaults
> (
    log : LogT
) : (
    ExistsOfEntity<LogT>
) {

    const result = exprLib.exists(
        QueryUtil.newInstance()
            .requireParentJoins(...([log.entity] as any))
            .from(log.table as any)
            .where(() => JoinDeclarationUtil.eq(log.joinDeclaration))
    ).as("exists");
    return result as ExistsOfEntity<LogT>;
}