import * as sd from "schema-decorator";
import {ColumnReferences} from "./column-references";
import {
    Join,
    AnyJoin,
    JoinFromTupleCallback,
    JoinFromTupleOfCallback,
    JoinToTupleCallback,
    MatchesJoinFromTuple,
    ToNullableJoinTuple,
    ReplaceColumnOfJoinTuple
} from "./join";
import {Tuple, TuplePush, TupleConcat} from "./tuple";
import {AliasedTable, AnyAliasedTable} from "./aliased-table";
import {IColumn, AnyColumn} from "./column";
import {TableAlias, TableToReference, TableToColumnUnion} from "./table-operation";
import {ToNullableColumnReferences, ReplaceColumnOfReference, ColumnReferencesToSchemaWithJoins} from "./column-references-operation";
import {TypeNarrowCallback} from "./type-narrow";
import {WhereCallback} from "./where";
import {
    SelectCallback,
    SelectTupleHasDuplicateColumn,
    SelectTupleToReferences,
    AnySelectTupleElement,
    ReplaceColumnOfSelectTuple,
    JoinTupleToSelectTuple
} from "./select";
import {GroupByCallback} from "./group-by";
import {HavingCallback} from "./having";
import {OrderByCallback} from "./order-by";
import {TypeWidenCallback} from "./widen";
import {SelectTupleToType, SelectTupleElementType} from "./union";
import {
    JoinableSelectTupleElement,
    JoinableSelectTupleToRawColumnCollection,
    JoinableSelectTupleHasDuplicateColumnName
} from "./select-as";
import {Querify} from "./querify";
import {RenameTableOfColumns, ToNullableColumn, ReplaceColumnIfNamed} from "./column-operation";
import {IStringBuilder} from "./IStringBuilder";
import {SelectBuilderValueQuery, IColumnExpr} from "./expr";

export interface RawPaginationArgs {
    page? : number|null|undefined;
    itemsPerPage? : number|null|undefined;
}
export interface PaginateInfo {
    itemsFound : number,
    pagesFound : number,
    page : number,
    itemsPerPage : number,
}
export interface PaginateResult<T> {
    info : PaginateInfo,
    rows : T[],
}

/*
export enum SelectBuilderOperation {
    //All these are BEFORE UNION
    NARROW = "NARROW", //Custom thing
    SELECT = "SELECT",

    //All these are AFTER SELECT
    WIDEN = "WIDEN", //Custom thing - This one is before AGGREGATE

    UNION = "UNION",


    AS = "AS",
    //After SELECT
    FETCH = "FETCH",

    //After SELECT, will change the return value of fetchAll(), fetchOne(), fetchZeroOrOne(), paginate()
    AGGREGATE = "AGGREGATE",
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
export type EnableOperation<DataT extends AnySelectBuilderData, OperationT extends SelectBuilderOperation> = (
    DataT["allowed"] extends Array<infer AllowedT> ?
        (
            AllowedT extends SelectBuilderOperation ?
                (AllowedT|OperationT)[] :
                (never)
        ) :
        (never)
);
*/
export type AggregateCallback<DataT extends AnySelectBuilderData> = (
    (
        row : ColumnReferencesToSchemaWithJoins<
            DataT["selectReferences"],
            DataT["joins"]
        >
    ) => Promise<any>|any
);

export type FetchRowResult<DataT extends AnySelectBuilderData> = (
    DataT["aggregateCallback"] extends ((row : any) => infer R) ?
        (
            R extends Promise<infer P> ?
                P :
                R
        ) :
        ColumnReferencesToSchemaWithJoins<
            DataT["selectReferences"],
            DataT["joins"]
        >
);

//TODO Maybe have a field where it just stores table data?
//Right now, it's all in the `joins` field
export interface AnySelectBuilderData {
    readonly hasSelect : boolean,
    readonly hasUnion : boolean,

    //Modified by JOIN clause
    //Used by WHERE clause
    //Modified by WHERE clause
    readonly columnReferences : ColumnReferences,
    //Modified by JOIN clauses
    readonly joins : Tuple<AnyJoin>,

    readonly selectReferences : ColumnReferences,
    readonly selectTuple : undefined|Tuple<AnySelectTupleElement>,

    readonly aggregateCallback : undefined|((row : any) => Promise<any>),

