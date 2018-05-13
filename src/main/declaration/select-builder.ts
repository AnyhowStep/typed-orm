import {ColumnReferences} from "./column-references";
import {
    Join,
    AnyJoin,
    JoinFromTupleCallback,
    JoinFromTupleOfCallback,
    JoinToTupleCallback,
    MatchesJoinFromTuple,
    ToNullableJoinTuple
} from "./join";
import {Tuple, TuplePush} from "./tuple";
import {AnyAliasedTable} from "./aliased-table";
import {IColumn, AnyColumn} from "./column";
import {TableAlias, TableToReference} from "./table-operation";
import {ToNullableColumnReferences, ReplaceColumnOfReference} from "./column-references-operation";
import {TypeNarrowCallback} from "./type-narrow";

export enum SelectBuilderOperation {
    JOIN = "JOIN",
    WHERE = "WHERE",
    SELECT = "SELECT",
    DISTINCT = "DISTINCT",
    GROUP_BY = "GROUP_BY",
    HAVING = "HAVING",
    ORDER_BY = "ORDER_BY",
    LIMIT = "LIMIT",
    OFFSET = "OFFSET",
    WIDEN = "WIDEN", //Custom thing

    UNION = "UNION",
    UNION_ORDER_BY = "UNION_ORDER_BY",
    UNION_LIMIT = "UNION_LIMIT",
    UNION_OFFSET = "UNION_OFFSET",
}

export type DisableOperation<DataT extends AnySelectBuilderData, OperationT extends SelectBuilderOperation> = (
    DataT["allowed"] extends Array<infer AllowedT> ?
        (
            AllowedT extends SelectBuilderOperation ?
                (Exclude<AllowedT, OperationT>[]) :
                (never)
        ) :
        (never)
);

export interface AnySelectBuilderData {
    allowed : SelectBuilderOperation[],

    //Modified by JOIN clause
    //Used by WHERE clause
    //Modified by WHERE clause
    columnReferences : ColumnReferences,
    //Modified by JOIN clauses
    joins : Tuple<AnyJoin>,

    /*//Used by WHERE clause
    columnReferences : d.ColumnReferences,
    //Modified by JOIN clauses
    joinReferences : JoinReferences,

    //Modified by WHERE clause
    typeNarrowedColumns : d.ColumnReferences,

    //Set by SELECT clause
    selectReferences : d.ColumnReferences,

    //Set by SELECT clause
    selectTuple : undefined|Tuple<SelectTupleElement<any>>,

    //Set by DISTINCT
    distinct : boolean,

    //Set by GROUP BY clause
    groupByReferences : d.ColumnReferences,

    //Set by ORDER BY clause
    orderBy : undefined|Tuple<
        OrderByTupleElement<any>
    >,

    //Set by LIMIT and OFFSET clause
    limit : undefined|{
        rowCount : number,
        offset : number,
    },

    //Widening is done after SELECT, before UNION, to allow other data types
    //Doesn't perform any SQL queries, just relaxes the type constraints
    typeWidenedColumns : d.ColumnReferences,

    //Modified by UNION clause
    union : undefined|Tuple<SelectBuilder<any>>,

    //Set by ORDER BY clause
    unionOrderBy : undefined|Tuple<
        OrderByTupleElement<any>
    >,

    //Set by LIMIT and OFFSET clause
    unionLimit : undefined|{
        rowCount : number,
        offset : number,
    },*/

}

export type IsAllowedSelectBuilderOperation<DataT extends AnySelectBuilderData, OperationT extends SelectBuilderOperation> = (
    OperationT[] extends DataT["allowed"] ?
        true : never
);

export interface ISelectBuilder<DataT extends AnySelectBuilderData> {
    data : DataT;

