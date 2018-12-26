import {IAliasedTable} from "../../../../aliased-table";
import {ITable} from "../../../../table";
import {LeftJoin} from "../join";
import {joinPk} from "./join-pk";
import {JoinType} from "../../../../join";
import {QueryUtil} from "../../../../query";

export function leftJoinPk<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable & { primaryKey : string[] }
> (
    fromTable : FromTableT,
    toTable : QueryUtil.AssertValidJoinPk<FromTableT, ToTableT>
) : LeftJoin<FromTableT, ToTableT> {
    return joinPk<
        FromTableT,
        ToTableT,
        true
    >(
        fromTable,
        toTable,
        true,
        JoinType.LEFT
    );
}