import * as sd from "type-mapping";
import { LogNoTrackedDefaults } from "../../../log";
import { ALIASED } from "../../../../constants";
import { ExprUtil, IExpr } from "../../../../expr";
import { ColumnRefUtil } from "../../../../column-ref";
import { ColumnUtil } from "../../../../column";
export declare type IsLatest<LogT extends LogNoTrackedDefaults> = (ExprUtil.As<IExpr<{
    usedRef: ColumnRefUtil.FromColumnArray<ColumnUtil.FromColumnMap<LogT["table"]["columns"]>[]>;
    assertDelegate: sd.SafeMapper<boolean>;
    tableAlias: typeof ALIASED;
}>, "isLatest">);
export declare function isLatest<LogT extends LogNoTrackedDefaults>(log: LogT): (IsLatest<LogT>);
