import * as sd from "schema-decorator";
import { ITable } from "../../table";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnUtil } from "../../../column";
import { Expr } from "../../../expr";
import { Row } from "../../../row";
export declare function eqColumns<TableT extends ITable>(table: TableT, columns: Partial<Row<TableT>>): (Expr<{
    usedRef: ColumnRefUtil.FromColumnArray<ColumnUtil.FromColumnMap<TableT["columns"]>[]>;
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
