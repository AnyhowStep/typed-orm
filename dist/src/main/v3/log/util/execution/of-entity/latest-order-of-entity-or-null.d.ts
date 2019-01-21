import * as sd from "schema-decorator";
import { LogNoTrackedDefaults } from "../../../log";
import { ALIASED } from "../../../../constants";
import { ExprUtil, IExpr } from "../../../../expr";
import { ColumnRefUtil } from "../../../../column-ref";
import { ColumnUtil } from "../../../../column";
export declare type LatestOrderOfEntityOrNull<LogT extends LogNoTrackedDefaults> = (ExprUtil.As<IExpr<{
    usedRef: ColumnRefUtil.FromColumnArray<ColumnUtil.FromColumnMap<LogT["entity"]["columns"]>[]>;
    assertDelegate: sd.AssertDelegate<ReturnType<LogT["latestOrder"][0]["assertDelegate"]> | null>;
    tableAlias: typeof ALIASED;
}>, LogT["latestOrder"][0]["name"]>);
export declare function latestOrderOfEntityOrNull<LogT extends LogNoTrackedDefaults>(log: LogT): (LatestOrderOfEntityOrNull<LogT>);
//# sourceMappingURL=latest-order-of-entity-or-null.d.ts.map