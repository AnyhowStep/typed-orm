import { IAliasedTable } from "../../../aliased-table";
import { LeftJoin } from "./left-join";
import { JoinUsingDelegate } from "./join-using-delegate";
import { AssertValidJoinTarget } from "../predicate";
export declare function leftJoinUsing<FromTableT extends IAliasedTable, ToTableT extends IAliasedTable, UsingDelegateT extends JoinUsingDelegate<FromTableT, ToTableT>>(fromTable: FromTableT, toTable: AssertValidJoinTarget<FromTableT, ToTableT>, usingDelegate: UsingDelegateT): LeftJoin<FromTableT, ToTableT>;
//# sourceMappingURL=left-join-using.d.ts.map