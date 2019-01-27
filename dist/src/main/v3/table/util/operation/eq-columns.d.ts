import * as sd from "schema-decorator";
import { ITable } from "../../table";
import { ColumnUtil } from "../../../column";
import { Expr } from "../../../expr";
import { Row } from "../../../row";
export declare function eqColumns<TableT extends ITable>(table: TableT, columns: Partial<Row<TableT>>): (Expr<{
    usedColumns: ColumnUtil.FromColumnMap<TableT["columns"]>[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
