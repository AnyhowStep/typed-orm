import {IAliasedTable} from "../../../aliased-table";
import {ITable} from "../../../table"
import {LeftJoin} from "./left-join";
import {AssertValidJoinUsingPkTarget, invokeJoinUsingPk} from "./join-using-pk";
import {JoinType} from "../../../join";

export function leftJoinUsingPk<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable & { primaryKey : string[] }
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinUsingPkTarget<FromTableT, ToTableT>
) : LeftJoin<FromTableT, ToTableT> {
    return invokeJoinUsingPk<
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