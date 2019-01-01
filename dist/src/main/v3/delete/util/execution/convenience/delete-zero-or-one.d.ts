import { ITable } from "../../../../table";
import { IConnection, DeleteZeroOrOneResult } from "../../../../execution";
import { IAnonymousTypedExpr } from "../../../../expr";
export declare function deleteZeroOrOne<TableT extends ITable & {
    deleteAllowed: true;
}>(connection: IConnection, table: TableT, where: IAnonymousTypedExpr<boolean>): (Promise<DeleteZeroOrOneResult>);
//# sourceMappingURL=delete-zero-or-one.d.ts.map