import {AnyAliasedTable} from "../aliased-table";
import {Tuple, TupleKeys, TupleLength} from "../tuple";
import {Column, AnyColumn} from "../column";

export type JoinToColumn<
    ToTableT extends AnyAliasedTable,
    FromColumnT extends AnyColumn
> = (
    {
        [columnName in Extract<keyof ToTableT["columns"], string>] : (
            Column<
                ToTableT["alias"],
                columnName,
                //We allow joining to columns that may potentially be `null`,
                //Of course, joining to `null` just results in the row not
                //appearing in the result set
                ReturnType<FromColumnT["assertDelegate"]>|null
            >
        )
    }[Extract<keyof ToTableT["columns"], string>]
    //IColumn<TableAlias<TableT>, keyof TableColumns<TableT>, ColumnType<FromColumnT>|null>
);

export type JoinTo<
    ToTableT extends AnyAliasedTable,
    FromT extends Tuple<AnyColumn>
> = (
    FromT[TupleKeys<FromT>] extends AnyColumn ?
        (
            {
                [k in TupleKeys<FromT>] : (
                    FromT[k] extends AnyColumn ?
                        JoinToColumn<ToTableT, FromT[k]> :
                        never
                )
            } &
            {
                "0" : JoinToColumn<ToTableT, FromT[0]>,
                length : TupleLength<FromT>
            } &
            AnyColumn[]
        ) :
        never
);

export type JoinToDelegate<
    ToTableT extends AnyAliasedTable,
    FromT extends Tuple<AnyColumn>
> = (
    (t : ToTableT["columns"]) => JoinTo<ToTableT, FromT>
);
