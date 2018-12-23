import { AfterFromClause, AssertValidJoinTarget } from "../predicate";
import { JoinFromDelegate, JoinToDelegate } from "./join-delegate";
import { InnerJoin } from "./inner-join";
import { ITable } from "../../../table";
import { CandidateKeyArrayUtil } from "../../../candidate-key-array";
export declare type AssertValidJoinToOneDelegate<QueryT extends AfterFromClause, TableT extends ITable, FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>, ToDelegateT extends JoinToDelegate<QueryT, TableT, FromDelegateT>> = (ToDelegateT & (CandidateKeyArrayUtil.HasKey<TableT["candidateKeys"], ReturnType<ToDelegateT>[number]["name"][]> extends true ? unknown : [ReturnType<ToDelegateT>[number]["name"][], "is not a candidate key of", TableT["alias"]]));
export declare function innerJoinOne<QueryT extends AfterFromClause, TableT extends ITable, FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>, ToDelegateT extends JoinToDelegate<QueryT, TableT, FromDelegateT>>(query: QueryT, table: AssertValidJoinTarget<QueryT, TableT>, fromDelegate: FromDelegateT, toDelegate: AssertValidJoinToOneDelegate<QueryT, TableT, FromDelegateT, ToDelegateT>): (InnerJoin<QueryT, TableT>);
//# sourceMappingURL=inner-join-one.d.ts.map