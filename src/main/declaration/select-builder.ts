import * as sd from "schema-decorator";
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
import {Tuple, TuplePush, TupleConcat} from "./tuple";
import {AliasedTable, AnyAliasedTable} from "./aliased-table";
import {IColumn, AnyColumn} from "./column";
import {TableAlias, TableToReference} from "./table-operation";
import {ToNullableColumnReferences, ReplaceColumnOfReference} from "./column-references-operation";
import {TypeNarrowCallback} from "./type-narrow";
import {WhereCallback} from "./where";
import {
    SelectCallback,
    SelectTupleHasDuplicateColumn,
    SelectTupleToReferences,
    AnySelectTupleElement,
    ReplaceColumnOfSelectTuple
} from "./select";
import {GroupByCallback, AnyGroupByTupleElement} from "./group-by";
import {HavingCallback} from "./having";
import {OrderByCallback, AnyOrderByTupleElement} from "./order-by";
import {TypeWidenCallback} from "./widen";
import {SelectTupleToType} from "./union";
import {
    JoinableSelectTupleElement,
    JoinableSelectTupleToRawColumnCollection,
    JoinableSelectTupleHasDuplicateColumnName
} from "./select-as";
import {Querify} from "./querify";

export enum SelectBuilderOperation {
    JOIN = "JOIN",
    NARROW = "NARROW", //Custom thing
    WHERE = "WHERE",
    SELECT = "SELECT",
    DISTINCT = "DISTINCT",
    SQL_CALC_FOUND_ROWS = "SQL_CALC_FOUND_ROWS",
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

    AS = "AS",
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

export const ArbitraryRowCount = 999999999;

export interface LimitData {
    rowCount : number,
    offset   : number,
}

export interface AnySelectBuilderData {
    allowed : SelectBuilderOperation[],

    //Modified by JOIN clause
    //Used by WHERE clause
    //Modified by WHERE clause
    columnReferences : ColumnReferences,
    //Modified by JOIN clauses
    joins : Tuple<AnyJoin>,

    selectReferences : ColumnReferences,
    selectTuple : undefined|Tuple<AnySelectTupleElement>,

    distinct : boolean,
    sqlCalcFoundRows : boolean,

    groupByTuple : undefined|Tuple<AnyGroupByTupleElement>,

    orderByTuple : undefined|Tuple<AnyOrderByTupleElement>,

    limit : undefined|LimitData,

    unionOrderByTuple : undefined|Tuple<AnyOrderByTupleElement>,

