import { AfterFromClause, AssertValidJoinTarget } from "../../predicate";
import { IAliasedTable } from "../../../../aliased-table";
import { JoinUsingDelegate } from "./join-using";
import { InnerJoin } from "../join";
export declare function innerJoinUsing<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], AliasedTableT>>(query: QueryT, aliasedTable: AssertValidJoinTarget<QueryT, AliasedTableT>, usingDelegate: UsingDelegateT): (InnerJoin<QueryT, AliasedTableT>);
//# sourceMappingURL=inner.d.ts.map