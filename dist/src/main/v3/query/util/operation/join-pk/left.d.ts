import { AfterFromClause } from "../../predicate";
import { ITable } from "../../../../table";
import { JoinPkDelegate, AssertValidJoinPk_FromDelegate } from "./join-pk";
import { LeftJoin } from "../join";
export declare function leftJoinPk<QueryT extends AfterFromClause, DelegateT extends JoinPkDelegate<QueryT>, ToTableT extends ITable & {
    primaryKey: string[];
}>(query: QueryT, delegate: DelegateT, toTable: AssertValidJoinPk_FromDelegate<QueryT, DelegateT, ToTableT>): (LeftJoin<QueryT, ToTableT>);
