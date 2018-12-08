import { AfterFromClause, AssertUniqueJoinTarget } from "../predicate";
import { IAliasedTable } from "../../../aliased-table";
import { JoinUsingDelegate } from "./join-using-delegate";
import { LeftJoin } from "./left-join";
export declare function leftJoinUsing<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], AliasedTableT>>(query: QueryT, aliasedTable: AssertUniqueJoinTarget<QueryT, AliasedTableT>, usingDelegate: UsingDelegateT): (LeftJoin<QueryT, AliasedTableT>);
//# sourceMappingURL=left-join-using.d.ts.map