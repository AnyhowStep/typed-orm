import { AfterSelectClause } from "../predicate";
import { IConnection } from "../../../execution";
import { MappedType } from "../operation";
export declare type FetchAll<QueryT extends AfterSelectClause> = (MappedType<QueryT>[]);
export declare function fetchAll<QueryT extends AfterSelectClause>(query: QueryT, connection: IConnection): Promise<FetchAll<QueryT>>;
//# sourceMappingURL=fetch-all.d.ts.map