import { TableWithPk } from "../../../../table";
import { Row } from "../../../../row";
import { QueryUtil } from "../../..";
import { IConnection } from "../../../../execution";
import { PrimaryKey } from "../../../../primary-key";
export declare function fetchOneByPk<TableT extends TableWithPk>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): Promise<Row<TableT>>;
export declare function fetchOneByPk<TableT extends TableWithPk, DelegateT extends QueryUtil.SelectDelegate<QueryUtil.From<QueryUtil.NewInstance, TableT>>>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>, delegate: QueryUtil.AssertValidSelectDelegate<QueryUtil.From<QueryUtil.NewInstance, TableT>, DelegateT>): Promise<QueryUtil.UnmappedTypeNoJoins<ReturnType<DelegateT>>>;
//# sourceMappingURL=fetch-one-by-pk.d.ts.map