    unionLimit : undefined|LimitData,
}

export type IsAllowedSelectBuilderOperation<DataT extends AnySelectBuilderData, OperationT extends SelectBuilderOperation> = (
    OperationT[] extends DataT["allowed"] ?
        true : never
);

export interface ISelectBuilder<DataT extends AnySelectBuilderData> extends Querify {
    readonly data : DataT;

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
                                                TableAlias<ToTableT>,
                                                false
                                            >
                                        >
                                    ),
                                    selectReferences : DataT["selectReferences"],
                                    selectTuple : DataT["selectTuple"],
                                    distinct : DataT["distinct"],
                                    sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                                    groupByTuple : DataT["groupByTuple"],
                                    orderByTuple : DataT["orderByTuple"],
                                    limit : DataT["limit"],
                                    unionOrderByTuple : DataT["unionOrderByTuple"],
                                    unionLimit : DataT["unionLimit"],
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
                                                TableAlias<ToTableT>,
                                                false
                                            >
                                        >
                                    ),
                                    selectReferences : DataT["selectReferences"],
                                    selectTuple : DataT["selectTuple"],
                                    distinct : DataT["distinct"],
                                    sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                                    groupByTuple : DataT["groupByTuple"],
                                    orderByTuple : DataT["orderByTuple"],
                                    limit : DataT["limit"],
                                    unionOrderByTuple : DataT["unionOrderByTuple"],
                                    unionLimit : DataT["unionLimit"],
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
                                                TableAlias<ToTableT>,
                                                true
                                            >
                                        >
                                    ),
                                    selectReferences : DataT["selectReferences"],
                                    selectTuple : DataT["selectTuple"],
                                    distinct : DataT["distinct"],
                                    sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                                    groupByTuple : DataT["groupByTuple"],
                                    orderByTuple : DataT["orderByTuple"],
                                    limit : DataT["limit"],
                                    unionOrderByTuple : DataT["unionOrderByTuple"],
                                    unionLimit : DataT["unionLimit"],
                                }>
                            ) :
                            (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
                    )
            )
    );

    //TYPE-NARROW CLAUSE
    whereIsNotNull<TypeNarrowCallbackT extends TypeNarrowCallback<ISelectBuilder<DataT>>> (
        typeNarrowCallback : TypeNarrowCallbackT
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.NARROW> extends never ?
            ("NARROW clause not allowed here"|void|never) :
            ReturnType<TypeNarrowCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ?
                ISelectBuilder<{
                    allowed : DataT["allowed"],
                    columnReferences : ReplaceColumnOfReference<
                        DataT["columnReferences"],
                        TableNameT,
                        NameT,
                        Exclude<TypeT, null|undefined>
                    >,
                    joins : DataT["joins"],
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
                    distinct : DataT["distinct"],
                    sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                    groupByTuple : DataT["groupByTuple"],
                    orderByTuple : DataT["orderByTuple"],
                    limit : DataT["limit"],
                    unionOrderByTuple : DataT["unionOrderByTuple"],
                    unionLimit : DataT["unionLimit"],
                }> :
                ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
    whereIsNull<TypeNarrowCallbackT extends TypeNarrowCallback<ISelectBuilder<DataT>>> (
        typeNarrowCallback : TypeNarrowCallbackT
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.NARROW> extends never ?
            ("NARROW clause not allowed here"|void|never) :
            ReturnType<TypeNarrowCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ?
                ISelectBuilder<{
                    allowed : DataT["allowed"],
                    columnReferences : ReplaceColumnOfReference<
                        DataT["columnReferences"],
                        TableNameT,
                        NameT,
                        null
                    >,
                    joins : DataT["joins"],
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
                    distinct : DataT["distinct"],
                    sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                    groupByTuple : DataT["groupByTuple"],
                    orderByTuple : DataT["orderByTuple"],
                    limit : DataT["limit"],
                    unionOrderByTuple : DataT["unionOrderByTuple"],
                    unionLimit : DataT["unionLimit"],
                }> :
                ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
    whereIsEqual<
        ConstT extends boolean|number|string,
        TypeNarrowCallbackT extends TypeNarrowCallback<ISelectBuilder<DataT>>
    > (
        value : ConstT,
        typeNarrowCallback : TypeNarrowCallbackT
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.NARROW> extends never ?
            ("NARROW clause not allowed here"|void|never) :
            ReturnType<TypeNarrowCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ?
                ISelectBuilder<{
                    allowed : DataT["allowed"],
                    columnReferences : ReplaceColumnOfReference<
                        DataT["columnReferences"],
                        TableNameT,
                        NameT,
                        ConstT
                    >,
                    joins : DataT["joins"],
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
                    distinct : DataT["distinct"],
                    sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                    groupByTuple : DataT["groupByTuple"],
                    orderByTuple : DataT["orderByTuple"],
                    limit : DataT["limit"],
                    unionOrderByTuple : DataT["unionOrderByTuple"],
                    unionLimit : DataT["unionLimit"],
                }> :
                ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );

    //WHERE CLAUSE
    //Replaces but ANDs with NARROW
    where<WhereCallbackT extends WhereCallback<ISelectBuilder<DataT>>> (
        whereCallback : WhereCallbackT
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.WHERE> extends never ?
            ("WHERE clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : DataT["orderByTuple"],
                limit : DataT["limit"],
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : DataT["unionLimit"],
            }>
    );
    //Appends
    andWhere<WhereCallbackT extends WhereCallback<ISelectBuilder<DataT>>> (
        whereCallback : WhereCallbackT
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.WHERE> extends never ?
            ("WHERE clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : DataT["orderByTuple"],
                limit : DataT["limit"],
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : DataT["unionLimit"],
            }>
    );

    //SELECT CLAUSE
    select<SelectCallbackT extends SelectCallback<ISelectBuilder<DataT>>> (
        selectCallback : SelectCallbackT
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.SELECT> extends never ?
            ("SELECT clause not allowed here"|void|never) :
            true extends SelectTupleHasDuplicateColumn<ReturnType<SelectCallbackT>> ?
                (
                    "Duplicate columns found in SELECT, consider aliasing"|void|never
                ) :
                ISelectBuilder<{
                    allowed : EnableOperation<DataT, SelectBuilderOperation.WIDEN|SelectBuilderOperation.UNION|SelectBuilderOperation.AS>,
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
                    distinct : DataT["distinct"],
                    sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                    groupByTuple : DataT["groupByTuple"],
                    orderByTuple : DataT["orderByTuple"],
                    limit : DataT["limit"],
                    unionOrderByTuple : DataT["unionOrderByTuple"],
                    unionLimit : DataT["unionLimit"],
                }>
    );

    //DISTINCT CLAUSE
    distinct () : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.DISTINCT> extends never ?
            ("DISTINCT clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : true,
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : DataT["orderByTuple"],
                limit : DataT["limit"],
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : DataT["unionLimit"],
            }>
    );
    distinct<DistinctT extends boolean> (distinct : DistinctT) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.DISTINCT> extends never ?
            ("DISTINCT clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DistinctT,
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : DataT["orderByTuple"],
                limit : DataT["limit"],
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : DataT["unionLimit"],
            }>
    );

    //SQL_CALC_FOUND_ROWS CLAUSE
    sqlCalcFoundRows () : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.SQL_CALC_FOUND_ROWS> extends never ?
            ("SQL_CALC_FOUND_ROWS clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : true,
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : DataT["orderByTuple"],
                limit : DataT["limit"],
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : DataT["unionLimit"],
            }>
    );
    sqlCalcFoundRows<SqlCalcFoundRowsT extends boolean> (sqlCalcFoundRows : SqlCalcFoundRowsT) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.SQL_CALC_FOUND_ROWS> extends never ?
            ("SQL_CALC_FOUND_ROWS clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : SqlCalcFoundRowsT,
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : DataT["orderByTuple"],
                limit : DataT["limit"],
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : DataT["unionLimit"],
            }>
    );

    //GROUP BY CLAUSE
    //Replaces
    groupBy<GroupByCallbackT extends GroupByCallback<ISelectBuilder<DataT>>> (
        groupByCallback : GroupByCallbackT
    ):(
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.GROUP_BY> extends never ?
            ("GROUP_BY clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : ReturnType<GroupByCallbackT>,
                orderByTuple : DataT["orderByTuple"],
                limit : DataT["limit"],
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : DataT["unionLimit"],
            }>
    );
    //Appends
    appendGroupBy<GroupByCallbackT extends GroupByCallback<ISelectBuilder<DataT>>> (
        groupByCallback : GroupByCallbackT
    ):(
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.GROUP_BY> extends never ?
            ("GROUP_BY clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : (
                    DataT["groupByTuple"] extends Tuple<any> ?
                        TupleConcat<
                            DataT["groupByTuple"],
                            ReturnType<GroupByCallbackT>
                        > :
                        ReturnType<GroupByCallbackT>
                ),
                orderByTuple : DataT["orderByTuple"],
                limit : DataT["limit"],
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : DataT["unionLimit"],
            }>
    );

    //REMOVES GROUP BY
    unsetGroupBy () : (
        ISelectBuilder<{
            allowed : DataT["allowed"],
            columnReferences : DataT["columnReferences"],
            joins : DataT["joins"],
            selectReferences : DataT["selectReferences"],
            selectTuple : DataT["selectTuple"],
            distinct : DataT["distinct"],
            sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
            groupByTuple : undefined,
            orderByTuple : DataT["orderByTuple"],
            limit : DataT["limit"],
            unionOrderByTuple : DataT["unionOrderByTuple"],
            unionLimit : DataT["unionLimit"],
        }>
    );

    //HAVING CLAUSE
    having<HavingCallbackT extends HavingCallback<ISelectBuilder<DataT>>> (
        havingCallback : HavingCallbackT
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.HAVING> extends never ?
            ("HAVING clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : DataT["orderByTuple"],
                limit : DataT["limit"],
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : DataT["unionLimit"],
            }>
    );
    //Appends
    andHaving<HavingCallbackT extends HavingCallback<ISelectBuilder<DataT>>> (
        havingCallback : HavingCallbackT
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.HAVING> extends never ?
            ("HAVING clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : DataT["orderByTuple"],
                limit : DataT["limit"],
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : DataT["unionLimit"],
            }>
    );

    //ORDER BY CLAUSE
    //Replaces
    orderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ):(
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.ORDER_BY> extends never ?
            ("ORDER_BY clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : ReturnType<OrderByCallbackT>,
                limit : DataT["limit"],
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : DataT["unionLimit"],
            }>
    );
    //Appends
    appendOrderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ):(
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.ORDER_BY> extends never ?
            ("ORDER_BY clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : (
                    DataT["orderByTuple"] extends Tuple<any> ?
                        TupleConcat<
                            DataT["orderByTuple"],
                            ReturnType<OrderByCallbackT>
                        > :
                        ReturnType<OrderByCallbackT>
                ),
                limit : DataT["limit"],
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : DataT["unionLimit"],
            }>
    );

    //REMOVES ORDER BY
    unsetOrderBy () : (
        ISelectBuilder<{
            allowed : DataT["allowed"],
            columnReferences : DataT["columnReferences"],
            joins : DataT["joins"],
            selectReferences : DataT["selectReferences"],
            selectTuple : DataT["selectTuple"],
            distinct : DataT["distinct"],
            sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
            groupByTuple : DataT["groupByTuple"],
            orderByTuple : undefined,
            limit : DataT["limit"],
            unionOrderByTuple : DataT["unionOrderByTuple"],
            unionLimit : DataT["unionLimit"],
        }>
    );

    //LIMIT CLAUSE
    limit<RowCountT extends number> (rowCount : RowCountT) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.LIMIT> extends never ?
            ("LIMIT clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : DataT["orderByTuple"],
                limit : (
                    DataT["limit"] extends LimitData ?
                        {
                            rowCount : RowCountT,
                            offset : DataT["limit"]["offset"],
                        } :
                        {
                            rowCount : RowCountT,
                            offset : 0,
                        }
                ),
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : DataT["unionLimit"],
            }>
    );

    //OFFSET CLAUSE
    offset<OffsetT extends number> (offset : OffsetT) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.OFFSET> extends never ?
            ("OFFSET clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : DataT["orderByTuple"],
                limit : (
                    DataT["limit"] extends LimitData ?
                        {
                            rowCount : DataT["limit"]["rowCount"],
                            offset : OffsetT,
                        } :
                        {
                            rowCount : typeof ArbitraryRowCount,
                            offset : OffsetT,
                        }
                ),
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : DataT["unionLimit"],
            }>
    );

    //REMOVES LIMIT
    unsetLimit () : (
        ISelectBuilder<{
            allowed : DataT["allowed"],
            columnReferences : DataT["columnReferences"],
            joins : DataT["joins"],
            selectReferences : DataT["selectReferences"],
            selectTuple : DataT["selectTuple"],
            distinct : DataT["distinct"],
            sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
            groupByTuple : DataT["groupByTuple"],
            orderByTuple : DataT["orderByTuple"],
            limit : undefined,
            unionOrderByTuple : DataT["unionOrderByTuple"],
            unionLimit : DataT["unionLimit"],
        }>
    );

    //WIDEN CLAUSE
    widen<
        TypeWidenCallbackT extends TypeWidenCallback<ISelectBuilder<DataT>>,
        WidenT
    > (
        typeWidenCallback : TypeWidenCallbackT,
        assertWidened : sd.AssertFunc<WidenT>
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.WIDEN> extends never ?
            ("WIDEN clause not allowed here"|void|never) :
            ReturnType<TypeWidenCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ?
                ISelectBuilder<{
                    allowed : DataT["allowed"],
                    columnReferences : DataT["columnReferences"],
                    joins : DataT["joins"],
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
                    distinct : DataT["distinct"],
                    sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                    groupByTuple : DataT["groupByTuple"],
                    orderByTuple : DataT["orderByTuple"],
                    limit : DataT["limit"],
                    unionOrderByTuple : DataT["unionOrderByTuple"],
                    unionLimit : DataT["unionLimit"],
                }> :
                ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );

    //UNION CLAUSE
    union<SelectBuilderT extends ISelectBuilder<{
        allowed : any,
        columnReferences : any,
        joins : any,
        selectReferences : any,
        selectTuple : any,
        distinct : any,
        //Technically, not allowed to use SQL_CALC_FOUND_ROWS here
        sqlCalcFoundRows : any,
        groupByTuple : any,
        orderByTuple : any,
        limit : any,
        unionOrderByTuple : any,
        unionLimit : any,
    }>> (selectBuilder : SelectBuilderT) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.UNION> extends never ?
            ("UNION clause not allowed here"|void|never) :
            SelectBuilderT extends ISelectBuilder<infer OtherT> ?
                (
                    OtherT["selectTuple"] extends Tuple<any> ?
                        (
                            DataT["selectTuple"] extends Tuple<any> ?
                                (
                                    SelectTupleToType<OtherT["selectTuple"]> extends SelectTupleToType<DataT["selectTuple"]> ?
                                        ISelectBuilder<{
                                            allowed : DisableOperation<DataT, SelectBuilderOperation.NARROW|SelectBuilderOperation.SELECT>,
                                            columnReferences : DataT["columnReferences"],
                                            joins : DataT["joins"],
                                            selectReferences : DataT["selectReferences"],
                                            selectTuple : DataT["selectTuple"],
                                            distinct : DataT["distinct"],
                                            sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                                            groupByTuple : DataT["groupByTuple"],
                                            orderByTuple : DataT["orderByTuple"],
                                            limit : DataT["limit"],
                                            unionOrderByTuple : DataT["unionOrderByTuple"],
                                            unionLimit : DataT["unionLimit"],
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
    ):(
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.UNION_ORDER_BY> extends never ?
            ("UNION_ORDER_BY clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : DataT["orderByTuple"],
                limit : DataT["limit"],
                unionOrderByTuple : ReturnType<OrderByCallbackT>,
                unionLimit : DataT["unionLimit"],
            }>
    );
    //Appends
    appendUnionOrderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ):(
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.UNION_ORDER_BY> extends never ?
            ("UNION_ORDER_BY clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : DataT["orderByTuple"],
                limit : DataT["limit"],
                unionOrderByTuple : (
                    DataT["unionOrderByTuple"] extends Tuple<any> ?
                        TupleConcat<
                            DataT["unionOrderByTuple"],
                            ReturnType<OrderByCallbackT>
                        > :
                        ReturnType<OrderByCallbackT>
                ),
                unionLimit : DataT["unionLimit"],
            }>
    );

    //REMOVES UNION ORDER BY
    unsetUnionOrderBy () : (
        ISelectBuilder<{
            allowed : DataT["allowed"],
            columnReferences : DataT["columnReferences"],
            joins : DataT["joins"],
            selectReferences : DataT["selectReferences"],
            selectTuple : DataT["selectTuple"],
            distinct : DataT["distinct"],
            sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
            groupByTuple : DataT["groupByTuple"],
            orderByTuple : DataT["orderByTuple"],
            limit : DataT["limit"],
            unionOrderByTuple : undefined,
            unionLimit : DataT["unionLimit"],
        }>
    );

    //UNION LIMIT CLAUSE
    unionLimit<RowCountT extends number> (rowCount : RowCountT) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.UNION_LIMIT> extends never ?
            ("UNION_LIMIT clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : DataT["orderByTuple"],
                limit : DataT["limit"],
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : (
                    DataT["unionLimit"] extends LimitData ?
                        {
                            rowCount : RowCountT,
                            offset : DataT["unionLimit"]["offset"],
                        } :
                        {
                            rowCount : RowCountT,
                            offset : 0,
                        }
                ),
            }>
    );

    //UNION OFFSET CLAUSE
    unionOffset<OffsetT extends number> (offset : OffsetT) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.UNION_OFFSET> extends never ?
            ("UNION_OFFSET clause not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DataT["allowed"],
                columnReferences : DataT["columnReferences"],
                joins : DataT["joins"],
                selectReferences : DataT["selectReferences"],
                selectTuple : DataT["selectTuple"],
                distinct : DataT["distinct"],
                sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                groupByTuple : DataT["groupByTuple"],
                orderByTuple : DataT["orderByTuple"],
                limit : DataT["limit"],
                unionOrderByTuple : DataT["unionOrderByTuple"],
                unionLimit : (
                    DataT["unionLimit"] extends LimitData ?
                        {
                            rowCount : DataT["unionLimit"]["rowCount"],
                            offset : OffsetT,
                        } :
                        {
                            rowCount : typeof ArbitraryRowCount,
                            offset : OffsetT,
                        }
                ),
            }>
    );

    //REMOVES UNION LIMIT
    unsetUnionLimit () : (
        ISelectBuilder<{
            allowed : DataT["allowed"],
            columnReferences : DataT["columnReferences"],
            joins : DataT["joins"],
            selectReferences : DataT["selectReferences"],
            selectTuple : DataT["selectTuple"],
            distinct : DataT["distinct"],
            sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
            groupByTuple : DataT["groupByTuple"],
            orderByTuple : DataT["orderByTuple"],
            limit : DataT["limit"],
            unionOrderByTuple : DataT["unionOrderByTuple"],
            unionLimit : undefined,
        }>
    );

    //AS CLAUSE
    as<AliasT extends string> (alias : AliasT) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.AS> extends never ?
            ("AS clause not allowed here"|void|never) :
            DataT["selectTuple"] extends Tuple<JoinableSelectTupleElement<DataT["columnReferences"]>> ?
                (
                    true extends JoinableSelectTupleHasDuplicateColumnName<DataT["selectTuple"]> ?
                        "Cannot have duplicate column names in SELECT clause when aliasing"|void|never :
                        AliasedTable<AliasT, AliasT, JoinableSelectTupleToRawColumnCollection<DataT["selectTuple"]>>
                ) :
                "Cannot use tables in SELECT clause when aliasing"|void|never
    );
}

