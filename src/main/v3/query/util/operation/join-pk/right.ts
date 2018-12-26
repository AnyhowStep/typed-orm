import {AfterFromClause, CanWidenColumnTypes} from "../../predicate";
import {ITable} from "../../../../table";
import {JoinPkDelegate, AssertValidJoinPk_FromDelegate, joinPk} from "./join-pk";
import {RightJoin, rightJoin} from "../join";
import {JoinType, Join} from "../../../../join";

export function rightJoinPk<
    QueryT extends AfterFromClause & CanWidenColumnTypes,
    DelegateT extends JoinPkDelegate<QueryT>,
    ToTableT extends ITable & { primaryKey : string[] },
> (
    query : QueryT,
    delegate : DelegateT,
    toTable : AssertValidJoinPk_FromDelegate<
        QueryT,
        DelegateT,
        ToTableT
    >
) : (
    RightJoin<QueryT, ToTableT>
) {
    const {
        _joins
    } = joinPk<
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