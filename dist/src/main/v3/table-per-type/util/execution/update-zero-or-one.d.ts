import { ITable } from "../../../table";
import { IConnection, UpdateZeroOrOneResult } from "../../../execution";
import { SetDelegate, AssertValidSetDelegate_Hack } from "./update";
import { IAnonymousTypedExpr } from "../../../expr";
export declare function updateZeroOrOne<TableT extends ITable, DelegateT extends SetDelegate<TableT>>(connection: IConnection, table: TableT, where: IAnonymousTypedExpr<boolean>, delegate: DelegateT): (AssertValidSetDelegate_Hack<TableT, DelegateT, Promise<UpdateZeroOrOneResult>>);
