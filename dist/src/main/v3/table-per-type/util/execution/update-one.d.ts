import { ITable } from "../../../table";
import { IConnection, UpdateOneResult } from "../../../execution";
import { SetDelegate, AssertValidSetDelegate_Hack } from "./update";
import { IAnonymousTypedExpr } from "../../../expr";
export declare function updateOne<TableT extends ITable, DelegateT extends SetDelegate<TableT>>(connection: IConnection, table: TableT, where: IAnonymousTypedExpr<boolean>, delegate: DelegateT): (AssertValidSetDelegate_Hack<TableT, DelegateT, Promise<UpdateOneResult>>);
