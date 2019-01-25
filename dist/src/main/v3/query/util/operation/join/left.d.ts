import { AfterFromClause, AssertValidJoinTarget } from "../../predicate";
import { IAliasedTable } from "../../../../aliased-table";
import { JoinFromDelegate, JoinToDelegate, JoinResult } from "./join";
export declare type LeftJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable> = (JoinResult<QueryT, AliasedTableT, true>);
export declare function leftJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>>(query: QueryT, aliasedTable: AssertValidJoinTarget<QueryT, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>): (LeftJoin<QueryT, AliasedTableT>);
