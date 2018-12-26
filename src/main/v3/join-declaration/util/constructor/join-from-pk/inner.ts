import {IAliasedTable} from "../../../../aliased-table";
import {ITable} from "../../../../table"
import {InnerJoin} from "../join";
import {innerJoinPk} from "../join-pk";
import {QueryUtil} from "../../../../query";

export function innerJoinFromPk<
    FromTableT extends ITable & { primaryKey : string[] },
    ToTableT extends IAliasedTable
> (
    fromTable : QueryUtil.AssertValidJoinPk<ToTableT, FromTableT>,
    toTable : ToTableT
) : InnerJoin<FromTableT, ToTableT> {
    return innerJoinPk<
        ToTableT,
        FromTableT
    >(
        toTable,
        fromTable
    ).swap();
}