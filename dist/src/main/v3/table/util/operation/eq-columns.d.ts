import * as sd from "schema-decorator";
import { ITable } from "../../table";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnUtil } from "../../../column";
import { Expr } from "../../../expr";
import { TypeMapUtil } from "../../../type-map";
export declare function eqColumns<TableT extends ITable>(table: TableT, columns: Partial<TypeMapUtil.FromTable<TableT>>): (Expr<{
    usedRef: ColumnRefUtil.FromColumnArray<ColumnUtil.FromColumnMap<TableT["columns"]>[]>;
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
//# sourceMappingURL=eq-columns.d.ts.map