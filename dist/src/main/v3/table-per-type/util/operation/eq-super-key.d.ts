import * as sd from "type-mapping";
import { ITable } from "../../../table";
import { SuperKey } from "./super-key-assert-delegate";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnUtil } from "../../../column";
import { Expr } from "../../../expr";
export declare function eqSuperKey<TableT extends ITable>(table: TableT, sk: SuperKey<TableT>): (Expr<{
    usedRef: ColumnRefUtil.FromColumnArray<ColumnUtil.FromColumnMap<TableT["columns"] | TableT["parents"][number]["columns"]>[]>;
    assertDelegate: sd.SafeMapper<boolean>;
}>);
