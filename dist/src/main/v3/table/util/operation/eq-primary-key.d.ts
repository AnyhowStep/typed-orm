import * as sd from "schema-decorator";
import { ITable } from "../../table";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnUtil } from "../../../column";
import { Expr } from "../../../expr";
import { Key } from "../../../key";
import { PrimaryKey } from "../../../primary-key";
export declare function eqPrimaryKey<TableT extends ITable & {
    primaryKey: Key;
}>(table: TableT, pk: PrimaryKey<TableT>): (Expr<{
    usedRef: ColumnRefUtil.FromColumnArray<ColumnUtil.FromColumnMap<TableT["columns"]>[]>;
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
