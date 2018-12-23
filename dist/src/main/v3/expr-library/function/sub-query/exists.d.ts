import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { IQuery, QueryUtil } from "../../../query";
import { IJoin } from "../../../join";
import { ColumnRefUtil } from "../../../column-ref";
export declare function exists<QueryT extends QueryUtil.AfterFromClause | QueryUtil.AfterSelectClause>(query: IQuery): (Expr<{
    usedRef: (QueryT["_parentJoins"] extends IJoin[] ? ColumnRefUtil.FromJoinArray<QueryT["_parentJoins"]> : {});
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
//# sourceMappingURL=exists.d.ts.map