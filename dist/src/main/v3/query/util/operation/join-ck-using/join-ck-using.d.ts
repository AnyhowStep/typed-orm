import { AfterFromClause, AssertValidJoinTarget } from "../../predicate";
import { ITable } from "../../../../table";
import { JoinType } from "../../../../join";
import { CandidateKeyArrayUtil } from "../../../../candidate-key-array";
import { JoinResult } from "../join";
import { JoinUsingDelegate } from "../join-using";
export declare type AssertValidJoinCkUsingDelegate_Hack<QueryT extends AfterFromClause, TableT extends ITable, UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], TableT>, ResultT> = (CandidateKeyArrayUtil.HasKey<TableT["candidateKeys"], ReturnType<UsingDelegateT>[number]["name"][]> extends true ? ResultT : [ReturnType<UsingDelegateT>[number]["name"][], "is not a candidate key of", TableT["alias"]]);
export declare function joinCkUsing<QueryT extends AfterFromClause, TableT extends ITable, UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], TableT>, NullableT extends boolean>(query: QueryT, table: AssertValidJoinTarget<QueryT, TableT>, usingDelegate: UsingDelegateT, nullable: NullableT, joinType: JoinType): (AssertValidJoinCkUsingDelegate_Hack<QueryT, TableT, UsingDelegateT, JoinResult<QueryT, TableT, NullableT>>);
//# sourceMappingURL=join-ck-using.d.ts.map