import { AfterFromClause, AssertUniqueJoinTarget } from "../predicate";
import { IAliasedTable } from "../../../aliased-table";
import { JoinUsingDelegate } from "./join-using-delegate";
import { InnerJoin } from "./inner-join";
export declare function innerJoinUsing<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, UsingDelegateT extends JoinUsingDelegate<QueryT["joins"], AliasedTableT>>(query: QueryT, aliasedTable: AssertUniqueJoinTarget<QueryT, AliasedTableT>, usingDelegate: UsingDelegateT): (InnerJoin<QueryT, AliasedTableT>);
//# sourceMappingURL=inner-join-using.d.ts.map