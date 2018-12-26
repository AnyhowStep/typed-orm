import { AfterSelectClause, MainQuery } from "../predicate";
import { IConnection } from "../../../execution";
import { MappedType } from "../operation";
export declare type FetchAll<QueryT extends AfterSelectClause & MainQuery> = (MappedType<QueryT>[]);
export declare function fetchAll<QueryT extends AfterSelectClause & MainQuery>(query: QueryT, connection: IConnection): Promise<FetchAll<QueryT>>;
//# sourceMappingURL=fetch-all.d.ts.map