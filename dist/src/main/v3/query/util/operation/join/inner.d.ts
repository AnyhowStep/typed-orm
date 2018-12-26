import { AfterFromClause, AssertValidJoinTarget } from "../../predicate";
import { IAliasedTable } from "../../../../aliased-table";
import { JoinFromDelegate, JoinToDelegate, JoinResult } from "./join";
export declare type InnerJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable> = (JoinResult<QueryT, AliasedTableT, false>);
export declare function innerJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>>(query: QueryT, aliasedTable: AssertValidJoinTarget<QueryT, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>): (InnerJoin<QueryT, AliasedTableT>);
//# sourceMappingURL=inner.d.ts.map