import {IAliasedTable} from "../../../aliased-table";
import {ITable} from "../../../table"
import {InnerJoin} from "./inner-join";
import {AssertValidJoinUsingPkTarget, invokeJoinUsingPk} from "./join-using-pk";
import {JoinType} from "../../../join";

export function innerJoinUsingPk<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable & { primaryKey : string[] }
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinUsingPkTarget<FromTableT, ToTableT>
) : InnerJoin<FromTableT, ToTableT> {
    return invokeJoinUsingPk<
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