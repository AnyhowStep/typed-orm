import {IAliasedTable} from "../../../aliased-table";
import {ColumnUtil} from "../../../column";
import {QueryUtil} from "../../../query";
import {NonEmptyTuple} from "../../../tuple";

export type JoinUsingDelegate<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable
> = (
    (
        columns : FromTableT["columns"]
    ) => (
        NonEmptyTuple<(
            QueryUtil.JoinUsingColumnUnion<
                ColumnUtil.FromColumnMap<FromTableT["columns"]>,
                ToTableT
            >
        )>
    )
);