    //HACK These types do not contain any data,
    //they're just hacks to make the type system simpler
    readonly __columnReferencesColumns : AnyColumn;
    readonly __joinAliases : string;
    readonly __selectReferencesColumns : undefined|AnyColumn;
}
/*
export type IsAllowedSelectBuilderOperation<DataT extends AnySelectBuilderData, OperationT extends SelectBuilderOperation> = (
    OperationT[] extends DataT["allowed"] ?
        true : never
);*/

export interface ISelectBuilder<DataT extends AnySelectBuilderData> extends Querify {
    readonly data : DataT;

    //JOIN CLAUSE
    join<
        ToTableT extends AnyAliasedTable,
        FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"]>
    > (
        toTable : ToTableT,
        from : FromTupleT,
        to : JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>>
    ) : (
        TableAlias<ToTableT> extends keyof DataT["columnReferences"] ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ?
                    (
                        ISelectBuilder<{
                            hasSelect : DataT["hasSelect"],
                            hasUnion : DataT["hasUnion"],

                            columnReferences : (
                                DataT["columnReferences"] &
                                TableToReference<ToTableT>
                            ),
                            joins : (
                                TuplePush<
                                    DataT["joins"],
                                    Join<
                                        "INNER",
                                        ToTableT,
                                        TableToReference<ToTableT>,
                                        false
                                    >
                                >
                            ),
                            selectReferences : DataT["selectReferences"],
                            selectTuple : DataT["selectTuple"],
                            aggregateCallback : DataT["aggregateCallback"],

                            __columnReferencesColumns : (
                                DataT["__columnReferencesColumns"] |
                                TableToColumnUnion<ToTableT>
                            ),
                            __joinAliases : (
                                DataT["__joinAliases"] |
                                ToTableT["alias"]
                            ),
                            __selectReferencesColumns : (
                                DataT["__selectReferencesColumns"]
                            )
                        }>
                    ) :
                    (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
            )
    );
    rightJoin<
        ToTableT extends AnyAliasedTable,
        FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"]>
    > (
        toTable : ToTableT,
        from : FromTupleT,
        to : JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>>
    ) : (
        TableAlias<ToTableT> extends keyof DataT["columnReferences"] ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ?
                    (
                        ISelectBuilder<{
                            hasSelect : DataT["hasSelect"],
                            hasUnion : DataT["hasUnion"],

                            columnReferences : (
                                ToNullableColumnReferences<DataT["columnReferences"]> &
                                TableToReference<ToTableT>
                            ),
                            joins : (
                                TuplePush<
                                    ToNullableJoinTuple<DataT["joins"]>,
                                    Join<
                                        "RIGHT",
                                        ToTableT,
                                        TableToReference<ToTableT>,
                                        false
                                    >
                                >
                            ),
                            selectReferences : DataT["selectReferences"],
                            selectTuple : DataT["selectTuple"],
                            aggregateCallback : DataT["aggregateCallback"],

                            __columnReferencesColumns : (
                                ToNullableColumn<DataT["__columnReferencesColumns"]> |
                                TableToColumnUnion<ToTableT>
                            ),
                            __joinAliases : (
                                DataT["__joinAliases"] |
                                ToTableT["alias"]
                            ),
                            __selectReferencesColumns : (
                                DataT["__selectReferencesColumns"]
                            )
                        }>
                    ) :
                    (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
            )
    );
    leftJoin<
        ToTableT extends AnyAliasedTable,
        FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"]>
    > (
        toTable : ToTableT,
        from : FromTupleT,
        to : JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>>
    ) : (
        TableAlias<ToTableT> extends keyof DataT["columnReferences"] ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ?
                    (
                        ISelectBuilder<{
                            hasSelect : DataT["hasSelect"],
                            hasUnion : DataT["hasUnion"],

                            columnReferences : (
                                DataT["columnReferences"] &
                                ToNullableColumnReferences<TableToReference<ToTableT>>
                            ),
                            joins : (
                                TuplePush<
                                    DataT["joins"],
                                    Join<
                                        "LEFT",
                                        ToTableT,
                                        TableToReference<ToTableT>,
                                        true
                                    >
                                >
                            ),
                            selectReferences : DataT["selectReferences"],
                            selectTuple : DataT["selectTuple"],
                            aggregateCallback : DataT["aggregateCallback"],

                            __columnReferencesColumns : (
                                DataT["__columnReferencesColumns"] |
                                ToNullableColumn<TableToColumnUnion<ToTableT>>
                            ),
                            __joinAliases : (
                                DataT["__joinAliases"] |
                                ToTableT["alias"]
                            ),
                            __selectReferencesColumns : (
                                DataT["__selectReferencesColumns"]
                            )
                        }>
                    ) :
                    (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
            )
    );

