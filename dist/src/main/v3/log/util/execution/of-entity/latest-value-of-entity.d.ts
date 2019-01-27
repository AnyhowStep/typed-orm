import { CompletedLog } from "../../../log";
import { ALIASED } from "../../../../constants";
import { ExprUtil, IExpr } from "../../../../expr";
import { ColumnUtil } from "../../../../column";
import { LatestValueDelegate } from "../latest-value-delegate";
export declare type LatestValueOfEntity<LogT extends CompletedLog, DelegateT extends LatestValueDelegate<LogT>> = (ExprUtil.As<IExpr<{
    usedColumns: ColumnUtil.FromColumnMap<LogT["entity"]["columns"]>[];
    assertDelegate: (LogT["table"]["columns"][ReturnType<DelegateT>["name"]]["assertDelegate"]);
    tableAlias: typeof ALIASED;
}>, ReturnType<DelegateT>["name"]>);
export declare function latestValueOfEntity<LogT extends CompletedLog, DelegateT extends LatestValueDelegate<LogT>>(log: LogT, delegate: DelegateT): (LatestValueOfEntity<LogT, DelegateT>);
