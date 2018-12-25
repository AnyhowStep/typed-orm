import { IAliasedTable } from "../../../aliased-table";
import { ITable } from "../../../table";
import { LeftJoin } from "./left-join";
import { JoinOneUsingDelegate, AssertValidJoinOneUsingDelegate_Hack } from "./join-one-using-delegate";
import { AssertValidJoinTarget } from "../predicate";
export declare function leftJoinOneUsing<FromTableT extends IAliasedTable, ToTableT extends ITable, UsingDelegateT extends JoinOneUsingDelegate<FromTableT, ToTableT>>(fromTable: FromTableT, toTable: AssertValidJoinTarget<FromTableT, ToTableT>, usingDelegate: UsingDelegateT): (AssertValidJoinOneUsingDelegate_Hack<FromTableT, ToTableT, UsingDelegateT, LeftJoin<FromTableT, ToTableT>>);
//# sourceMappingURL=left-join-one-using.d.ts.map