import { AfterFromClause, AssertValidJoinTarget } from "../../predicate";
import { ITable } from "../../../../table";
import { JoinFromDelegate, JoinToDelegate, LeftJoin } from "../join";
import { AssertValidJoinCkDelegate_Hack } from "./join-ck";
export declare function leftJoinCk<QueryT extends AfterFromClause, TableT extends ITable, FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>, ToDelegateT extends JoinToDelegate<QueryT, TableT, FromDelegateT>>(query: QueryT, table: AssertValidJoinTarget<QueryT, TableT>, fromDelegate: FromDelegateT, toDelegate: ToDelegateT): (AssertValidJoinCkDelegate_Hack<QueryT, TableT, FromDelegateT, ToDelegateT, LeftJoin<QueryT, TableT>>);
//# sourceMappingURL=left.d.ts.map