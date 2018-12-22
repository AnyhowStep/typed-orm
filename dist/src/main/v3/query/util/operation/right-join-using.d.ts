import { AfterFromClause, AssertValidJoinTarget } from "../predicate";
import { IAliasedTable } from "../../../aliased-table";
import { JoinUsingDelegate } from "./join-using-delegate";
import { RightJoin } from "./right-join";
export declare function rightJoinUsing<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], AliasedTableT>>(query: QueryT, aliasedTable: AssertValidJoinTarget<QueryT, AliasedTableT>, usingDelegate: UsingDelegateT): (RightJoin<QueryT, AliasedTableT>);
//# sourceMappingURL=right-join-using.d.ts.map