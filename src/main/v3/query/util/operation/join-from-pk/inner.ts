import {AfterFromClause} from "../../predicate";
import {IAliasedTable} from "../../../../aliased-table";
import {JoinFromPkDelegate, AssertValidJoinFromPk_FromDelegate, joinFromPk} from "./join-from-pk";
import {InnerJoin} from "../join";
import {JoinType} from "../../../../join";

export function innerJoinFromPk<
    QueryT extends AfterFromClause,
    DelegateT extends JoinFromPkDelegate<QueryT>,
    ToTableT extends IAliasedTable,
> (
    query : QueryT,
    delegate : DelegateT,
    toTable : AssertValidJoinFromPk_FromDelegate<
        QueryT,
        DelegateT,
        ToTableT
    >,
) : (
    InnerJoin<QueryT, ToTableT>
) {
    return joinFromPk<
        QueryT,
        DelegateT,
        ToTableT,
        false
    >(
        query,
        delegate,
        toTable,
        false,
        JoinType.INNER
    );
}