import { CompletedLog } from "../../log";
import { ALIASED } from "../../../constants";
import { ExprUtil, IExpr } from "../../../expr";
import { LatestValueDelegate } from "./latest-value-query";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnUtil } from "../../../column";
export declare type LatestValueSubExpr<LogT extends CompletedLog, DelegateT extends LatestValueDelegate<LogT>> = (ExprUtil.As<IExpr<{
    usedRef: ColumnRefUtil.FromColumnArray<ColumnUtil.FromColumnMap<LogT["entity"]["columns"]>[]>;
    assertDelegate: (LogT["table"]["columns"][ReturnType<DelegateT>["name"]]["assertDelegate"]);
    tableAlias: typeof ALIASED;
}>, ReturnType<DelegateT>["name"]>);
export declare function latestValueSubExpr<LogT extends CompletedLog, DelegateT extends LatestValueDelegate<LogT>>(log: LogT, delegate: DelegateT): (LatestValueSubExpr<LogT, DelegateT>);
//# sourceMappingURL=latest-value-sub-expr.d.ts.map