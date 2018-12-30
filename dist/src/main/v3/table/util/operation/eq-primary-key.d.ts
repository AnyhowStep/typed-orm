import * as sd from "schema-decorator";
import { ITable } from "../../table";
import { PrimaryKey } from "./primary-key-assert-delegate";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnUtil } from "../../../column";
import { Expr } from "../../../expr";
import { CandidateKey } from "../../../candidate-key";
export declare function eqPrimaryKey<TableT extends ITable & {
    primaryKey: CandidateKey;
}>(table: TableT, ck: PrimaryKey<TableT>): (Expr<{
    usedRef: ColumnRefUtil.FromColumnArray<ColumnUtil.FromColumnMap<TableT["columns"]>[]>;
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
//# sourceMappingURL=eq-primary-key.d.ts.map