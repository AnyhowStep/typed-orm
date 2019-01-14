import { DeletableTable } from "../../../../table";
import { IConnection, DeleteOneResult } from "../../../../execution";
import { IAnonymousTypedExpr } from "../../../../expr";
export declare function deleteOne<TableT extends DeletableTable>(connection: IConnection, table: TableT, where: IAnonymousTypedExpr<boolean>): (Promise<DeleteOneResult>);
//# sourceMappingURL=delete-one.d.ts.map