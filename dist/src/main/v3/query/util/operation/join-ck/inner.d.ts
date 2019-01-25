import { AfterFromClause, AssertValidJoinTarget } from "../../predicate";
import { ITable } from "../../../../table";
import { JoinFromDelegate, JoinToDelegate, InnerJoin } from "../join";
import { AssertValidJoinCkDelegate_Hack } from "./join-ck";
export declare function innerJoinCk<QueryT extends AfterFromClause, TableT extends ITable, FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>, ToDelegateT extends JoinToDelegate<QueryT, TableT, FromDelegateT>>(query: QueryT, table: AssertValidJoinTarget<QueryT, TableT>, fromDelegate: FromDelegateT, toDelegate: ToDelegateT): (AssertValidJoinCkDelegate_Hack<QueryT, TableT, FromDelegateT, ToDelegateT, InnerJoin<QueryT, TableT>>);
