import { IAliasedTable } from "../../../../aliased-table";
import { ITable } from "../../../../table";
import { LeftJoin } from "../join";
import { JoinCkUsingDelegate, AssertValidJoinCkUsingDelegate_Hack } from "./join-ck-using";
import { AssertValidJoinTarget } from "../../predicate";
export declare function leftJoinCkUsing<FromTableT extends IAliasedTable, ToTableT extends ITable, UsingDelegateT extends JoinCkUsingDelegate<FromTableT, ToTableT>>(fromTable: FromTableT, toTable: AssertValidJoinTarget<FromTableT, ToTableT>, usingDelegate: UsingDelegateT): (AssertValidJoinCkUsingDelegate_Hack<FromTableT, ToTableT, UsingDelegateT, LeftJoin<FromTableT, ToTableT>>);
