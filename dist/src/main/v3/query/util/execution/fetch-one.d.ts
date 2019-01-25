import { AfterSelectClause, MainQuery } from "../predicate";
import { IConnection } from "../../../execution";
import { MappedType } from "../operation";
export declare type FetchOne<QueryT extends AfterSelectClause & MainQuery> = (MappedType<QueryT>);
export declare function fetchOne<QueryT extends AfterSelectClause & MainQuery>(query: QueryT, connection: IConnection): Promise<FetchOne<QueryT>>;
