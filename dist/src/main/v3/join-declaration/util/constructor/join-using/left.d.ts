import { IAliasedTable } from "../../../../aliased-table";
import { LeftJoin } from "../join";
import { JoinUsingDelegate } from "./join-using";
import { AssertValidJoinTarget } from "../../predicate";
export declare function leftJoinUsing<FromTableT extends IAliasedTable, ToTableT extends IAliasedTable, UsingDelegateT extends JoinUsingDelegate<FromTableT, ToTableT>>(fromTable: FromTableT, toTable: AssertValidJoinTarget<FromTableT, ToTableT>, usingDelegate: UsingDelegateT): LeftJoin<FromTableT, ToTableT>;
//# sourceMappingURL=left.d.ts.map