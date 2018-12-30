import { ITable, TableUtil } from "../../../../table";
import { IConnection, UpdateResult } from "../../../../execution";
import { SetDelegateFromJoinArray } from "../../constructor";
import { IJoin } from "../../../../join";
export declare function updateZeroOrOne<TableT extends ITable>(connection: IConnection & TableUtil.AssertHasCandidateKey<TableT>, table: TableT, ck: TableUtil.CandidateKey<TableT>, delegate: SetDelegateFromJoinArray<IJoin<{
    readonly aliasedTable: TableT;
    readonly columns: TableT["columns"];
    readonly nullable: false;
}>[]>): Promise<UpdateResult>;
//# sourceMappingURL=update-zero-or-one.d.ts.map