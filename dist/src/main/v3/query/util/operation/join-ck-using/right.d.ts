import { AfterFromClause, CanWidenColumnTypes, AssertValidJoinTarget } from "../../predicate";
import { ITable } from "../../../../table";
import { JoinUsingDelegate } from "../join-using";
import { AssertValidJoinCkUsingDelegate_Hack } from "./join-ck-using";
import { RightJoin } from "../join";
export declare function rightJoinCkUsing<QueryT extends AfterFromClause & CanWidenColumnTypes, TableT extends ITable, UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], TableT>>(query: QueryT, table: AssertValidJoinTarget<QueryT, TableT>, usingDelegate: UsingDelegateT): (AssertValidJoinCkUsingDelegate_Hack<QueryT, TableT, UsingDelegateT, RightJoin<QueryT, TableT>>);
//# sourceMappingURL=right.d.ts.map