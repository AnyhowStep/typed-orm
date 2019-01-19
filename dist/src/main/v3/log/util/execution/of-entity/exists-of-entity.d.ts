import * as sd from "schema-decorator";
import { LogNoTrackedDefaults } from "../../../log";
import { ALIASED } from "../../../../constants";
import { ExprUtil, IExpr } from "../../../../expr";
import { ColumnRefUtil } from "../../../../column-ref";
import { ColumnUtil } from "../../../../column";
export declare type ExistsOfEntity<LogT extends LogNoTrackedDefaults> = (ExprUtil.As<IExpr<{
    usedRef: ColumnRefUtil.FromColumnArray<ColumnUtil.FromColumnMap<LogT["entity"]["columns"]>[]>;
    assertDelegate: sd.AssertDelegate<boolean>;
    tableAlias: typeof ALIASED;
}>, "exists">);
export declare function existsOfEntity<LogT extends LogNoTrackedDefaults>(log: LogT): (ExistsOfEntity<LogT>);
//# sourceMappingURL=exists-of-entity.d.ts.map