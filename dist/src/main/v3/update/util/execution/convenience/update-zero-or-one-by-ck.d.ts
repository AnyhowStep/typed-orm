import { ITable, TableUtil } from "../../../../table";
import { IConnection, UpdateZeroOrOneResult } from "../../../../execution";
import { SetDelegateFromJoinArray } from "../../constructor";
import { IJoin } from "../../../../join";
export declare function updateZeroOrOneByCk<TableT extends ITable>(connection: IConnection & TableUtil.AssertHasCandidateKey<TableT>, table: TableT, ck: TableUtil.CandidateKey<TableT>, delegate: SetDelegateFromJoinArray<IJoin<{
    readonly aliasedTable: TableT;
    readonly columns: TableT["columns"];
    readonly nullable: false;
}>[]>): Promise<UpdateZeroOrOneResult>;
//# sourceMappingURL=update-zero-or-one-by-ck.d.ts.map