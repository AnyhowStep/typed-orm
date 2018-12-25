import {IAliasedTable} from "../../../aliased-table";
import {ColumnUtil} from "../../../column";
import {QueryUtil} from "../../../query";
import {NonEmptyTuple} from "../../../tuple";
import {ColumnMapUtil} from "../../../column-map";

export type JoinUsingDelegate<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable
> = (
    (
        columns : ColumnMapUtil.FromColumnArray<
            QueryUtil.JoinUsingColumnUnion<
                ColumnUtil.FromColumnMap<FromTableT["columns"]>,
                ToTableT
            >[]
        >
    ) => (
        NonEmptyTuple<(
            QueryUtil.JoinUsingColumnUnion<
                ColumnUtil.FromColumnMap<FromTableT["columns"]>,
                ToTableT
            >
        )>
    )
);