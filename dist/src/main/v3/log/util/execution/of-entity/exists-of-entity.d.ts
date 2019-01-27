import * as sd from "schema-decorator";
import { LogNoTrackedDefaults } from "../../../log";
import { ALIASED } from "../../../../constants";
import { ExprUtil, IExpr } from "../../../../expr";
import { ColumnUtil } from "../../../../column";
export declare type ExistsOfEntity<LogT extends LogNoTrackedDefaults> = (ExprUtil.As<IExpr<{
    usedColumns: ColumnUtil.FromColumnMap<LogT["entity"]["columns"]>[];
    assertDelegate: sd.AssertDelegate<boolean>;
    tableAlias: typeof ALIASED;
}>, "exists">);
export declare function existsOfEntity<LogT extends LogNoTrackedDefaults>(log: LogT): (ExistsOfEntity<LogT>);
