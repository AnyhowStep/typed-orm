import { AfterFromClause, CanWidenColumnTypes } from "../../predicate";
import { ITable } from "../../../../table";
import { JoinPkDelegate, AssertValidJoinPk_FromDelegate } from "./join-pk";
import { RightJoin } from "../join";
export declare function rightJoinPk<QueryT extends AfterFromClause & CanWidenColumnTypes, DelegateT extends JoinPkDelegate<QueryT>, ToTableT extends ITable & {
    primaryKey: string[];
}>(query: QueryT, delegate: DelegateT, toTable: AssertValidJoinPk_FromDelegate<QueryT, DelegateT, ToTableT>): (RightJoin<QueryT, ToTableT>);
//# sourceMappingURL=right.d.ts.map