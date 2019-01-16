import { ITable } from "../../../../table";
import { Row } from "../../../../row";
import { QueryUtil } from "../../..";
import { IConnection } from "../../../../execution";
import { SuperKey } from "../../../../super-key";
export declare function fetchOneBySk<TableT extends ITable>(connection: IConnection, table: TableT, sk: SuperKey<TableT>): Promise<Row<TableT>>;
export declare function fetchOneBySk<TableT extends ITable, DelegateT extends QueryUtil.SelectDelegate<QueryUtil.From<QueryUtil.NewInstance, TableT>>>(connection: IConnection, table: TableT, sk: SuperKey<TableT>, delegate: QueryUtil.AssertValidSelectDelegate<QueryUtil.From<QueryUtil.NewInstance, TableT>, DelegateT>): Promise<QueryUtil.UnmappedTypeNoJoins<ReturnType<DelegateT>>>;
//# sourceMappingURL=fetch-one-by-sk.d.ts.map