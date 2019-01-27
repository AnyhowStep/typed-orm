import * as sd from "schema-decorator";
import { ITable } from "../../table";
import { CandidateKey } from "../../../candidate-key";
import { ColumnUtil } from "../../../column";
import { Expr } from "../../../expr";
export declare function eqCandidateKey<TableT extends ITable>(table: TableT, ck: CandidateKey<TableT>): (Expr<{
    usedColumns: ColumnUtil.FromColumnMap<TableT["columns"]>[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
