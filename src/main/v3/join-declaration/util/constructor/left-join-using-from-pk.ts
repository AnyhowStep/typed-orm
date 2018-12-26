import {IAliasedTable} from "../../../aliased-table";
import {ITable} from "../../../table"
import {LeftJoin} from "./left-join";
import {AssertValidJoinUsingPkTarget} from "./join-using-pk";
import {leftJoinUsingPk} from "./left-join-using-pk";

export function leftJoinUsingFromPk<
    FromTableT extends ITable & { primaryKey : string[] },
    ToTableT extends IAliasedTable
> (
    fromTable : AssertValidJoinUsingPkTarget<ToTableT, FromTableT>,
    toTable : ToTableT
) : LeftJoin<FromTableT, ToTableT> {
    return leftJoinUsingPk<
        ToTableT,
        FromTableT
    >(
        toTable,
        fromTable
    ).swap();
}