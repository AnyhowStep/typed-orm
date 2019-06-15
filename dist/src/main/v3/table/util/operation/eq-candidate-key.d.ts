import * as sd from "type-mapping";
import { ITable } from "../../table";
import { CandidateKey } from "../../../candidate-key";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnUtil } from "../../../column";
import { Expr } from "../../../expr";
export declare function eqCandidateKey<TableT extends ITable>(table: TableT, ck: CandidateKey<TableT>): (Expr<{
    usedRef: ColumnRefUtil.FromColumnArray<ColumnUtil.FromColumnMap<TableT["columns"]>[]>;
    assertDelegate: sd.SafeMapper<boolean>;
}>);
