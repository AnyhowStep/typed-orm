import {AfterFromClause} from "../../predicate";
import {ITable} from "../../../../table";
import {JoinPkDelegate, AssertValidJoinPk_FromDelegate, joinPk} from "./join-pk";
import {InnerJoin} from "../join";
import {JoinType} from "../../../../join";

export function innerJoinPk<
    QueryT extends AfterFromClause,
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
    InnerJoin<QueryT, ToTableT>
) {
    return joinPk<
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