export type AnySelectBuilder = ISelectBuilder<any>;

export type CreateSelectBuilderDelegate = (
    <TableT extends AnyAliasedTable> (
        table : TableT
    ) => (
        ISelectBuilder<{
            allowed : (
                //Append whenever, cannot unjoin
                //Uses columnReferences
                SelectBuilderOperation.JOIN|

                //Narrow before UNION, cannot un-narrow
                //Uses columnReferences
                SelectBuilderOperation.NARROW|

                //Append and replace whenever, always ANDs with NARROW
                //Uses columnReferences
                SelectBuilderOperation.WHERE|

                //Append before UNION
                //Uses columnReferences
                SelectBuilderOperation.SELECT|

                //Toggle whenever
                SelectBuilderOperation.DISTINCT|

                //Toggle whenever
                SelectBuilderOperation.SQL_CALC_FOUND_ROWS|

                //Unset, append and replace whenever
                //Uses columnReferences, selectReferences
                SelectBuilderOperation.GROUP_BY|

                //Append and replace whenever
                //TECHNICALLY, can only use columns in GROUP BY, or columns in aggregate functions,
                //But MySQL supports an extension that allows columns from SELECT
                //As such, this library does not check for valid columns here
                //As long as it is in columnReferences or selectReferences
                SelectBuilderOperation.HAVING|

                //Unset, append and replace whenever
                //Uses columnReferences, selectReferences
                SelectBuilderOperation.ORDER_BY|

                //Replace whenever
                SelectBuilderOperation.LIMIT|

                //Replace whenever, sets LIMIT to arbitrary large number if LIMIT not set yet
                SelectBuilderOperation.OFFSET|

                //After SELECT, does not affect query, used for column compatibility with UNION
                //Uses selectReferences
                //SelectBuilderOperation.WIDEN|

                //Append after SELECT
                //SelectBuilderOperation.UNION|

                //Unset, append and replace whenever
                //Uses columnReferences, selectReferences
                SelectBuilderOperation.UNION_ORDER_BY|

                //Replace whenever
                SelectBuilderOperation.UNION_LIMIT|

                //Replace whenever, sets UNION_LIMIT to arbitrary large number if UNION_LIMIT not set yet
                SelectBuilderOperation.UNION_OFFSET

                //After SELECT
                //SelectBuilderOperation.AS
            )[],
            columnReferences : TableToReference<TableT>,
            joins : [Join<TableAlias<TableT>, false>],
            selectReferences : {},
            selectTuple : undefined,
            distinct : false,
            sqlCalcFoundRows : false,
            groupByTuple : undefined,
            orderByTuple : undefined,
            limit : undefined,
            unionOrderByTuple : undefined,
            unionLimit : undefined,
        }>
    )
);
