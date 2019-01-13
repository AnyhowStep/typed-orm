import * as sd from "schema-decorator";
import { ITable } from "../../table";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnUtil } from "../../../column";
import { Expr } from "../../../expr";
import { SuperKey } from "../../../super-key";
export declare function eqSuperKey<TableT extends ITable>(table: TableT, sk: SuperKey<TableT>): (Expr<{
    usedRef: ColumnRefUtil.FromColumnArray<ColumnUtil.FromColumnMap<TableT["columns"]>[]>;
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
//# sourceMappingURL=eq-super-key.d.ts.map