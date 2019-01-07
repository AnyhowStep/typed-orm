import * as sd from "schema-decorator";
import { ITable } from "../../../table";
import { TypeMapUtil } from "../../../type-map";
import { CandidateKey } from "../../../candidate-key";
import { ColumnNames, ColumnType } from "../query";
export declare type SuperKeyUnionFromCandidateKey<CandidateKeyT extends CandidateKey, TableT extends ITable> = (CandidateKeyT extends CandidateKey ? (TypeMapUtil.UnionFromCandidateKey<CandidateKeyT, TableT["columns"]> & {
    [columnName in Exclude<ColumnNames<TableT>, CandidateKeyT[number]>]?: (ColumnType<TableT, columnName>);
}) : never);
export declare type SuperKeyUnionFromCandidateKeyArray<CandidateKeyArrayT extends CandidateKey[], TableT extends ITable> = (SuperKeyUnionFromCandidateKey<CandidateKeyArrayT[number], TableT>);
export declare type SuperKey<TableT extends ITable> = (SuperKeyUnionFromCandidateKeyArray<TableT["candidateKeys"], TableT>);
export declare type SuperKeyAssertDelegate<TableT extends ITable> = (sd.AssertDelegate<SuperKey<TableT>>);
export declare function superKeyAssertDelegate<TableT extends ITable>(table: TableT): (SuperKeyAssertDelegate<TableT>);
//# sourceMappingURL=super-key-assert-delegate.d.ts.map