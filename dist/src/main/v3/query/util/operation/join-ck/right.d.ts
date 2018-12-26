import { AfterFromClause, CanWidenColumnTypes, AssertValidJoinTarget } from "../../predicate";
import { ITable } from "../../../../table";
import { JoinFromDelegate, JoinToDelegate, RightJoin } from "../join";
import { AssertValidJoinCkDelegate_Hack } from "./join-ck";
export declare function rightJoinCk<QueryT extends AfterFromClause & CanWidenColumnTypes, TableT extends ITable, FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>, ToDelegateT extends JoinToDelegate<QueryT, TableT, FromDelegateT>>(query: QueryT, table: AssertValidJoinTarget<QueryT, TableT>, fromDelegate: FromDelegateT, toDelegate: ToDelegateT): (AssertValidJoinCkDelegate_Hack<QueryT, TableT, FromDelegateT, ToDelegateT, RightJoin<QueryT, TableT>>);
//# sourceMappingURL=right.d.ts.map