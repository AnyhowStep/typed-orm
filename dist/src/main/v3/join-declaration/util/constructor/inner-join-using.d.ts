import { IAliasedTable } from "../../../aliased-table";
import { InnerJoin } from "./inner-join";
import { JoinUsingDelegate } from "./join-using-delegate";
import { AssertValidJoinTarget } from "../predicate";
export declare function innerJoinUsing<FromTableT extends IAliasedTable, ToTableT extends IAliasedTable, UsingDelegateT extends JoinUsingDelegate<FromTableT, ToTableT>>(fromTable: FromTableT, toTable: AssertValidJoinTarget<FromTableT, ToTableT>, usingDelegate: UsingDelegateT): InnerJoin<FromTableT, ToTableT>;
//# sourceMappingURL=inner-join-using.d.ts.map