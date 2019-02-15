import { MainQuery, AfterFromClause, AfterSelectClause } from "../predicate";
import { IConnection } from "../../../execution";
export declare function exists(query: MainQuery & (AfterFromClause | AfterSelectClause), connection: IConnection): Promise<boolean>;
