import * as sd from "schema-decorator";
import {ColumnReferences} from "./column-references";
import {Tuple, TupleKeys, TupleLength} from "./tuple";
import {AnyAliasedTable} from "./aliased-table";
import {IColumn, AnyColumn} from "./column";
import {TableAlias, TableColumns} from "./table-operation";
import {ColumnType} from "./column-operation";
import {ColumnOfReferences} from "./column-references-operation";

export interface Join<
    ColumnReferencesT extends ColumnReferences,
    NullableT extends boolean,
> {
    columnReferences : ColumnReferencesT,
    nullable : NullableT,
}
export type AnyJoin = Join<{}, any>;

export type ToNullableJoinTuple<TupleT extends Tuple<AnyJoin>> = (
    TupleT[TupleKeys<TupleT>] extends AnyJoin ?
        (
            {
                [index in TupleKeys<TupleT>] : (
                    TupleT[index] extends Join<infer ColumnReferencesT, boolean> ?
                        Join<
                            ColumnReferencesT,
                            true
                        > :
                        never
                )
            } &
            { length : TupleLength<TupleT> } &
            (
                Join<
                    TupleT[TupleKeys<TupleT>]["columnReferences"],
                    true
                >
            )[] &
            {
                "0" : (
                    Join<
                        TupleT["0"]["columnReferences"],
                        true
                    >
                )
            }
        ) :
        (never)
);

export type JoinFromTupleCallback<
    ColumnReferencesT extends ColumnReferences,
    TupleT extends Tuple<ColumnOfReferences<ColumnReferencesT>>
> = (
    TupleT |
    (
        (columnReferences : ColumnReferencesT) => TupleT
    )
);

export type JoinFromTupleOfCallback<
    JoinFromTupleCallbackT extends JoinFromTupleCallback<any, Tuple<AnyColumn>>
> = (
    JoinFromTupleCallbackT extends Tuple<AnyColumn> ?
    JoinFromTupleCallbackT :
    JoinFromTupleCallbackT extends (...args : any[]) => infer TupleT ?
    TupleT :
    ("Invalid FromColumnsCallbackT or could not infer TupleT"|void|never)
)

export type JoinToColumn<
    TableT extends AnyAliasedTable,
    FromColumnT extends AnyColumn
> = (
    {
        [name in keyof TableColumns<TableT>] : (
            IColumn<
                TableAlias<TableT>,
                name,
                ColumnType<FromColumnT>|null
            >
        )
    }[keyof TableColumns<TableT>]
    //IColumn<TableAlias<TableT>, keyof TableColumns<TableT>, ColumnType<FromColumnT>|null>
);

export type JoinToTuple<
    TableT extends AnyAliasedTable,
    FromColumnsT extends Tuple<AnyColumn>
> = (
    FromColumnsT[TupleKeys<FromColumnsT>] extends AnyColumn ?
        (
            {
                [k in TupleKeys<FromColumnsT>] : (
                    FromColumnsT[k] extends AnyColumn ?
                        JoinToColumn<TableT, FromColumnsT[k]> :
                        never
                )
            } &
            { length : TupleLength<FromColumnsT> } &
            JoinToColumn<TableT, FromColumnsT[TupleKeys<FromColumnsT>]>[] &
            {
                "0" : JoinToColumn<TableT, FromColumnsT[0]>
            }
        ) :
        (never)
);

export type JoinToTupleCallback<
    TableT extends AnyAliasedTable,
    FromColumnsT extends Tuple<AnyColumn>
> = (
    JoinToTuple<TableT, FromColumnsT> |
    (
        (t : TableT["columns"]) => JoinToTuple<TableT, FromColumnsT>
    )
);

export type MatchesJoinFromColumn<
    ColumnReferencesT extends ColumnReferences,
    ColumnT extends AnyColumn
> = (
    ColumnT extends IColumn<infer AliasT, infer NameT, infer TypeT> ?
        (
            AliasT extends keyof ColumnReferencesT ?
                (
                    NameT extends keyof ColumnReferencesT[AliasT] ?
                        (
                            sd.TypeOf<ColumnReferencesT[AliasT][NameT]["assertDelegate"]> extends TypeT ?
                                (
                                    ColumnT
                                ) :
                                ("TypeT mismatch"|TypeT|void)
                        ) :
                        ("NameT is not a column"|NameT|void)
                ) :
                ("AliasT is not a table reference"|AliasT|void)
        ) :
        ("Could not infer alias, name, or type from ColumnT"|ColumnT|void)
);
export type MatchesJoinFromTuple<
    ColumnReferencesT extends ColumnReferences,
    JoinFromTuple extends Tuple<AnyColumn>
> = (
    JoinFromTuple[TupleKeys<JoinFromTuple>] extends AnyColumn ?
        (
            {
                [k in TupleKeys<JoinFromTuple>] : (
                    JoinFromTuple[k] extends AnyColumn ?
                        MatchesJoinFromColumn<ColumnReferencesT, JoinFromTuple[k]> :
                        never
                )
            } &
            { length : TupleLength<JoinFromTuple> } &
            MatchesJoinFromColumn<ColumnReferencesT, JoinFromTuple[TupleKeys<JoinFromTuple>]>[] &
            {
                "0" : MatchesJoinFromColumn<ColumnReferencesT, JoinFromTuple[0]>
            }
        ) :
        (never)
);
