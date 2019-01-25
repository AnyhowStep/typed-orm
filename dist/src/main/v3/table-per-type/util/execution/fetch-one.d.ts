import { ITable } from "../../../table";
import { TypeMap } from "../query";
import { IConnection } from "../../../execution";
import { IAnonymousTypedExpr } from "../../../expr";
export declare type FetchOneResult<TableT extends ITable> = (TypeMap<TableT>);
export declare function fetchOne<TableT extends ITable>(connection: IConnection, table: TableT, where: IAnonymousTypedExpr<boolean>): Promise<TypeMap<TableT>>;
