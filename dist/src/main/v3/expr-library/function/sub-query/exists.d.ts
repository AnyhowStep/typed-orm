import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { IQuery, QueryUtil } from "../../../query";
import { IJoin } from "../../../join";
import { ColumnUtil } from "../../../column";
export declare function exists<QueryT extends QueryUtil.AfterFromClause | QueryUtil.AfterSelectClause>(query: IQuery): (Expr<{
    usedColumns: (QueryT["_parentJoins"] extends IJoin[] ? ColumnUtil.FromJoinArray<QueryT["_parentJoins"]>[] : never[]);
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
