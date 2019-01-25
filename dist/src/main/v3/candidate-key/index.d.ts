import * as sd from "schema-decorator";
import { ITable } from "../table";
import { ColumnMap } from "../column-map";
import { TypeMapUtil } from "../type-map";
import { Key } from "../key";
export declare type CandidateKeyImpl<MapT extends ColumnMap, K extends Key> = (K extends Key ? TypeMapUtil.FromColumnMap<Pick<MapT, K[number]>> : never);
export declare type CandidateKey<TableT extends ITable> = (CandidateKeyImpl<TableT["columns"], TableT["candidateKeys"][number]>);
export declare namespace CandidateKeyUtil {
    type AssertDelegate<TableT extends ITable> = (sd.AssertDelegate<CandidateKey<TableT>>);
    function assertDelegate<TableT extends ITable>(table: TableT): (AssertDelegate<TableT>);
}
