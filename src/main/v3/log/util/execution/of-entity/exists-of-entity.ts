import * as sd from "schema-decorator";
import {LogNoTrackedDefaults} from "../../../log";
import {QueryUtil} from "../../../../query";
import {ALIASED} from "../../../../constants";
import {ExprUtil, IExpr} from "../../../../expr";
import {ColumnUtil} from "../../../../column";
import {JoinDeclarationUtil} from "../../../../join-declaration";
import * as exprLib from "../../../../expr-library";

export type ExistsOfEntity<
    LogT extends LogNoTrackedDefaults
> = (
    ExprUtil.As<
        IExpr<{
            usedColumns : ColumnUtil.FromColumnMap<LogT["entity"]["columns"]>[],
            assertDelegate : sd.AssertDelegate<boolean>,
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
            .__unsafeWhere(() => JoinDeclarationUtil.eq(log.joinDeclaration))
    ).as("exists");
    return result as ExistsOfEntity<LogT>;
}