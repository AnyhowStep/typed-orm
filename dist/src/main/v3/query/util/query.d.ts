import { IQuery } from "../query";
import { QueryTreeArray } from "../../query-tree";
import { AfterSelectClause } from "./predicate";
export declare function queryTreeSelects(query: AfterSelectClause): QueryTreeArray;
export declare function queryTreeJoins(query: IQuery): QueryTreeArray;
export declare function queryTreeWhere(query: IQuery): QueryTreeArray;
export declare function queryTreeGroupBy(query: IQuery): QueryTreeArray;
export declare function queryTreeHaving(query: IQuery): QueryTreeArray;
//# sourceMappingURL=query.d.ts.map