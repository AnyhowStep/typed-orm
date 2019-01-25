import { AfterFromClause, AssertValidJoinTarget } from "../../predicate";
import { IAliasedTable } from "../../../../aliased-table";
import { JoinUsingDelegate } from "./join-using";
import { LeftJoin } from "../join";
export declare function leftJoinUsing<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], AliasedTableT>>(query: QueryT, aliasedTable: AssertValidJoinTarget<QueryT, AliasedTableT>, usingDelegate: UsingDelegateT): (LeftJoin<QueryT, AliasedTableT>);
