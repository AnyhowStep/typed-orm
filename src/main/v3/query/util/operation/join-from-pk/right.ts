import {AfterFromClause, CanWidenColumnTypes} from "../../predicate";
import {IAliasedTable} from "../../../../aliased-table";
import {JoinFromPkDelegate, AssertValidJoinFromPk_FromDelegate, joinFromPk} from "./join-from-pk";
import {RightJoin, rightJoin} from "../join";
import {JoinType, Join} from "../../../../join";

export function rightJoinFromPk<
    QueryT extends AfterFromClause & CanWidenColumnTypes,
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
    RightJoin<QueryT, ToTableT>
) {

    const {
        _joins
    } = joinFromPk<
        QueryT,
        DelegateT,
        ToTableT,
        false
    >(
        query,
        delegate,
        toTable,
        false,
        JoinType.RIGHT
    );
    //Pretty sure the last join is the one right join we just
    //added
    const lastJoin = _joins[_joins.length-1] as Join<{
        aliasedTable : ToTableT,
        columns : ToTableT["columns"],
        nullable : false,
    }>;

    return rightJoin<
        QueryT,
        ToTableT,
        () => any
    >(
        query,
        toTable,
        () => lastJoin.from as any,
        () => lastJoin.to as any
    );
}