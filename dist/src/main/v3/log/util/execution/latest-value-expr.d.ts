import { CompletedLog, EntityIdentifier } from "../../log";
import { ALIASED } from "../../../constants";
import { ExprUtil, IExpr } from "../../../expr";
import { LatestValueDelegate } from "./latest-value-query";
export declare type LatestValueExpr<LogT extends CompletedLog, DelegateT extends LatestValueDelegate<LogT>> = (ExprUtil.As<IExpr<{
    usedRef: {};
    assertDelegate: (LogT["table"]["columns"][ReturnType<DelegateT>["name"]]["assertDelegate"]);
    tableAlias: typeof ALIASED;
}>, ReturnType<DelegateT>["name"]>);
export declare function latestValueExpr<LogT extends CompletedLog, DelegateT extends LatestValueDelegate<LogT>>(log: LogT, entityIdentifier: EntityIdentifier<LogT>, delegate: DelegateT): (LatestValueExpr<LogT, DelegateT>);
//# sourceMappingURL=latest-value-expr.d.ts.map