    //JOIN CLAUSE
    join<
        ToTableT extends AnyAliasedTable,
        FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"], Tuple<AnyColumn>>
    > (
        toTable : ToTableT,
        from : FromTupleT,
        to : JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>>
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.JOIN> extends never ?
            ("JOIN clause not allowed here"|void|never) :
            (
                TableAlias<ToTableT> extends keyof DataT["columnReferences"] ?
                    ("Duplicate alias" | TableAlias<ToTableT> | void) :
                    (
                        JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ?
                            (
                                ISelectBuilder<{
                                    allowed : DataT["allowed"],

                                    columnReferences : (
                                        DataT["columnReferences"] &
                                        TableToReference<ToTableT>
                                    ),
                                    joins : (
                                        TuplePush<
                                            DataT["joins"],
                                            Join<
                                                TableToReference<ToTableT>,
                                                false
                                            >
                                        >
                                    ),
                                }>
                            ) :
                            (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
                    )
            )
    );
    rightJoin<
        ToTableT extends AnyAliasedTable,
        FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"], Tuple<AnyColumn>>
    > (
        toTable : ToTableT,
        from : FromTupleT,
        to : JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>>
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.JOIN> extends never ?
            ("JOIN clause not allowed here"|void|never) :
            (
                TableAlias<ToTableT> extends keyof DataT["columnReferences"] ?
                    ("Duplicate alias" | TableAlias<ToTableT> | void) :
                    (
                        JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ?
                            (
                                ISelectBuilder<{
                                    allowed : DataT["allowed"],

                                    columnReferences : (
                                        ToNullableColumnReferences<DataT["columnReferences"]> &
                                        TableToReference<ToTableT>
                                    ),
                                    joins : (
                                        TuplePush<
                                            ToNullableJoinTuple<DataT["joins"]>,
                                            Join<
                                                TableToReference<ToTableT>,
                                                false
                                            >
                                        >
                                    ),
                                }>
                            ) :
                            (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
                    )
            )
    );
    leftJoin<
        ToTableT extends AnyAliasedTable,
        FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"], Tuple<AnyColumn>>
    > (
        toTable : ToTableT,
        from : FromTupleT,
        to : JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>>
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.JOIN> extends never ?
            ("JOIN clause not allowed here"|void|never) :
            (
                TableAlias<ToTableT> extends keyof DataT["columnReferences"] ?
                    ("Duplicate alias" | TableAlias<ToTableT> | void) :
                    (
                        JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ?
                            (
                                ISelectBuilder<{
                                    allowed : DataT["allowed"],

                                    columnReferences : (
                                        DataT["columnReferences"] &
                                        ToNullableColumnReferences<TableToReference<ToTableT>>
                                    ),
                                    joins : (
                                        TuplePush<
                                            DataT["joins"],
                                            Join<
                                                TableToReference<ToTableT>,
                                                true
                                            >
                                        >
                                    ),
                                }>
                            ) :
                            (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
                    )
            )
    );

    //WHERE CLAUSE
    whereIsNotNull<TypeNarrowCallbackT extends TypeNarrowCallback<ISelectBuilder<DataT>>> (
        typeNarrowCallback : TypeNarrowCallbackT
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.WHERE> extends never ?
            ("WHERE clause not allowed here"|void|never) :
            ReturnType<TypeNarrowCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ?
                ISelectBuilder<{
                    allowed : DisableOperation<DataT, SelectBuilderOperation.JOIN>,
                    columnReferences : ReplaceColumnOfReference<
                        DataT["columnReferences"],
                        TableNameT,
                        NameT,
                        Exclude<TypeT, null|undefined>
                    >,
                    joins : DataT["joins"],
                }> :
                ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
    whereIsNull<TypeNarrowCallbackT extends TypeNarrowCallback<ISelectBuilder<DataT>>> (
        typeNarrowCallback : TypeNarrowCallbackT
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.WHERE> extends never ?
            ("WHERE clause not allowed here"|void|never) :
            ReturnType<TypeNarrowCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ?
                ISelectBuilder<{
                    allowed : DisableOperation<DataT, SelectBuilderOperation.JOIN>,
                    columnReferences : ReplaceColumnOfReference<
                        DataT["columnReferences"],
                        TableNameT,
                        NameT,
                        null
                    >,
                    joins : DataT["joins"],
                }> :
                ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
    whereIsEqual<
        ConstT extends boolean|number|string|null,
        TypeNarrowCallbackT extends TypeNarrowCallback<ISelectBuilder<DataT>>
    > (
        value : ConstT,
        typeNarrowCallback : TypeNarrowCallbackT
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.WHERE> extends never ?
            ("WHERE clause not allowed here"|void|never) :
            ReturnType<TypeNarrowCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ?
                ISelectBuilder<{
                    allowed : DisableOperation<DataT, SelectBuilderOperation.JOIN>,
                    columnReferences : ReplaceColumnOfReference<
                        DataT["columnReferences"],
                        TableNameT,
                        NameT,
                        ConstT
                    >,
                    joins : DataT["joins"],
                }> :
                ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
}

export type AnySelectBuilder = ISelectBuilder<any>;

export type CreateSelectBuilderDelegate = (
    <TableT extends AnyAliasedTable> (
        table : TableT
    ) => (
        ISelectBuilder<{
            allowed : (
                SelectBuilderOperation.JOIN|
                SelectBuilderOperation.WHERE|
                SelectBuilderOperation.SELECT
            )[],
            columnReferences : TableToReference<TableT>,
            joins : [Join<TableToReference<TableT>, false>],
        }>
    )
);
