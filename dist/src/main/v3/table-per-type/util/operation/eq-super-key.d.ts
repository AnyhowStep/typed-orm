import * as sd from "schema-decorator";
import { ITable } from "../../../table";
import { SuperKey } from "./super-key-assert-delegate";
import { ColumnUtil } from "../../../column";
import { Expr } from "../../../expr";
export declare function eqSuperKey<TableT extends ITable>(table: TableT, sk: SuperKey<TableT>): (Expr<{
    usedColumns: ColumnUtil.FromColumnMap<TableT["columns"] | TableT["parents"][number]["columns"]>[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
