import { ITable } from "../../../table";
import { TypeMap } from "../query";
import { IConnection } from "../../../execution";
import { IAnonymousTypedExpr } from "../../../expr";
export declare type FetchZeroOrOneResult<TableT extends ITable> = (TypeMap<TableT> | undefined);
export declare function fetchZeroOrOne<TableT extends ITable>(connection: IConnection, table: TableT, where: IAnonymousTypedExpr<boolean>): Promise<FetchZeroOrOneResult<TableT>>;
//# sourceMappingURL=fetch-zero-or-one.d.ts.map