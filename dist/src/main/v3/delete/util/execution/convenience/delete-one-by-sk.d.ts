import { DeletableTable, TableUtil } from "../../../../table";
import { IConnection, DeleteOneResult } from "../../../../execution";
import { SuperKey } from "../../../../super-key";
export declare function deleteOneBySk<TableT extends DeletableTable>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, sk: SuperKey<TableT>): (Promise<DeleteOneResult>);
//# sourceMappingURL=delete-one-by-sk.d.ts.map