import { AfterSelectClause, MainQuery } from "../predicate";
import { IConnection } from "../../../execution";
import { MappedType } from "../operation";
export declare type FetchZeroOrOne<QueryT extends AfterSelectClause & MainQuery> = (MappedType<QueryT> | undefined);
export declare function fetchZeroOrOne<QueryT extends AfterSelectClause & MainQuery>(query: QueryT, connection: IConnection): Promise<FetchZeroOrOne<QueryT>>;
