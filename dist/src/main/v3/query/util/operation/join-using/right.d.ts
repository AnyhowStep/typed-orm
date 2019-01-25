import { AfterFromClause, AssertValidJoinTarget, CanWidenColumnTypes } from "../../predicate";
import { IAliasedTable } from "../../../../aliased-table";
import { RightJoin } from "../join";
import { JoinUsingDelegate } from "./join-using";
export declare function rightJoinUsing<QueryT extends AfterFromClause & CanWidenColumnTypes, AliasedTableT extends IAliasedTable, UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], AliasedTableT>>(query: QueryT & CanWidenColumnTypes, aliasedTable: AssertValidJoinTarget<QueryT, AliasedTableT>, usingDelegate: UsingDelegateT): (RightJoin<QueryT, AliasedTableT>);