    //JOIN USING
    joinUsing<
        ToTableT extends AnyAliasedTable,
        FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"]>
    > (
        toTable : ToTableT,
        from : FromTupleT
    ) : (
        TableAlias<ToTableT> extends keyof DataT["columnReferences"] ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ?
                    (
                        RenameTableOfColumns<JoinFromTupleOfCallback<FromTupleT>, ToTableT["alias"]> extends JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>> ?
                            ISelectBuilder<{
                                hasSelect : DataT["hasSelect"],
                                hasUnion : DataT["hasUnion"],

                                columnReferences : (
                                    DataT["columnReferences"] &
                                    TableToReference<ToTableT>
                                ),
                                joins : (
                                    TuplePush<
                                        DataT["joins"],
                                        Join<
                                            "INNER",
                                            ToTableT,
                                            TableToReference<ToTableT>,
                                            false
                                        >
                                    >
                                ),
                                selectReferences : DataT["selectReferences"],
                                selectTuple : DataT["selectTuple"],
                                aggregateCallback : DataT["aggregateCallback"],

                                __columnReferencesColumns : (
                                    DataT["__columnReferencesColumns"] |
                                    TableToColumnUnion<ToTableT>
                                ),
                                __joinAliases : (
                                    DataT["__joinAliases"] |
                                    ToTableT["alias"]
                                ),
                                __selectReferencesColumns : (
                                    DataT["__selectReferencesColumns"]
                                )
                            }> :
                            ("Cannot JOIN USING; to table is missing columns or types do not match"|void|never)
                    ) :
                    (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
            )
    );
    rightJoinUsing<
        ToTableT extends AnyAliasedTable,
        FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"]>
    > (
        toTable : ToTableT,
        from : FromTupleT
    ) : (
        TableAlias<ToTableT> extends keyof DataT["columnReferences"] ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ?
                    (
                        RenameTableOfColumns<JoinFromTupleOfCallback<FromTupleT>, ToTableT["alias"]> extends JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>> ?
                            ISelectBuilder<{
                                hasSelect : DataT["hasSelect"],
                                hasUnion : DataT["hasUnion"],

                                columnReferences : (
                                    ToNullableColumnReferences<DataT["columnReferences"]> &
                                    TableToReference<ToTableT>
                                ),
                                joins : (
                                    TuplePush<
                                        ToNullableJoinTuple<DataT["joins"]>,
                                        Join<
                                            "RIGHT",
                                            ToTableT,
                                            TableToReference<ToTableT>,
                                            false
                                        >
                                    >
                                ),
                                selectReferences : DataT["selectReferences"],
                                selectTuple : DataT["selectTuple"],
                                aggregateCallback : DataT["aggregateCallback"],

                                __columnReferencesColumns : (
                                    ToNullableColumn<DataT["__columnReferencesColumns"]> |
                                    TableToColumnUnion<ToTableT>
                                ),
                                __joinAliases : (
                                    DataT["__joinAliases"] |
                                    ToTableT["alias"]
                                ),
                                __selectReferencesColumns : (
                                    DataT["__selectReferencesColumns"]
                                )
                            }> :
                            ("Cannot RIGHT JOIN USING; to table is missing columns or types do not match"|void|never)
                    ) :
                    (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
            )
    );
    leftJoinUsing<
        ToTableT extends AnyAliasedTable,
        FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"]>
    > (
        toTable : ToTableT,
        from : FromTupleT
    ) : (
        TableAlias<ToTableT> extends keyof DataT["columnReferences"] ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ?
                    (
                        RenameTableOfColumns<JoinFromTupleOfCallback<FromTupleT>, ToTableT["alias"]> extends JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>> ?
                            ISelectBuilder<{
                                hasSelect : DataT["hasSelect"],
                                hasUnion : DataT["hasUnion"],

                                columnReferences : (
                                    DataT["columnReferences"] &
                                    ToNullableColumnReferences<TableToReference<ToTableT>>
                                ),
                                joins : (
                                    TuplePush<
                                        DataT["joins"],
                                        Join<
                                            "LEFT",
                                            ToTableT,
                                            TableToReference<ToTableT>,
                                            true
                                        >
                                    >
                                ),
                                selectReferences : DataT["selectReferences"],
                                selectTuple : DataT["selectTuple"],
                                aggregateCallback : DataT["aggregateCallback"],

                                __columnReferencesColumns : (
                                    DataT["__columnReferencesColumns"] |
                                    ToNullableColumn<TableToColumnUnion<ToTableT>>
                                ),
                                __joinAliases : (
                                    DataT["__joinAliases"] |
                                    ToTableT["alias"]
                                ),
                                __selectReferencesColumns : (
                                    DataT["__selectReferencesColumns"]
                                )
                            }> :
                            ("Cannot LEFT JOIN USING; to table is missing columns or types do not match"|void|never)
                    ) :
                    (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
            )
    );

