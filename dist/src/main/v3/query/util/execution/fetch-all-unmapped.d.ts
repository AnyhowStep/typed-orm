import { AfterSelectClause, MainQuery } from "../predicate";
import { IConnection } from "../../../execution";
import { UnmappedType } from "../operation";
export declare type FetchAllUnmapped<QueryT extends AfterSelectClause & MainQuery> = (UnmappedType<QueryT>[]);
export declare function fetchAllUnmapped<QueryT extends AfterSelectClause & MainQuery>(query: QueryT, connection: IConnection): Promise<FetchAllUnmapped<QueryT>>;
