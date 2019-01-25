import { DeletableTable } from "../../../../table";
import { IConnection, DeleteZeroOrOneResult } from "../../../../execution";
import { IAnonymousTypedExpr } from "../../../../expr";
export declare function deleteZeroOrOne<TableT extends DeletableTable>(connection: IConnection, table: TableT, where: IAnonymousTypedExpr<boolean>): (Promise<DeleteZeroOrOneResult>);
