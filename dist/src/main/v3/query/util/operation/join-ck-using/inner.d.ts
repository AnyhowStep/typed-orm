import { AfterFromClause, AssertValidJoinTarget } from "../../predicate";
import { ITable } from "../../../../table";
import { JoinUsingDelegate } from "../join-using";
import { AssertValidJoinCkUsingDelegate_Hack } from "./join-ck-using";
import { InnerJoin } from "../join";
export declare function innerJoinCkUsing<QueryT extends AfterFromClause, TableT extends ITable, UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], TableT>>(query: QueryT, table: AssertValidJoinTarget<QueryT, TableT>, usingDelegate: UsingDelegateT): (AssertValidJoinCkUsingDelegate_Hack<QueryT, TableT, UsingDelegateT, InnerJoin<QueryT, TableT>>);
//# sourceMappingURL=inner.d.ts.map