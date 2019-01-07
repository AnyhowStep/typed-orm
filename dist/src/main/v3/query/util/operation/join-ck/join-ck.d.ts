import { AfterFromClause, AssertValidJoinTarget } from "../../predicate";
import { JoinFromDelegate, JoinToDelegate, JoinResult } from "../join";
import { ITable } from "../../../../table";
import { CandidateKeyUtil } from "../../../../candidate-key";
import { JoinType } from "../../../../join";
export declare type AssertValidJoinCkDelegate_Hack<QueryT extends AfterFromClause, TableT extends ITable, FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>, ToDelegateT extends JoinToDelegate<QueryT, TableT, FromDelegateT>, ResultT> = (CandidateKeyUtil.Array.HasKey<TableT["candidateKeys"], ReturnType<ToDelegateT>[number]["name"][]> extends true ? ResultT : [ReturnType<ToDelegateT>[number]["name"][], "is not a candidate key of", TableT["alias"]]);
export declare function joinCk<QueryT extends AfterFromClause, TableT extends ITable, FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>, ToDelegateT extends JoinToDelegate<QueryT, TableT, FromDelegateT>, NullableT extends boolean>(query: QueryT, table: AssertValidJoinTarget<QueryT, TableT>, fromDelegate: FromDelegateT, toDelegate: ToDelegateT, nullable: NullableT, joinType: JoinType): (AssertValidJoinCkDelegate_Hack<QueryT, TableT, FromDelegateT, ToDelegateT, JoinResult<QueryT, TableT, NullableT>>);
//# sourceMappingURL=join-ck.d.ts.map