import * as sd from "schema-decorator";
import {ColumnReferences} from "./column-references";
import {Tuple, TupleKeys, TupleLength} from "./tuple";
import {AnyAliasedTable} from "./aliased-table";
import {IColumn, AnyColumn} from "./column";
import {TableAlias, TableColumns} from "./table-operation";
import {ColumnType} from "./column-operation";
import {ColumnOfReferences, ReplaceColumnOfReference} from "./column-references-operation";

//TODO Move "FROM" to its own thing, it isn't a JOIN
export interface IJoin<
    JoinTypeT extends "FROM"|"INNER"|"LEFT"|"RIGHT",
    IndexT extends number,
    //Needed for update-builder to work, relies on `isMutable` type
    TableT extends AnyAliasedTable,
    ColumnReferencesT extends ColumnReferences,
    NullableT extends boolean
> {
    readonly joinType : JoinTypeT,
    readonly index : IndexT,
    readonly table : TableT,
    readonly columnReferences : ColumnReferencesT,
    readonly nullable : NullableT,

    //TODO Maybe strongly type? Seems unnecessary
    readonly from : AnyColumn[],
    readonly to : AnyColumn[]
}
export type AnyJoin = IJoin<any, any, any, any, any>;

export type JoinReferences = {
    [tableAlias : string] : AnyJoin
};
export type JoinsIndices<JoinsT extends JoinReferences> = (
    {
        [tableAlias in Extract<keyof JoinsT, string>] : (
            JoinsT[tableAlias]["index"]
        )
    }[Extract<keyof JoinsT, string>]
);
export type JoinAtIndex<JoinsT extends JoinReferences, IndexT extends number> = (
    {
        [tableAlias in Extract<keyof JoinsT, string>] : (
            JoinsT[tableAlias]["index"] extends IndexT ?
                JoinsT[tableAlias] :
                never
        )
    }[Extract<keyof JoinsT, string>]
);
/*
str = [];
for (let i=20; i>=0; --i) {
	str.push(`${i} extends JoinsIndices<JoinsT> ?\n    ${i+1} :`);
}
str.join("\n    ")
*/
export type JoinsLength<JoinsT extends JoinReferences> = (
    20 extends JoinsIndices<JoinsT> ?
    21 :
    19 extends JoinsIndices<JoinsT> ?
    20 :
    18 extends JoinsIndices<JoinsT> ?
    19 :
    17 extends JoinsIndices<JoinsT> ?
    18 :
    16 extends JoinsIndices<JoinsT> ?
    17 :
    15 extends JoinsIndices<JoinsT> ?
    16 :
    14 extends JoinsIndices<JoinsT> ?
    15 :
    13 extends JoinsIndices<JoinsT> ?
    14 :
    12 extends JoinsIndices<JoinsT> ?
    13 :
    11 extends JoinsIndices<JoinsT> ?
    12 :
    10 extends JoinsIndices<JoinsT> ?
    11 :
    9 extends JoinsIndices<JoinsT> ?
    10 :
    8 extends JoinsIndices<JoinsT> ?
    9 :
    7 extends JoinsIndices<JoinsT> ?
    8 :
    6 extends JoinsIndices<JoinsT> ?
    7 :
    5 extends JoinsIndices<JoinsT> ?
    6 :
    4 extends JoinsIndices<JoinsT> ?
    5 :
    3 extends JoinsIndices<JoinsT> ?
    4 :
    2 extends JoinsIndices<JoinsT> ?
    3 :
    1 extends JoinsIndices<JoinsT> ?
    2 :
    0 extends JoinsIndices<JoinsT> ?
    1 :
    never
);

export type ToNullableJoins<JoinsT extends JoinReferences> = (
    {
        [tableAlias in Extract<keyof JoinsT, string>] : (
            JoinsT[tableAlias] extends IJoin<infer JoinTypeT, infer IndexT, infer TableT, infer ColumnReferencesT, boolean> ?
                IJoin<
                    JoinTypeT,
                    IndexT,
                    TableT,
                    ColumnReferencesT,
                    true
                > :
                never
        )
    }
);

export type JoinFromTupleCallback<
    ColumnReferencesT extends ColumnReferences
> = (
    Tuple<ColumnOfReferences<ColumnReferencesT>> |
    (
        (columnReferences : ColumnReferencesT) => Tuple<ColumnOfReferences<ColumnReferencesT>>
    )
);

export type JoinFromTupleOfCallback<
    JoinFromTupleCallbackT extends JoinFromTupleCallback<any>
> = (
    JoinFromTupleCallbackT extends JoinFromTupleCallback<infer ColumnReferencesT> ?
        (
            JoinFromTupleCallbackT extends Tuple<ColumnOfReferences<ColumnReferencesT>> ?
            JoinFromTupleCallbackT :
            JoinFromTupleCallbackT extends (...args : any[]) => infer TupleT ?
            (
                TupleT extends Tuple<ColumnOfReferences<ColumnReferencesT>> ?
                    TupleT :
                    never
            ) :
            //("Invalid JoinFromTupleCallbackT or could not infer TupleT"|void|never)
            never
        ) :
        never
)

export type JoinToColumn<
    TableT extends AnyAliasedTable,
    FromColumnT extends AnyColumn
> = (
    {
        [name in Extract<keyof TableColumns<TableT>, string>] : (
            IColumn<
                TableAlias<TableT>,
                name,
                ColumnType<FromColumnT>|null
            >
        )
    }[Extract<keyof TableColumns<TableT>, string>]
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


export type JoinToTupleOfCallback<
    JoinToTupleCallbackT extends JoinToTupleCallback<AnyAliasedTable, Tuple<AnyColumn>>
> = (
    JoinToTupleCallbackT extends Tuple<AnyColumn> ?
    JoinToTupleCallbackT :
    JoinToTupleCallbackT extends (...args : any[]) => infer TupleT ?
    TupleT :
    ("Invalid JoinToTupleCallbackT or could not infer TupleT"|void|never)
)

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

export type ReplaceColumnOfJoin<
    JoinT extends AnyJoin,
    TableNameT extends string,
    NameT extends string,
    NewTypeT
> = (
    JoinT extends IJoin<infer JoinTypeT, infer IndexT, infer TableT, infer ColumnReferencesT, infer NullableT> ?
        (
            IJoin<
                JoinTypeT,
                IndexT,
                TableT,
                ReplaceColumnOfReference<
                    ColumnReferencesT,
                    TableNameT,
                    NameT,
                    NewTypeT
                >,
                NullableT
            >
        ) :
        (JoinT)
);
export type ReplaceColumnOfJoins<
    JoinsT extends JoinReferences,
    TableNameT extends string,
    NameT extends string,
    NewTypeT
> = (
    {
        [k in Extract<keyof JoinsT, string>] : (
            ReplaceColumnOfJoin<
                JoinsT[k],
                TableNameT,
                NameT,
                NewTypeT
            >
        )
    }
);

export type NullableJoinTableNames<
    JoinsT extends JoinReferences
> = (
    {
        [tableAlias in Extract<keyof JoinsT, string>] : (
            JoinsT[tableAlias] extends IJoin<any, any, any, any, true> ?
                tableAlias :
                never
        )
    }[Extract<keyof JoinsT, string>]
)
