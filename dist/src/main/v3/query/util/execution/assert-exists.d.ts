import { MainQuery, AfterFromClause, AfterSelectClause } from "../predicate";
import { IConnection } from "../../../execution";
export declare function assertExists(query: MainQuery & (AfterFromClause | AfterSelectClause), connection: IConnection): Promise<void>;
