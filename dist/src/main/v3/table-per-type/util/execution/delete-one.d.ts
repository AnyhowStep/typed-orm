import { ITable } from "../../../table";
import { IConnection, DeleteOneResult } from "../../../execution";
import { IAnonymousTypedExpr } from "../../../expr";
export declare function deleteOne<TableT extends ITable & {
    deleteAllowed: true;
}>(connection: IConnection, table: TableT, where: IAnonymousTypedExpr<boolean>): Promise<DeleteOneResult>;
