import { AfterFromClause } from "../../predicate";
import { IAliasedTable } from "../../../../aliased-table";
import { JoinFromPkDelegate, AssertValidJoinFromPk_FromDelegate } from "./join-from-pk";
import { InnerJoin } from "../join";
export declare function innerJoinFromPk<QueryT extends AfterFromClause, DelegateT extends JoinFromPkDelegate<QueryT>, ToTableT extends IAliasedTable>(query: QueryT, delegate: DelegateT, toTable: AssertValidJoinFromPk_FromDelegate<QueryT, DelegateT, ToTableT>): (InnerJoin<QueryT, ToTableT>);