    //TYPE-NARROW CLAUSE
    whereIsNotNull<TypeNarrowCallbackT extends TypeNarrowCallback<DataT["columnReferences"]>> (
        this : ISelectBuilder<{
            hasSelect : any,
            hasUnion : false,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
        typeNarrowCallback : TypeNarrowCallbackT
    ) : (
        ReturnType<TypeNarrowCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ?
            ISelectBuilder<{
                hasSelect : DataT["hasSelect"],
                hasUnion : DataT["hasUnion"],
                columnReferences : ReplaceColumnOfReference<
                    DataT["columnReferences"],
                    TableNameT,
                    NameT,
                    Exclude<TypeT, null|undefined>
                >,
                //TODO Narrow here, too
                joins : ReplaceColumnOfJoinTuple<
                    DataT["joins"],
                    TableNameT,
                    NameT,
                    Exclude<TypeT, null|undefined>
                >,
                selectReferences : ReplaceColumnOfReference<
                    DataT["selectReferences"],
                    TableNameT,
                    NameT,
                    Exclude<TypeT, null|undefined>
                >,
                selectTuple : (
                    DataT["selectTuple"] extends Tuple<any> ?
                        ReplaceColumnOfSelectTuple<
                            DataT["selectTuple"],
                            TableNameT,
                            NameT,
                            Exclude<TypeT, null|undefined>
                        > :
                        undefined
                ),
                aggregateCallback : DataT["aggregateCallback"],

                __columnReferencesColumns : (
                    ReplaceColumnIfNamed<
                        DataT["__columnReferencesColumns"],
                        TableNameT,
                        NameT,
                        Exclude<TypeT, null|undefined>
                    >
                ),
                __joinAliases : DataT["__joinAliases"],
                __selectReferencesColumns : (
                    DataT["__selectReferencesColumns"] extends AnyColumn ?
                        ReplaceColumnIfNamed<
                            DataT["__selectReferencesColumns"],
                            TableNameT,
                            NameT,
                            Exclude<TypeT, null|undefined>
                        > :
                        undefined
                )
            }> :
            ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
    whereIsNull<TypeNarrowCallbackT extends TypeNarrowCallback<DataT["columnReferences"]>> (
        this : ISelectBuilder<{
            hasSelect : any,
            hasUnion : false,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
        typeNarrowCallback : TypeNarrowCallbackT
    ) : (
        ReturnType<TypeNarrowCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ?
            ISelectBuilder<{
                hasSelect : DataT["hasSelect"],
                hasUnion : DataT["hasUnion"],
                columnReferences : ReplaceColumnOfReference<
                    DataT["columnReferences"],
                    TableNameT,
                    NameT,
                    null
                >,
                //TODO Narrow here, too
                joins : ReplaceColumnOfJoinTuple<
                    DataT["joins"],
                    TableNameT,
                    NameT,
                    null
                >,
                selectReferences : ReplaceColumnOfReference<
                    DataT["selectReferences"],
                    TableNameT,
                    NameT,
                    null
                >,
                selectTuple : (
                    DataT["selectTuple"] extends Tuple<any> ?
                        ReplaceColumnOfSelectTuple<
                            DataT["selectTuple"],
                            TableNameT,
                            NameT,
                            null
                        > :
                        undefined
                ),
                aggregateCallback : DataT["aggregateCallback"],

                __columnReferencesColumns : (
                    ReplaceColumnIfNamed<
                        DataT["__columnReferencesColumns"],
                        TableNameT,
                        NameT,
                        null
                    >
                ),
                __joinAliases : DataT["__joinAliases"],
                __selectReferencesColumns : (
                    DataT["__selectReferencesColumns"] extends AnyColumn ?
                        ReplaceColumnIfNamed<
                            DataT["__selectReferencesColumns"],
                            TableNameT,
                            NameT,
                            null
                        > :
                        undefined
                )
            }> :
            ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
    whereIsEqual<
        ConstT extends boolean|number|string,
        TypeNarrowCallbackT extends TypeNarrowCallback<DataT["columnReferences"]>
    > (
        this : ISelectBuilder<{
            hasSelect : any,
            hasUnion : false,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
        value : ConstT,
        typeNarrowCallback : TypeNarrowCallbackT
    ) : (
        ReturnType<TypeNarrowCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ?
            ISelectBuilder<{
                hasSelect : DataT["hasSelect"],
                hasUnion : DataT["hasUnion"],
                columnReferences : ReplaceColumnOfReference<
                    DataT["columnReferences"],
                    TableNameT,
                    NameT,
                    ConstT
                >,
                //TODO Narrow here, too
                joins : ReplaceColumnOfJoinTuple<
                    DataT["joins"],
                    TableNameT,
                    NameT,
                    ConstT
                >,
                selectReferences : ReplaceColumnOfReference<
                    DataT["selectReferences"],
                    TableNameT,
                    NameT,
                    ConstT
                >,
                selectTuple : (
                    DataT["selectTuple"] extends Tuple<any> ?
                        ReplaceColumnOfSelectTuple<
                            DataT["selectTuple"],
                            TableNameT,
                            NameT,
                            ConstT
                        > :
                        undefined
                ),
                aggregateCallback : DataT["aggregateCallback"],

                __columnReferencesColumns : (
                    ReplaceColumnIfNamed<
                        DataT["__columnReferencesColumns"],
                        TableNameT,
                        NameT,
                        ConstT
                    >
                ),
                __joinAliases : DataT["__joinAliases"],
                __selectReferencesColumns : (
                    DataT["__selectReferencesColumns"] extends AnyColumn ?
                        ReplaceColumnIfNamed<
                            DataT["__selectReferencesColumns"],
                            TableNameT,
                            NameT,
                            ConstT
                        > :
                        undefined
                )
            }> :
            ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );

    //WHERE CLAUSE
    //Replaces but ANDs with NARROW
    where<WhereCallbackT extends WhereCallback<ISelectBuilder<DataT>>> (
        whereCallback : WhereCallbackT
    ) : ISelectBuilder<DataT>;
    //Appends
    andWhere<WhereCallbackT extends WhereCallback<ISelectBuilder<DataT>>> (
        whereCallback : WhereCallbackT
    ) : ISelectBuilder<DataT>;

    //SELECT CLAUSE
    select<SelectCallbackT extends SelectCallback<ISelectBuilder<DataT>>> (
        this : ISelectBuilder<{
            hasSelect : any,
            hasUnion : false,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
        selectCallback : SelectCallbackT
    ) : (
        true extends SelectTupleHasDuplicateColumn<(
            DataT["selectTuple"] extends Tuple<any> ?
                TupleConcat<
                    DataT["selectTuple"],
                    ReturnType<SelectCallbackT>
                > :
                ReturnType<SelectCallbackT>
        )> ?
            (
                "Duplicate columns found in SELECT, consider aliasing"|void|never
            ) :
            ISelectBuilder<{
                hasSelect : true,
                hasUnion : DataT["hasUnion"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : (
                    DataT["selectReferences"] &
                    SelectTupleToReferences<ReturnType<SelectCallbackT>>
                ),
                selectTuple : (
                    DataT["selectTuple"] extends Tuple<any> ?
                        TupleConcat<
                            DataT["selectTuple"],
                            ReturnType<SelectCallbackT>
                        > :
                        ReturnType<SelectCallbackT>
                ),
                aggregateCallback : DataT["aggregateCallback"],

                __columnReferencesColumns : (
                    DataT["__columnReferencesColumns"]
                ),
                __joinAliases : DataT["__joinAliases"],
                __selectReferencesColumns : (
                    DataT["__selectReferencesColumns"]
                )
            }>
    );
    selectAll (
        this : ISelectBuilder<{
            hasSelect : false,
            hasUnion : false,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>
    ) : (
        DataT["selectTuple"] extends undefined ?
            ISelectBuilder<{
                hasSelect : true,
                hasUnion : DataT["hasUnion"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["columnReferences"],
                selectTuple : JoinTupleToSelectTuple<DataT["joins"]>,
                aggregateCallback : DataT["aggregateCallback"],

                __columnReferencesColumns : (
                    DataT["__columnReferencesColumns"]
                ),
                __joinAliases : DataT["__joinAliases"],
                __selectReferencesColumns : (
                    DataT["__selectReferencesColumns"]
                )
            }> :
            ("selectAll() must be called before select()"|void|never)
    );

    //DISTINCT CLAUSE
    distinct (distinct? : boolean) : ISelectBuilder<DataT>;

    //SQL_CALC_FOUND_ROWS CLAUSE
    sqlCalcFoundRows (sqlCalcFoundRows? : boolean) : ISelectBuilder<DataT>;

    //GROUP BY CLAUSE
    //Replaces
    groupBy<GroupByCallbackT extends GroupByCallback<ISelectBuilder<DataT>>> (
        groupByCallback : GroupByCallbackT
    ) : ISelectBuilder<DataT>;
    //Appends
    appendGroupBy<GroupByCallbackT extends GroupByCallback<ISelectBuilder<DataT>>> (
        groupByCallback : GroupByCallbackT
    ) : ISelectBuilder<DataT>;

    //REMOVES GROUP BY
    unsetGroupBy () : ISelectBuilder<DataT>;

    //HAVING CLAUSE
    //TECHNICALLY, can only use columns in GROUP BY, or columns in aggregate functions,
    //But MySQL supports an extension that allows columns from SELECT
    //As such, this library does not check for valid columns here
    //As long as it is in columnReferences or selectReferences
    having<HavingCallbackT extends HavingCallback<ISelectBuilder<DataT>>> (
        havingCallback : HavingCallbackT
    ) : ISelectBuilder<DataT>;
    //Appends
    andHaving<HavingCallbackT extends HavingCallback<ISelectBuilder<DataT>>> (
        havingCallback : HavingCallbackT
    ) : ISelectBuilder<DataT>;

    //ORDER BY CLAUSE
    //Replaces
    orderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ) : ISelectBuilder<DataT>;
    //Appends
    appendOrderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ) : ISelectBuilder<DataT>;

    //REMOVES ORDER BY
    unsetOrderBy () : ISelectBuilder<DataT>;

    //LIMIT CLAUSE
    limit (rowCount : number) : ISelectBuilder<DataT>;

    //OFFSET CLAUSE
    offset (offset : number) : ISelectBuilder<DataT>;

    //REMOVES LIMIT
    unsetLimit () : ISelectBuilder<DataT>;

    //WIDEN CLAUSE
    //After select, before aggregate
    widen<
        TypeWidenCallbackT extends TypeWidenCallback<DataT["selectReferences"]>,
        WidenT
    > (
        this : ISelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : undefined,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
        typeWidenCallback : TypeWidenCallbackT,
        assertWidened : sd.AssertFunc<WidenT>
    ) : (
        ReturnType<TypeWidenCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ?
            ISelectBuilder<{
                hasSelect : DataT["hasSelect"],
                hasUnion : DataT["hasUnion"],
                columnReferences : DataT["columnReferences"],
                //TODO Widen here, too
                joins : ReplaceColumnOfJoinTuple<
                    DataT["joins"],
                    TableNameT,
                    NameT,
                    TypeT|WidenT
                >,
                selectReferences : ReplaceColumnOfReference<
                    DataT["selectReferences"],
                    TableNameT,
                    NameT,
                    TypeT|WidenT
                >,
                selectTuple : (
                    DataT["selectTuple"] extends Tuple<any> ?
                        ReplaceColumnOfSelectTuple<
                            DataT["selectTuple"],
                            TableNameT,
                            NameT,
                            TypeT|WidenT
                        > :
                        undefined
                ),



                aggregateCallback : DataT["aggregateCallback"],

                __columnReferencesColumns : (
                    DataT["__columnReferencesColumns"]
                ),
                __joinAliases : DataT["__joinAliases"],
                __selectReferencesColumns : (
                    DataT["__selectReferencesColumns"]
                )
            }> :
            ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );

    //UNION CLAUSE
    union<
        SelectBuilderT extends ISelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>
    > (
        this : ISelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
        selectBuilder : SelectBuilderT
    ) : (
        //TODO Clean up
        SelectBuilderT extends ISelectBuilder<infer OtherT> ?
            (
                OtherT["selectTuple"] extends Tuple<any> ?
                    (
                        DataT["selectTuple"] extends Tuple<any> ?
                            (
                                //A run-time check is impossible, for now
                                SelectTupleToType<OtherT["selectTuple"]> extends SelectTupleToType<DataT["selectTuple"]> ?
                                    ISelectBuilder<{
                                        hasSelect : DataT["hasSelect"],
                                        hasUnion : true,
                                        columnReferences : DataT["columnReferences"],
                                        joins : DataT["joins"],
                                        selectReferences : DataT["selectReferences"],
                                        selectTuple : DataT["selectTuple"],
                                        aggregateCallback : DataT["aggregateCallback"],

                                        __columnReferencesColumns : (
                                            DataT["__columnReferencesColumns"]
                                        ),
                                        __joinAliases : DataT["__joinAliases"],
                                        __selectReferencesColumns : (
                                            DataT["__selectReferencesColumns"]
                                        )
                                    }> :
                                    (
                                        "Cannot UNION; SELECT tuples have incompatible types"|
                                        void|
                                        never|
                                        ("self" & SelectTupleToType<DataT["selectTuple"]>)|
                                        ("other" & SelectTupleToType<DataT["selectTuple"]>)
                                    )
                            ) :
                            ("Cannot UNION; Invalid selectTuple, does SELECT clause exist?"|void|never)
                    ) :
                    ("Cannot UNION; sub-select has invalid selectTuple; does SELECT clause exist?"|void|never)
            ) :
            ("Invalid sub-select, or could not infer OtherT"|void|never)
    );

    //UNION ORDER BY CLAUSE
    //Replaces
    unionOrderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ) : ISelectBuilder<DataT>;
    //Appends
    appendUnionOrderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ) : ISelectBuilder<DataT>;

    //REMOVES UNION ORDER BY
    unsetUnionOrderBy () : ISelectBuilder<DataT>;

    //UNION LIMIT CLAUSE
    unionLimit (rowCount : number) : ISelectBuilder<DataT>;

    //UNION OFFSET CLAUSE
    unionOffset (offset : number) : ISelectBuilder<DataT>;

    //REMOVES UNION LIMIT
    unsetUnionLimit () : ISelectBuilder<DataT>;

    //SUBQUERY
    readonly from : CreateSubSelectBuilderDelegate<DataT["columnReferences"], DataT["__columnReferencesColumns"]>;

    //AS CLAUSE
    as<AliasT extends string> (
        this : ISelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
        alias : AliasT
    ) : (
        DataT["selectTuple"] extends Tuple<JoinableSelectTupleElement<DataT["columnReferences"]>> ?
            (
                true extends JoinableSelectTupleHasDuplicateColumnName<DataT["selectTuple"]> ?
                    "Cannot have duplicate column names in SELECT clause when aliasing"|void|never :
                    AliasedTable<AliasT, AliasT, JoinableSelectTupleToRawColumnCollection<DataT["selectTuple"]>>
            ) :
            ("Cannot use tables in SELECT clause when aliasing"|void|never)
    );
    asExpr<AliasT extends string> (
        this : ISelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
        alias : AliasT
    ) : (
        this extends SelectBuilderValueQuery<infer TypeT> ?
            IColumnExpr<
                {},
                "__expr",
                AliasT,
                TypeT|null
            > :
            ("Cannot be used as an expression"|void|never)
    );

    //AGGREGATE
    //TODO unsetAggregate(), maybe allow composition of aggregation
    aggregate<AggregateCallbackT extends AggregateCallback<DataT>> (
        this : ISelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
        aggregateCallback : AggregateCallbackT
    ) : (
        ISelectBuilder<{
            hasSelect : DataT["hasSelect"],
            hasUnion : DataT["hasUnion"],
            columnReferences : DataT["columnReferences"],
            joins : DataT["joins"],
            selectReferences : DataT["selectReferences"],
            selectTuple : DataT["selectTuple"],
            aggregateCallback : AggregateCallbackT,

            __columnReferencesColumns : (
                DataT["__columnReferencesColumns"]
            ),
            __joinAliases : DataT["__joinAliases"],
            __selectReferencesColumns : (
                DataT["__selectReferencesColumns"]
            )
        }>
    );

    //QUERIFY
    querifyColumnReferences (sb : IStringBuilder) : void;
    querifyWhere (sb : IStringBuilder) : void;

    //FETCH CLAUSE
    fetchAll (
        this : ISelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
    ) : Promise<FetchRowResult<DataT>[]>;
    fetchOne (
        this : ISelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
    ) : Promise<FetchRowResult<DataT>>;
    fetchZeroOrOne (
        this : ISelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
    ) : Promise<FetchRowResult<DataT>|undefined>;
    fetchValue (
        this : ISelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
    ) : (
        DataT["selectTuple"] extends (
            Tuple<JoinableSelectTupleElement<DataT["columnReferences"]>> &
            { length : 1 }
        ) ?
            Promise<SelectTupleElementType<DataT["selectTuple"][0]>> :
            ("You can only fetchValue() if selecting one column"|void|never)
    );
    fetchValueOrUndefined (
        this : ISelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
    ) : (
        DataT["selectTuple"] extends (
            Tuple<JoinableSelectTupleElement<DataT["columnReferences"]>> &
            { length : 1 }
        ) ?
            Promise<SelectTupleElementType<DataT["selectTuple"][0]>|undefined> :
            ("You can only fetchValueOrUndefined() if selecting one column"|void|never)
    );
    fetchValueArray (
        this : ISelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
    ) : (
        DataT["selectTuple"] extends (
            Tuple<JoinableSelectTupleElement<DataT["columnReferences"]>> &
            { length : 1 }
        ) ?
            Promise<SelectTupleElementType<DataT["selectTuple"][0]>[]> :
            ("You can only fetchValueArray() if selecting one column"|void|never)
    );
    //TODO May not always work if GROUP BY, HAVING clauses use a select-expression,
    //TODO May not work as intended with UNION selects
    //Maybe just unset UNION LIMIT, or LIMIT
    count () : Promise<number>;

    exists () : Promise<boolean>;

    //Uses count() internally
    paginate (
        this : ISelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            columnReferences : any,
            joins : any,
            selectReferences : any,
            selectTuple : any,
            //Has no effect on the query
            aggregateCallback : any,

            __columnReferencesColumns : any,
            __joinAliases : any,
            __selectReferencesColumns : any,
        }>,
        paginationArgs? : RawPaginationArgs
    ) : Promise<PaginateResult<FetchRowResult<DataT>>>;
}

export type AnySelectBuilder = ISelectBuilder<any>;

export type CreateSelectBuilderDelegate = (
    <TableT extends AnyAliasedTable> (
        table : TableT
    ) => (
        ISelectBuilder<{
            hasSelect : false,
            hasUnion : false,
            columnReferences : TableToReference<TableT>,
            joins : [Join<"FROM", TableT, TableToReference<TableT>, false>],
            selectReferences : {},
            selectTuple : undefined,
            aggregateCallback : undefined,

            __columnReferencesColumns : (
                TableToColumnUnion<TableT>
            ),
            __joinAliases : TableT["alias"],
            __selectReferencesColumns : undefined
        }>
    )
);

//TODO I think joins should not allow duplicates?
//However, not 100% sure
export type CreateSubSelectBuilderDelegate<
    ColumnReferencesT extends ColumnReferences,
    //Technically, can derive from ColumnReferencesT
    ColumnReferencesColumnsT extends AnyColumn
> = (
    <TableT extends AnyAliasedTable> (
        table : TableT
    ) => (
        TableAlias<TableT> extends keyof ColumnReferencesT ?
            ("Duplicate alias" | TableAlias<TableT> | void) :
            ISelectBuilder<{
                hasSelect : false,
                hasUnion : false,
                columnReferences : TableToReference<TableT> & ColumnReferencesT,
                joins : [Join<"FROM", TableT, TableToReference<TableT>, false>],
                selectReferences : {},
                selectTuple : undefined,
                aggregateCallback : undefined,

                __columnReferencesColumns : (
                    ColumnReferencesColumnsT |
                    TableToColumnUnion<TableT>
                ),
                __joinAliases : TableT["alias"],
                __selectReferencesColumns : undefined
            }>
    )
);

/*
== Aggregation API ==
Desired usage:

const query = from(chargePreAuthorization)
    .leftJoinUsing(
        chargePreAuthorizationInformation,
        c => [c.chargePreAuthorization.chargePreAuthorizationId]
    )
    .selectAll()
    .aggregate(async (obj) => {
        return {
            ...obj,
            errors : await from(chargePreAuthorizationError)
                .whereIsEqual(
                    obj.chargePreAuthorization.chargePreAuthorizationId,
                    c => c.chargePreAuthorizationError.chargePreAuthorizationErrorId
                )
                .selectAll()
                .paginate(),
            methodType : e.toKey(s.MethodType, obj.chargePreAuthorization.methodTypeId),
        }
    })

Then,
query.where(<condition>).fetchAll()
query.where(<condition>).fetchOne()
query.where(<condition>).fetchZeroOrOne()
query.where(<condition>).paginate()

And the document will be the return value of `aggregate`

*/
