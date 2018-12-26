import {AfterFromClause} from "../../predicate";
import {IAliasedTable} from "../../../../aliased-table";
import {JoinFromPkDelegate, AssertValidJoinFromPk_FromDelegate, joinFromPk} from "./join-from-pk";
import {LeftJoin} from "../join";
import {JoinType} from "../../../../join";

export function leftJoinFromPk<
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
    LeftJoin<QueryT, ToTableT>
) {
    return joinFromPk<
        QueryT,
        DelegateT,
        ToTableT,
        true
    >(
        query,
        delegate,
        toTable,
        true,
        JoinType.LEFT
    );
}