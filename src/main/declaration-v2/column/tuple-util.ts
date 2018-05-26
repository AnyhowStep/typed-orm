import {Tuple, TupleKeys, TupleLength} from "../tuple";
import {AnyColumn} from "./column";
import {ColumnUtil} from "./util";

export namespace ColumnTupleUtil {
    export type WithTableAlias<
        TupleT extends Tuple<AnyColumn>,
        NewTableAliasT extends string
    > = (
        {
            [index in TupleKeys<TupleT>] : (
                TupleT[index] extends AnyColumn ?
                    ColumnUtil.WithTableAlias<TupleT[index], NewTableAliasT> :
                    never
            )
        } &
        { length : TupleLength<TupleT> } &
        { "0" : ColumnUtil.WithTableAlias<TupleT[0], NewTableAliasT> } &
        AnyColumn[]
    );
    export function withTableAlias<
        TupleT extends Tuple<any>,
        NewTableAliasT extends string
    > (tuple : TupleT, newTableAlias : NewTableAliasT) : (
        WithTableAlias<TupleT, NewTableAliasT>
    ) {
        return tuple.map((column) => {
            return ColumnUtil.withTableAlias(column, newTableAlias);
        }) as any;
    }

    export type HasDuplicate<TupleT extends Tuple<AnyColumn>> = (
        TupleT["length"] extends 1 ?
            //If there's only one column, it's not a duplicate
            false :
            (
                {
                    [index in TupleKeys<TupleT>]: (
                        {
                            [other in Exclude<TupleKeys<TupleT>, index>] : (
                                Extract<TupleT[index], TupleT[other]> extends never ?
                                    false :
                                    true
                            )
                        }[Exclude<TupleKeys<TupleT>, index>]
                    )
                }[TupleKeys<TupleT>]
            )
    );
    export type MapToColumnNames<TupleT extends Tuple<AnyColumn>> = (
        {
            [index in TupleKeys<TupleT>] : (
                TupleT[index] extends AnyColumn ?
                    TupleT[index]["name"] :
                    never
            )
        } &
        {
            "0" : TupleT[0]["name"],
            length : TupleLength<TupleT>
        } &
        string[]
    );
}
