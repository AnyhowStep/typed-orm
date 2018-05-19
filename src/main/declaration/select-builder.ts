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
import {IColumn} from "./column";
import {TableAlias, TableToReference} from "./table-operation";
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
import {GroupByCallback, AnyGroupByTupleElement} from "./group-by";
import {HavingCallback} from "./having";
import {OrderByCallback, AnyOrderByTupleElement} from "./order-by";
import {TypeWidenCallback} from "./widen";
import {SelectTupleToType, SelectTupleElementType} from "./union";
import {
    JoinableSelectTupleElement,
    JoinableSelectTupleToRawColumnCollection,
    JoinableSelectTupleHasDuplicateColumnName
} from "./select-as";
import {Querify} from "./querify";
import {RenameTableOfColumns} from "./column-operation";
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

export const ArbitraryRowCount = 999999999;

export interface LimitData {
    readonly rowCount : number,
    readonly offset   : number,
}

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
    readonly allowed : SelectBuilderOperation[],

    //Modified by JOIN clause
    //Used by WHERE clause
    //Modified by WHERE clause
    readonly columnReferences : ColumnReferences,
    //Modified by JOIN clauses
    readonly joins : Tuple<AnyJoin>,

    readonly selectReferences : ColumnReferences,
    readonly selectTuple : undefined|Tuple<AnySelectTupleElement>,

    readonly distinct : boolean,
    readonly sqlCalcFoundRows : boolean,

    readonly groupByTuple : undefined|Tuple<AnyGroupByTupleElement>,

    readonly orderByTuple : undefined|Tuple<AnyOrderByTupleElement>,

    readonly limit : undefined|LimitData,

    readonly unionOrderByTuple : undefined|Tuple<AnyOrderByTupleElement>,

    readonly unionLimit : undefined|LimitData,

    readonly aggregateCallback : undefined|((row : any) => Promise<any>),
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
        FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"]>
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
                                                "INNER",
                                                ToTableT,
                                                TableToReference<ToTableT>,
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
                                    aggregateCallback : DataT["aggregateCallback"],
                                }>
                            ) :
                            (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
                    )
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
                                                "RIGHT",
                                                ToTableT,
                                                TableToReference<ToTableT>,
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
                                    aggregateCallback : DataT["aggregateCallback"],
                                }>
                            ) :
                            (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
                    )
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
                                                "LEFT",
                                                ToTableT,
                                                TableToReference<ToTableT>,
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
                                    aggregateCallback : DataT["aggregateCallback"],
                                }>
                            ) :
                            (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
                    )
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
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.JOIN> extends never ?
            ("JOIN USING clause not allowed here"|void|never) :
            (
                TableAlias<ToTableT> extends keyof DataT["columnReferences"] ?
                    ("Duplicate alias" | TableAlias<ToTableT> | void) :
                    (
                        JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ?
                            (
                                RenameTableOfColumns<JoinFromTupleOfCallback<FromTupleT>, ToTableT["alias"]> extends JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>> ?
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
                                                    "INNER",
                                                    ToTableT,
                                                    TableToReference<ToTableT>,
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
                                        aggregateCallback : DataT["aggregateCallback"],
                                    }> :
                                    ("Cannot JOIN USING; to table is missing columns or types do not match"|void|never)
                            ) :
                            (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
                    )
            )
    );
    rightJoinUsing<
        ToTableT extends AnyAliasedTable,
        FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"]>
    > (
        toTable : ToTableT,
        from : FromTupleT
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.JOIN> extends never ?
            ("JOIN clause not allowed here"|void|never) :
            (
                TableAlias<ToTableT> extends keyof DataT["columnReferences"] ?
                    ("Duplicate alias" | TableAlias<ToTableT> | void) :
                    (
                        JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ?
                            (
                                RenameTableOfColumns<JoinFromTupleOfCallback<FromTupleT>, ToTableT["alias"]> extends JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>> ?
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
                                                    "RIGHT",
                                                    ToTableT,
                                                    TableToReference<ToTableT>,
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
                                        aggregateCallback : DataT["aggregateCallback"],
                                    }> :
                                    ("Cannot RIGHT JOIN USING; to table is missing columns or types do not match"|void|never)
                            ) :
                            (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
                    )
            )
    );
    leftJoinUsing<
        ToTableT extends AnyAliasedTable,
        FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"]>
    > (
        toTable : ToTableT,
        from : FromTupleT
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.JOIN> extends never ?
            ("JOIN clause not allowed here"|void|never) :
            (
                TableAlias<ToTableT> extends keyof DataT["columnReferences"] ?
                    ("Duplicate alias" | TableAlias<ToTableT> | void) :
                    (
                        JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ?
                            (
                                RenameTableOfColumns<JoinFromTupleOfCallback<FromTupleT>, ToTableT["alias"]> extends JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>> ?
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
                                                    "LEFT",
                                                    ToTableT,
                                                    TableToReference<ToTableT>,
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
                                        aggregateCallback : DataT["aggregateCallback"],
                                    }> :
                                    ("Cannot LEFT JOIN USING; to table is missing columns or types do not match"|void|never)
                            ) :
                            (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>>|void)
                    )
            )
    );

    //TYPE-NARROW CLAUSE
    whereIsNotNull<TypeNarrowCallbackT extends TypeNarrowCallback<DataT["columnReferences"]>> (
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
                    distinct : DataT["distinct"],
                    sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                    groupByTuple : DataT["groupByTuple"],
                    orderByTuple : DataT["orderByTuple"],
                    limit : DataT["limit"],
                    unionOrderByTuple : DataT["unionOrderByTuple"],
                    unionLimit : DataT["unionLimit"],
                    aggregateCallback : DataT["aggregateCallback"],
                }> :
                ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
    whereIsNull<TypeNarrowCallbackT extends TypeNarrowCallback<DataT["columnReferences"]>> (
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
                    distinct : DataT["distinct"],
                    sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                    groupByTuple : DataT["groupByTuple"],
                    orderByTuple : DataT["orderByTuple"],
                    limit : DataT["limit"],
                    unionOrderByTuple : DataT["unionOrderByTuple"],
                    unionLimit : DataT["unionLimit"],
                    aggregateCallback : DataT["aggregateCallback"],
                }> :
                ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
    whereIsEqual<
        ConstT extends boolean|number|string,
        TypeNarrowCallbackT extends TypeNarrowCallback<DataT["columnReferences"]>
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
                    distinct : DataT["distinct"],
                    sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                    groupByTuple : DataT["groupByTuple"],
                    orderByTuple : DataT["orderByTuple"],
                    limit : DataT["limit"],
                    unionOrderByTuple : DataT["unionOrderByTuple"],
                    unionLimit : DataT["unionLimit"],
                    aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
            }>
    );

    //SELECT CLAUSE
    select<SelectCallbackT extends SelectCallback<ISelectBuilder<DataT>>> (
        selectCallback : SelectCallbackT
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.SELECT> extends never ?
            ("SELECT clause not allowed here"|void|never) :
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
                    allowed : EnableOperation<DataT, SelectBuilderOperation.WIDEN|SelectBuilderOperation.UNION|SelectBuilderOperation.AS|SelectBuilderOperation.FETCH|SelectBuilderOperation.AGGREGATE>,
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
                    aggregateCallback : DataT["aggregateCallback"],
                }>
    );
    selectAll () : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.SELECT> extends never ?
            ("SELECT clause not allowed here"|void|never) :
            (
                DataT["selectTuple"] extends undefined ?
                    ISelectBuilder<{
                        allowed : EnableOperation<DataT, SelectBuilderOperation.WIDEN|SelectBuilderOperation.UNION|SelectBuilderOperation.AS|SelectBuilderOperation.FETCH|SelectBuilderOperation.AGGREGATE>,
                        columnReferences : DataT["columnReferences"],
                        joins : DataT["joins"],
                        selectReferences : DataT["columnReferences"],
                        selectTuple : JoinTupleToSelectTuple<DataT["joins"]>,
                        distinct : DataT["distinct"],
                        sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                        groupByTuple : DataT["groupByTuple"],
                        orderByTuple : DataT["orderByTuple"],
                        limit : DataT["limit"],
                        unionOrderByTuple : DataT["unionOrderByTuple"],
                        unionLimit : DataT["unionLimit"],
                        aggregateCallback : DataT["aggregateCallback"],
                    }> :
                    ("selectAll() must be called before select()"|void|never)
            )
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
                aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
            aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
            aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
            aggregateCallback : DataT["aggregateCallback"],
        }>
    );

    //WIDEN CLAUSE
    widen<
        TypeWidenCallbackT extends TypeWidenCallback<DataT["selectReferences"]>,
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
                    distinct : DataT["distinct"],
                    sqlCalcFoundRows : DataT["sqlCalcFoundRows"],
                    groupByTuple : DataT["groupByTuple"],
                    orderByTuple : DataT["orderByTuple"],
                    limit : DataT["limit"],
                    unionOrderByTuple : DataT["unionOrderByTuple"],
                    unionLimit : DataT["unionLimit"],
                    aggregateCallback : DataT["aggregateCallback"],
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
        //Has no effect on the query
        aggregateCallback : any,
    }>> (selectBuilder : SelectBuilderT) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.UNION> extends never ?
            ("UNION clause not allowed here"|void|never) :
            SelectBuilderT extends ISelectBuilder<infer OtherT> ?
                (
                    OtherT["selectTuple"] extends Tuple<any> ?
                        (
                            DataT["selectTuple"] extends Tuple<any> ?
                                (
                                    //A run-time check is impossible, for now
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
                                            aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
            aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
                aggregateCallback : DataT["aggregateCallback"],
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
            aggregateCallback : DataT["aggregateCallback"],
        }>
    );

    //SUBQUERY
    readonly from : CreateSubSelectBuilderDelegate<DataT["columnReferences"]>;

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
                ("Cannot use tables in SELECT clause when aliasing"|void|never)
    );
    asExpr<AliasT extends string> (alias : AliasT) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.AS> extends never ?
            ("AS clause not allowed here"|void|never) :
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
        aggregateCallback : AggregateCallbackT
    ) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.AGGREGATE> extends never ?
            ("AGGREGATE not allowed here"|void|never) :
            ISelectBuilder<{
                allowed : DisableOperation<DataT, SelectBuilderOperation.WIDEN>,
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
                aggregateCallback : AggregateCallbackT,
            }>
    );

    //QUERIFY
    querifyColumnReferences (sb : IStringBuilder) : void;
    querifyWhere (sb : IStringBuilder) : void;

    //FETCH CLAUSE
    fetchAll () : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.FETCH> extends never ?
            ("Cannot FETCH here"|void|never) :
            Promise<FetchRowResult<DataT>[]>
    );
    fetchOne () : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.FETCH> extends never ?
            ("Cannot FETCH here"|void|never) :
            Promise<FetchRowResult<DataT>>
    );
    fetchZeroOrOne () : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.FETCH> extends never ?
            ("Cannot FETCH here"|void|never) :
            Promise<FetchRowResult<DataT>|undefined>
    );
    fetchValue () : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.FETCH> extends never ?
            ("Cannot FETCH here"|void|never) :
            DataT["selectTuple"] extends (
                Tuple<JoinableSelectTupleElement<DataT["columnReferences"]>> &
                { length : 1 }
            ) ?
                Promise<SelectTupleElementType<DataT["selectTuple"][0]>> :
                ("You can only fetchValue() if selecting one column"|void|never)
    );
    fetchValueOrUndefined () : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.FETCH> extends never ?
            ("Cannot FETCH here"|void|never) :
            DataT["selectTuple"] extends (
                Tuple<JoinableSelectTupleElement<DataT["columnReferences"]>> &
                { length : 1 }
            ) ?
                Promise<SelectTupleElementType<DataT["selectTuple"][0]>|undefined> :
                ("You can only fetchValueOrUndefined() if selecting one column"|void|never)
    );
    fetchValueArray () : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.FETCH> extends never ?
            ("Cannot FETCH here"|void|never) :
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
    paginate (paginationArgs? : RawPaginationArgs) : (
        IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.FETCH> extends never ?
            ("Cannot FETCH here"|void|never) :
            Promise<
                PaginateResult<FetchRowResult<DataT>>
            >
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

                //After SELECT
                //SelectBuilderOperation.FETCH
            )[],
            columnReferences : TableToReference<TableT>,
            joins : [Join<"FROM", TableT, TableToReference<TableT>, false>],
            selectReferences : {},
            selectTuple : undefined,
            distinct : false,
            sqlCalcFoundRows : false,
            groupByTuple : undefined,
            orderByTuple : undefined,
            limit : undefined,
            unionOrderByTuple : undefined,
            unionLimit : undefined,
            aggregateCallback : undefined,
        }>
    )
);

export type CreateSubSelectBuilderDelegate<ColumnReferencesT extends ColumnReferences> = (
    <TableT extends AnyAliasedTable> (
        table : TableT
    ) => (
        TableAlias<TableT> extends keyof ColumnReferencesT ?
            ("Duplicate alias" | TableAlias<TableT> | void) :
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

                    //After SELECT
                    //SelectBuilderOperation.FETCH

                    //After SELECT
                    //SelectBuilderOperation.AGGREGATE
                )[],
                columnReferences : TableToReference<TableT> & ColumnReferencesT,
                joins : [Join<"FROM", TableT, TableToReference<TableT>, false>],
                selectReferences : {},
                selectTuple : undefined,
                distinct : false,
                sqlCalcFoundRows : false,
                groupByTuple : undefined,
                orderByTuple : undefined,
                limit : undefined,
                unionOrderByTuple : undefined,
                unionLimit : undefined,
                aggregateCallback : undefined,
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
