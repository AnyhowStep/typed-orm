import { AfterFromClause, CanWidenColumnTypes } from "../../predicate";
import { IAliasedTable } from "../../../../aliased-table";
import { JoinFromPkDelegate, AssertValidJoinFromPk_FromDelegate } from "./join-from-pk";
import { RightJoin } from "../join";
export declare function rightJoinFromPk<QueryT extends AfterFromClause & CanWidenColumnTypes, DelegateT extends JoinFromPkDelegate<QueryT>, ToTableT extends IAliasedTable>(query: QueryT, delegate: DelegateT, toTable: AssertValidJoinFromPk_FromDelegate<QueryT, DelegateT, ToTableT>): (RightJoin<QueryT, ToTableT>);
//# sourceMappingURL=right.d.ts.map