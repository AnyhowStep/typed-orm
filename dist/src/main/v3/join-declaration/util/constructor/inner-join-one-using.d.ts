import { IAliasedTable } from "../../../aliased-table";
import { ITable } from "../../../table";
import { InnerJoin } from "./inner-join";
import { JoinOneUsingDelegate, AssertValidJoinOneUsingDelegate_Hack } from "./join-one-using-delegate";
import { AssertValidJoinTarget } from "../predicate";
export declare function innerJoinOneUsing<FromTableT extends IAliasedTable, ToTableT extends ITable, UsingDelegateT extends JoinOneUsingDelegate<FromTableT, ToTableT>>(fromTable: FromTableT, toTable: AssertValidJoinTarget<FromTableT, ToTableT>, usingDelegate: UsingDelegateT): (AssertValidJoinOneUsingDelegate_Hack<FromTableT, ToTableT, UsingDelegateT, InnerJoin<FromTableT, ToTableT>>);
//# sourceMappingURL=inner-join-one-using.d.ts.map