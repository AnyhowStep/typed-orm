import {IAliasedTable} from "../../../../aliased-table";
import {ITable} from "../../../../table"
import {LeftJoin} from "../join";
import {leftJoinPk} from "../join-pk";
import {QueryUtil} from "../../../../query";

export function leftJoinFromPk<
    FromTableT extends ITable & { primaryKey : string[] },
    ToTableT extends IAliasedTable
> (
    fromTable : QueryUtil.AssertValidJoinPk<ToTableT, FromTableT>,
    toTable : ToTableT
) : LeftJoin<FromTableT, ToTableT> {
    return leftJoinPk<
        ToTableT,
        FromTableT
    >(
        toTable,
        fromTable
    ).swap();
}