import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { QueryUtil } from "../../../query";
import { IJoin } from "../../../join";
import { ColumnRefUtil } from "../../../column-ref";
export declare function exists<QueryT extends QueryUtil.AfterFromClause | QueryUtil.AfterSelectClause>(query: QueryT): (Expr<{
    usedRef: (QueryT["_parentJoins"] extends IJoin[] ? ColumnRefUtil.FromJoinArray<QueryT["_parentJoins"]> : {});
    assertDelegate: sd.SafeMapper<boolean>;
}>);
