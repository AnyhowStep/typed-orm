import {IAliasedTable} from "../../../aliased-table";
import {IJoin} from "../../../join";
import {ColumnRefUtil} from "../../../column-ref";
import {IColumn, ColumnUtil} from "../../../column";
import {NonEmptyTuple} from "../../../tuple";

export type JoinUsingColumnUnion<
    ColumnT extends IColumn,
    AliasedTableT extends IAliasedTable
> = (
    ColumnT extends IColumn ?
    (
        ColumnUtil.WithTableAlias<
            ColumnT,
            AliasedTableT["alias"]
        > extends ColumnUtil.FromColumnMap<AliasedTableT["columns"]> ?
        Extract<ColumnT, IColumn> :
        never
    ) :
    never
);
export function joinUsingColumns<
    ColumnsT extends IColumn[],
    AliasedTableT extends IAliasedTable
> (
    columns : ColumnsT,
    aliasedTable : AliasedTableT
) : JoinUsingColumnUnion<ColumnsT[number], AliasedTableT>[] {
    //During run-time, we cannot actually check if the assertDelegate
    //of a column matches...
    return columns.filter(column => {
        return aliasedTable.columns[column.name] != undefined;
    }) as any[];
}
export type JoinUsingDelegate<
    JoinsT extends IJoin[],
    AliasedTableT extends IAliasedTable
> = (
    (columns : ColumnRefUtil.ToConvenient<
        ColumnRefUtil.FromColumnArray<
            JoinUsingColumnUnion<
                ColumnUtil.FromJoinArray<JoinsT>,
                AliasedTableT
            >[]
        >
    >) => (
        NonEmptyTuple<(
            JoinUsingColumnUnion<
                ColumnUtil.FromJoinArray<JoinsT>,
                AliasedTableT
            >
        )>
    )
);
