import { CompletedLog, EntityIdentifier } from "../../../log";
import { ExprUtil, IExpr } from "../../../../expr";
import { ALIASED } from "../../../../constants";
import { LatestValueDelegate } from "../latest-value-delegate";
export declare type LatestValue<LogT extends CompletedLog, DelegateT extends LatestValueDelegate<LogT>> = (ExprUtil.As<IExpr<{
    usedColumns: never[];
    assertDelegate: (LogT["table"]["columns"][ReturnType<DelegateT>["name"]]["assertDelegate"]);
    tableAlias: typeof ALIASED;
}>, ReturnType<DelegateT>["name"]>);
export declare function latestValue<LogT extends CompletedLog, DelegateT extends LatestValueDelegate<LogT>>(log: LogT, entityIdentifier: EntityIdentifier<LogT>, delegate: DelegateT): (LatestValue<LogT, DelegateT>);
