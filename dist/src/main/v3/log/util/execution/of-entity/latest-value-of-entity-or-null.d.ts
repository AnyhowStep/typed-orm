import * as sd from "type-mapping";
import { LogNoTrackedDefaults } from "../../../log";
import { ExprUtil, IExpr } from "../../../../expr";
import { ColumnRefUtil } from "../../../../column-ref";
import { ColumnUtil } from "../../../../column";
import { ALIASED } from "../../../../constants";
import { LatestValueOrNullDelegate } from "../latest-value-or-null-delegate";
export declare type LatestValueOfEntityOrNull<LogT extends LogNoTrackedDefaults, DelegateT extends LatestValueOrNullDelegate<LogT>> = (ExprUtil.As<IExpr<{
    usedRef: ColumnRefUtil.FromColumnArray<ColumnUtil.FromColumnMap<LogT["entity"]["columns"]>[]>;
    assertDelegate: sd.SafeMapper<ReturnType<LogT["table"]["columns"][ReturnType<DelegateT>["name"]]["assertDelegate"]> | null>;
    tableAlias: typeof ALIASED;
}>, ReturnType<DelegateT>["name"]>);
export declare function latestValueOfEntityOrNull<LogT extends LogNoTrackedDefaults, DelegateT extends LatestValueOrNullDelegate<LogT>>(log: LogT, delegate: DelegateT): (LatestValueOfEntityOrNull<LogT, DelegateT>);
