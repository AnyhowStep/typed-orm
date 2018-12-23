import { AfterFromClause, AssertValidJoinTarget } from "../predicate";
import { JoinUsingDelegate } from "./join-using-delegate";
import { InnerJoin } from "./inner-join";
import { CandidateKeyArrayUtil } from "../../../candidate-key-array";
import { ITable } from "../../../table";
export declare type AssertValidJoinOneUsingDelegate<QueryT extends AfterFromClause, TableT extends ITable, UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], TableT>> = (UsingDelegateT & (CandidateKeyArrayUtil.HasKey<TableT["candidateKeys"], ReturnType<UsingDelegateT>[number]["name"][]> extends true ? unknown : [ReturnType<UsingDelegateT>[number]["name"][], "is not a candidate key of", TableT["alias"]]));
export declare function innerJoinOneUsing<QueryT extends AfterFromClause, TableT extends ITable, UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], TableT>>(query: QueryT, table: AssertValidJoinTarget<QueryT, TableT>, usingDelegate: AssertValidJoinOneUsingDelegate<QueryT, TableT, UsingDelegateT>): (InnerJoin<QueryT, TableT>);
//# sourceMappingURL=inner-join-one-using.d.ts.map