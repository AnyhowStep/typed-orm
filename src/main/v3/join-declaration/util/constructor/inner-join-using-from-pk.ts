import {IAliasedTable} from "../../../aliased-table";
import {ITable} from "../../../table"
import {InnerJoin} from "./inner-join";
import {AssertValidJoinUsingPkTarget} from "./join-using-pk";
import {innerJoinUsingPk} from "./inner-join-using-pk";

export function innerJoinUsingFromPk<
    FromTableT extends ITable & { primaryKey : string[] },
    ToTableT extends IAliasedTable
> (
    fromTable : AssertValidJoinUsingPkTarget<ToTableT, FromTableT>,
    toTable : ToTableT
) : InnerJoin<FromTableT, ToTableT> {
    return innerJoinUsingPk<
        ToTableT,
        FromTableT
    >(
        toTable,
        fromTable
    ).swap();
}