import * as sd from "schema-decorator";
import { LogNoTrackedDefaults } from "../../../log";
import { ExprUtil, IExpr } from "../../../../expr";
import { ColumnRefUtil } from "../../../../column-ref";
import { ColumnUtil } from "../../../../column";
import { ALIASED } from "../../../../constants";
import { LatestValueDelegate } from "../latest-value-delegate";
export declare type LatestValueOfEntityOrNull<LogT extends LogNoTrackedDefaults, DelegateT extends LatestValueDelegate<LogT>> = (ExprUtil.As<IExpr<{
    usedRef: ColumnRefUtil.FromColumnArray<ColumnUtil.FromColumnMap<LogT["entity"]["columns"]>[]>;
    assertDelegate: sd.AssertDelegate<ReturnType<LogT["table"]["columns"][ReturnType<DelegateT>["name"]]["assertDelegate"]> | null>;
    tableAlias: typeof ALIASED;
}>, ReturnType<DelegateT>["name"]>);
export declare function latestValueOfEntityOrNull<LogT extends LogNoTrackedDefaults, DelegateT extends LatestValueDelegate<LogT>>(log: LogT, delegate: DelegateT): (LatestValueOfEntityOrNull<LogT, DelegateT>);
//# sourceMappingURL=latest-value-of-entity-or-null.d.ts.map