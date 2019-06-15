import * as sd from "type-mapping";
import { ITable } from "../table";
import { ColumnMap } from "../column-map";
import { TypeMapUtil } from "../type-map";
import { Key } from "../key";
import { Omit } from "../type";
import { CandidateKeyImpl } from "../candidate-key";
export declare type SuperKeyImpl<MapT extends ColumnMap, K extends Key> = (K extends Key ? CandidateKeyImpl<MapT, K> & Partial<TypeMapUtil.FromColumnMap<Omit<MapT, K[number]>>> : never);
export declare type SuperKey<TableT extends ITable> = (SuperKeyImpl<TableT["columns"], TableT["candidateKeys"][number]>);
export declare namespace SuperKeyUtil {
    type AssertDelegate<TableT extends ITable> = (sd.SafeMapper<SuperKey<TableT>>);
    function assertDelegate<TableT extends ITable>(table: TableT): (AssertDelegate<TableT>);
}
