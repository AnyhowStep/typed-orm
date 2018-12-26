import {AfterFromClause} from "../../predicate";
import {ITable} from "../../../../table";
import {JoinPkDelegate, AssertValidJoinPk_FromDelegate, joinPk} from "./join-pk";
import {LeftJoin} from "../join";
import {JoinType} from "../../../../join";

export function leftJoinPk<
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
    LeftJoin<QueryT, ToTableT>
) {
    return joinPk<
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