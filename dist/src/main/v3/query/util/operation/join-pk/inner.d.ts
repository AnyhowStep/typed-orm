import { AfterFromClause } from "../../predicate";
import { ITable } from "../../../../table";
import { JoinPkDelegate, AssertValidJoinPk_FromDelegate } from "./join-pk";
import { InnerJoin } from "../join";
export declare function innerJoinPk<QueryT extends AfterFromClause, DelegateT extends JoinPkDelegate<QueryT>, ToTableT extends ITable & {
    primaryKey: string[];
}>(query: QueryT, delegate: DelegateT, toTable: AssertValidJoinPk_FromDelegate<QueryT, DelegateT, ToTableT>): (InnerJoin<QueryT, ToTableT>);
