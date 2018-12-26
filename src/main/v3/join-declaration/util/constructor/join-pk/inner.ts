import {IAliasedTable} from "../../../../aliased-table";
import {ITable} from "../../../../table";
import {InnerJoin} from "../join";
import {joinPk} from "./join-pk";
import {JoinType} from "../../../../join";
import {QueryUtil} from "../../../../query";

export function innerJoinPk<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable & { primaryKey : string[] }
> (
    fromTable : FromTableT,
    toTable : QueryUtil.AssertValidJoinPk<FromTableT, ToTableT>
) : InnerJoin<FromTableT, ToTableT> {
    return joinPk<
        FromTableT,
        ToTableT,
        false
    >(
        fromTable,
        toTable,
        false,
        JoinType.INNER
    );
}