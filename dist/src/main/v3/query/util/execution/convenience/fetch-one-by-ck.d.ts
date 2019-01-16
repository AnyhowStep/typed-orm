import { ITable } from "../../../../table";
import { Row } from "../../../../row";
import { QueryUtil } from "../../..";
import { IConnection } from "../../../../execution";
import { CandidateKey } from "../../../../candidate-key";
export declare function fetchOneByCk<TableT extends ITable>(connection: IConnection, table: TableT, ck: CandidateKey<TableT>): Promise<Row<TableT>>;
export declare function fetchOneByCk<TableT extends ITable, DelegateT extends QueryUtil.SelectDelegate<QueryUtil.From<QueryUtil.NewInstance, TableT>>>(connection: IConnection, table: TableT, ck: CandidateKey<TableT>, delegate: QueryUtil.AssertValidSelectDelegate<QueryUtil.From<QueryUtil.NewInstance, TableT>, DelegateT>): Promise<QueryUtil.UnmappedTypeNoJoins<ReturnType<DelegateT>>>;
//# sourceMappingURL=fetch-one-by-ck.d.ts.map