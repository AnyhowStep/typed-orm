import * as sd from "schema-decorator";
import { ITable } from "../../../table";
import { Key } from "../../../key";
import { ColumnNames, ColumnType } from "../query";
import { CandidateKeyImpl } from "../../../candidate-key";
export declare type SuperKeyUnionFromCandidateKey<CandidateKeyT extends Key, TableT extends ITable> = (CandidateKeyT extends Key ? (CandidateKeyImpl<TableT["columns"], CandidateKeyT> & {
    [columnName in Exclude<ColumnNames<TableT>, CandidateKeyT[number]>]?: (ColumnType<TableT, columnName>);
}) : never);
export declare type SuperKeyUnionFromCandidateKeyArray<CandidateKeyArrayT extends Key[], TableT extends ITable> = (SuperKeyUnionFromCandidateKey<CandidateKeyArrayT[number], TableT>);
export declare type SuperKey<TableT extends ITable> = (SuperKeyUnionFromCandidateKeyArray<TableT["candidateKeys"], TableT>);
export declare type SuperKeyAssertDelegate<TableT extends ITable> = (sd.AssertDelegate<SuperKey<TableT>>);
export declare function superKeyAssertDelegate<TableT extends ITable>(table: TableT): (SuperKeyAssertDelegate<TableT>);
