import * as sd from "schema-decorator";
import {Tuple, TupleKeys, TupleLength, TuplePush} from "./Tuple";
import {spread} from "@anyhowstep/type-util";
import * as d from "./declaration";
import * as def from "./definition";

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



///////////////////////////////////

export type ColumnToReference<ColumnT extends d.AnyColumn> = (
    ColumnT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ?
        (
            {
                [table in TableNameT] : {
                    [name in NameT] : d.IColumn<TableNameT, NameT, TypeT>
                }
            }
        ) :
        never//("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
);
export type ToPartialColumnReferences<ColumnReferencesT extends d.ColumnReferences> = {
    [table in keyof ColumnReferencesT]+? : {
        [column in keyof ColumnReferencesT[table]]+? : d.ColumnReferencesT[table][column]
    }
};


//////////////////////////////

export type ToColumnsInCallback<
    ToColumnsCallbackT extends ToColumnsCallback<any, any>
> = (
    ToColumnsCallbackT extends Tuple<d.AnyColumn> ?
    ToColumnsCallbackT :
    ToColumnsCallbackT extends (...args : any[]) => infer TupleT ?
    TupleT :
    ("Invalid ToColumnsCallbackT or could not infer TupleT"|void|never)
)




export interface AnySelectBuilderData {
    //Used by WHERE clause
    columnReferences : d.ColumnReferences,
    //Modified by JOIN clauses
    joinReferences : JoinReferences,

    //Modified by WHERE clause
    typeNarrowedColumns : d.ColumnReferences,

    //Set by SELECT clause
    selectReferences : d.ColumnReferences,

    //Set by SELECT clause
    selectTuple : undefined|Tuple<SelectTupleElement</*this["columnReferences"]*/any>>,

    //Set by DISTINCT
    distinct : boolean,

    //Set by GROUP BY clause
    groupByReferences : d.ColumnReferences,

    //Set by ORDER BY clause
    orderBy : undefined|Tuple<
        OrderByTupleElement</*this["columnReferences"] & this["selectReferences"]*/any>
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
        OrderByTupleElement</*this["columnReferences"] & this["selectReferences"]*/any>
    >,

    //Set by LIMIT and OFFSET clause
    unionLimit : undefined|{
        rowCount : number,
        offset : number,
    },

    allowed : {
        join : boolean,
        where : boolean,
        select : boolean,
        distinct : boolean,
        groupBy : boolean,
        having : boolean,
        orderBy : boolean,
        limit : boolean,
        offset : boolean,
        widen : boolean,

        union : {
            union : boolean,
            orderBy : boolean,
            limit : boolean,
            offset : boolean,
        },
    }
}



export type WhereCallback<
    FromBuilderT extends SelectBuilder<any>
> = (
    FromBuilderT extends SelectBuilder<infer DataT> ?
        (
            columnReferences : DataT["columnReferences"],
            fromBuilder : FromBuilderT
        ) => (
            Expr<
                ToPartialColumnReferences<DataT["columnReferences"]>,
                boolean
            >
        ):
        never
);

export type SelectTupleElementType<
    SelectTupleElementT extends SelectTupleElement<any>
> = (
    SelectTupleElementT extends SelectColumnExpr<
        any,
        infer TypeT,
        any,
        any
    > ?
    TypeT :
    SelectTupleElementT extends d.IColumn<any, any, infer TypeT> ?
    TypeT :
    SelectTupleElementT extends {
        [name : string] : d.AnyColumn
    } ?
    {
        [name in keyof SelectTupleElementT] : (
            SelectTupleElementT[name] extends d.IColumn<any, any, infer TypeT> ?
                TypeT :
                never
        )
    } :
    never
);

export type SelectTupleToType<
    TupleT extends Tuple<SelectTupleElement<any>>
> = (
    {
        [index in TupleKeys<TupleT>] : SelectTupleElementType<TupleT[index]>
    } & { length : TupleLength<TupleT> } & (SelectTupleElementType<TupleT[TupleKeys<TupleT>]>)[]
);

export type SelectTupleElementReplaceColumn<
    SelectTupleElementT extends SelectTupleElement<any>,
    NewTableNameT extends string,
    NewNameT extends string,
    NewTypeT
> = (
    SelectTupleElementT extends SelectColumnExpr<
        infer UsedReferencesT,
        infer TypeT,
        NewTableNameT,
        NewNameT
    > ?
    SelectColumnExpr<
        UsedReferencesT,
        NewTypeT,
        NewTableNameT,
        NewNameT
    > :
    SelectTupleElementT extends d.IColumn<NewTableNameT, NewNameT, any> ?
    Column<NewTableNameT, NewNameT, NewTypeT> :
    SelectTupleElementT extends {
        [name : string] : d.AnyColumn
    } ?
    {
        [name in keyof SelectTupleElementT] : (
            SelectTupleElementT[name] extends d.IColumn<NewTableNameT, NewNameT, any> ?
                Column<NewTableNameT, NewNameT, NewTypeT> :
                SelectTupleElementT[name]
        )
    } :
    SelectTupleElementT
);
export type SelectTupleReplaceColumn<
    TupleT extends Tuple<SelectTupleElement<any>>,
    NewTableNameT extends string,
    NewNameT extends string,
    NewTypeT
> = (
    {
        [index in TupleKeys<TupleT>] : SelectTupleElementReplaceColumn<
            TupleT[index],
            NewTableNameT,
            NewNameT,
            NewTypeT
        >
    } &
    { length : TupleLength<TupleT> } &
    (SelectTupleElementReplaceColumn<
        TupleT[TupleKeys<TupleT>],
        NewTableNameT,
        NewNameT,
        NewTypeT
    >)[] &
    {
        "0" : SelectTupleElementReplaceColumn<
            TupleT[0],
            NewTableNameT,
            NewNameT,
            NewTypeT
        >
    }
);

export type JoinableSelectTupleElement<ColumnReferencesT extends d.ColumnReferences> = (
    (SelectColumnExpr<
        ToPartialColumnReferences<ColumnReferencesT>,
        any,
        "__expr",
        any
    >)|
    ColumnReferenceElement<ColumnReferencesT>
);

export type SelectTupleElement<ColumnReferencesT extends d.ColumnReferences> = (
    (SelectColumnExpr<
        ToPartialColumnReferences<ColumnReferencesT>,
        any,
        "__expr",
        any
    >)|
    ColumnReferencesT[keyof ColumnReferencesT]|
    ColumnReferenceElement<ColumnReferencesT>
);
export type SelectTupleElementToColumnType<ElementT extends SelectTupleElement<any>> = (
    ElementT extends SelectColumnExpr<any, infer TypeT, infer TableNameT, infer NameT> ?
    Column<TableNameT, NameT, TypeT> :
    ElementT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ?
    Column<TableNameT, NameT, TypeT> :
    ElementT extends {
        [name : string] : d.AnyColumn
    } ?
    ElementT[keyof ElementT] :
    never
);
export type SelectTupleHasDuplicateColumn<TupleT extends Tuple<SelectTupleElement<any>>> = (
    HasDuplicateColumn<
        {
            [index in TupleKeys<TupleT>] : SelectTupleElementToColumnType<TupleT[index]>
        } &
        { length : TupleLength<TupleT> } &
        { "0" : SelectTupleElementToColumnType<TupleT[0]> } &
        (d.AnyColumn)[]
    >
);

export type SelectTupleElementToReference<ElementT extends SelectTupleElement<any>> = (
    ElementT extends SelectColumnExpr<any, infer TypeT, infer TableNameT, infer NameT> ?
    ColumnToReference<Column<TableNameT, NameT, TypeT>> :
    ElementT extends d.AnyColumn ?
    ColumnToReference<ElementT> :
    ElementT extends {
        [name : string] : d.AnyColumn
    } ?
    (
        ElementT[keyof ElementT] extends d.IColumn<infer TableNameT, any, any> ?
            {
                [k in TableNameT] : ElementT
            } :
            {}
    ) :
    {}
);
export type SelectTupleToReferenceInner<
    TupleT extends Tuple<SelectTupleElement<any>>,
    K extends string
> = (
    TupleT extends {[k in K]:infer ElementT} ?
        SelectTupleElementToReference<ElementT> :
        {}
);
export type SelectTupleToReference<
    TupleT extends Tuple<SelectTupleElement<any>>
> = (
    //TODO More elements
    //TODO Figure out a TupleReduce type
    SelectTupleToReferenceInner<TupleT, "0"> &
    SelectTupleToReferenceInner<TupleT, "1"> &
    SelectTupleToReferenceInner<TupleT, "2"> &
    SelectTupleToReferenceInner<TupleT, "3"> &
    SelectTupleToReferenceInner<TupleT, "4"> &
    SelectTupleToReferenceInner<TupleT, "5"> &
    SelectTupleToReferenceInner<TupleT, "6"> &
    SelectTupleToReferenceInner<TupleT, "7"> &
    SelectTupleToReferenceInner<TupleT, "8"> &
    SelectTupleToReferenceInner<TupleT, "9"> &
    SelectTupleToReferenceInner<TupleT, "10">
);

export type JoinableSelectTupleElementToRawColumn<ElementT extends JoinableSelectTupleElement<any>> = (
    ElementT extends SelectColumnExpr<any, infer TypeT, any, infer NameT> ?
    {
        [name in NameT] : sd.AssertDelegate<TypeT>
    } :
    ElementT extends d.IColumn<any, infer NameT, infer TypeT> ?
    {
        [name in NameT] : sd.AssertDelegate<TypeT>
    } :
    {}
);
export type JoinableSelectTupleToRawColumn<
    TupleT extends Tuple<JoinableSelectTupleElement<any>>,
    K extends string
> = (
    TupleT extends {[k in K]:infer ElementT} ?
        JoinableSelectTupleElementToRawColumn<ElementT> :
        {}
);
export type JoinableSelectTupleToRawColumnCollection<
    TupleT extends Tuple<JoinableSelectTupleElement<any>>
> = (
    //TODO More elements
    //TODO Figure out a TupleReduce type
    JoinableSelectTupleToRawColumn<TupleT, "0"> &
    JoinableSelectTupleToRawColumn<TupleT, "1"> &
    JoinableSelectTupleToRawColumn<TupleT, "2"> &
    JoinableSelectTupleToRawColumn<TupleT, "3"> &
    JoinableSelectTupleToRawColumn<TupleT, "4"> &
    JoinableSelectTupleToRawColumn<TupleT, "5"> &
    JoinableSelectTupleToRawColumn<TupleT, "6"> &
    JoinableSelectTupleToRawColumn<TupleT, "7"> &
    JoinableSelectTupleToRawColumn<TupleT, "8"> &
    JoinableSelectTupleToRawColumn<TupleT, "9"> &
    JoinableSelectTupleToRawColumn<TupleT, "10">
);
export type SelectCallback<
    FromBuilderT extends SelectBuilder<any>
> = (
    FromBuilderT extends SelectBuilder<infer DataT> ?
        (
            columnReferences : DataT["columnReferences"],
            fromBuilder : FromBuilderT
        ) => (
            Tuple<
                SelectTupleElement<DataT["columnReferences"]>
            >
        ):
        never
);



export type TypeWidenCallback<
    FromBuilderT extends SelectBuilder<any>
> = (
    FromBuilderT extends SelectBuilder<infer DataT> ?
        (
            columnReferences : DataT["selectReferences"]
        ) => (
            d.AnyColumn
        ):
        never
);


export type GroupByTupleElement<ColumnReferencesT extends d.ColumnReferences> = (
    ColumnReferencesT[keyof ColumnReferencesT]|
    ColumnReferenceElement<ColumnReferencesT>
);
export type GroupByTupleElementToReference<ElementT extends GroupByTupleElement<any>> = (
    ElementT extends d.AnyColumn ?
    ColumnToReference<ElementT> :
    ElementT extends {
        [name : string] : d.AnyColumn
    } ?
    (
        ElementT[keyof ElementT] extends d.IColumn<infer TableNameT, any, any> ?
            {
                [k in TableNameT] : ElementT
            } :
            {}
    ) :
    {}
);
export type GroupByTupleToReferenceInner<
    TupleT extends Tuple<GroupByTupleElement<any>>,
    K extends string
> = (
    TupleT extends {[k in K]:infer ElementT} ?
        GroupByTupleElementToReference<ElementT> :
        {}
);
export type GroupByTupleToReference<
    TupleT extends Tuple<GroupByTupleElement<any>>
> = (
    //TODO More elements
    //TODO Figure out a TupleReduce type
    GroupByTupleToReferenceInner<TupleT, "0"> &
    GroupByTupleToReferenceInner<TupleT, "1"> &
    GroupByTupleToReferenceInner<TupleT, "2"> &
    GroupByTupleToReferenceInner<TupleT, "3"> &
    GroupByTupleToReferenceInner<TupleT, "4"> &
    GroupByTupleToReferenceInner<TupleT, "5"> &
    GroupByTupleToReferenceInner<TupleT, "6"> &
    GroupByTupleToReferenceInner<TupleT, "7"> &
    GroupByTupleToReferenceInner<TupleT, "8"> &
    GroupByTupleToReferenceInner<TupleT, "9"> &
    GroupByTupleToReferenceInner<TupleT, "10">
);
export type GroupByCallback<
    FromBuilderT extends SelectBuilder<any>
> = (
    FromBuilderT extends SelectBuilder<infer DataT> ?
        (
            columnReferences : DataT["columnReferences"] & DataT["selectReferences"],
            fromBuilder : FromBuilderT
        ) => (
            Tuple<
                GroupByTupleElement<DataT["columnReferences"] & DataT["selectReferences"]>
            >
        ):
        never
);
export type HavingCallback<
    FromBuilderT extends SelectBuilder<any>
> = (
    FromBuilderT extends SelectBuilder<infer DataT> ?
        (
            columnReferences : DataT["columnReferences"] & DataT["selectReferences"],
            fromBuilder : FromBuilderT
        ) => (
            Expr<
                ToPartialColumnReferences<DataT["columnReferences"] & DataT["selectReferences"]>,
                boolean
            >
        ):
        never
);

export type OrderByFirstComponent<ColumnReferencesT extends d.ColumnReferences> = (
    (Expr<
        ToPartialColumnReferences<ColumnReferencesT>,
        any
    >)|
    ColumnReferenceElement<ColumnReferencesT>
);
export type OrderByTupleElement<ColumnReferencesT extends d.ColumnReferences> = (
    //Defaults to ASCENDING
    OrderByFirstComponent<ColumnReferencesT>|
    [
        OrderByFirstComponent<ColumnReferencesT>,
        //true for ASCENDING, false for DESCENDING
        boolean
    ]
);
export type OrderByCallback<
    FromBuilderT extends SelectBuilder<any>
> = (
    FromBuilderT extends SelectBuilder<infer DataT> ?
        (
            columnReferences : DataT["columnReferences"] & DataT["selectReferences"],
            fromBuilder : FromBuilderT
        ) => (
            Tuple<
                OrderByTupleElement<DataT["columnReferences"] & DataT["selectReferences"]>
            >
        ):
        never
);

export declare class SelectBuilder<T extends AnySelectBuilderData> {
    data : T;

    whereIsEqual<
        TypeNarrowCallbackT extends TypeNarrowCallback<SelectBuilder<T>>,
        ConstT extends number|string|null
    > (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : any,
                where : true,
                select : any,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>,
        value : ConstT,
        typeNarrowCallback : TypeNarrowCallbackT
    ) : (
        ReturnType<TypeNarrowCallbackT> extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ?
            (
                T["columnReferences"] extends d.ColumnToReference<ReturnType<TypeNarrowCallbackT>> ?
                    (
                        SelectBuilder<{
                            columnReferences : (
                                {
                                    [table in keyof T["columnReferences"]] : {
                                        [column in keyof T["columnReferences"][table]] : (
                                            table extends TableNameT ?
                                                (
                                                    column extends NameT ?
                                                        (
                                                            Column<TableNameT, NameT, ConstT>
                                                        ) :
                                                        (T["columnReferences"][table][column])
                                                ) :
                                                (T["columnReferences"][table][column])
                                        )
                                    }
                                }
                            ),
                            joinReferences : T["joinReferences"],
                            typeNarrowedColumns : (
                                T["typeNarrowedColumns"] &
                                {
                                    [table in TableNameT] : {
                                        [column in NameT] : d.IColumn<TableNameT, NameT, ConstT>
                                    }
                                }
                            ),
                            typeWidenedColumns : T["typeWidenedColumns"],
                            selectReferences : T["selectReferences"],
                            selectTuple : T["selectTuple"],
                            distinct : T["distinct"],
                            groupByReferences : T["groupByReferences"],
                            orderBy : T["orderBy"],
                            limit : T["limit"],
                            union : T["union"],
                            unionOrderBy : T["unionOrderBy"],
                            unionLimit : T["unionLimit"],

                            allowed : {
                                join : false,
                                where : T["allowed"]["where"],
                                select : T["allowed"]["select"],
                                distinct : T["allowed"]["distinct"],
                                groupBy : T["allowed"]["groupBy"],
                                having : T["allowed"]["having"],
                                orderBy : T["allowed"]["orderBy"],
                                limit : T["allowed"]["limit"],
                                offset : T["allowed"]["offset"],
                                widen : T["allowed"]["widen"],
                                union : T["allowed"]["union"],
                            }
                        }>
                    ) :
                    ("ColumnT is not in d.ColumnReferences"|void|never)
            ) :
            ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
    where<
        WhereCallbackT extends WhereCallback<SelectBuilder<T>>
    > (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : any,
                where : true,
                select : any,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>,
        whereCallback : WhereCallbackT
    ):(
        WhereCallbackT extends WhereCallback<SelectBuilder<T>> ?
            (
                ReturnType<WhereCallbackT> extends Expr<infer UsedReferencesT, boolean> ?
                    (
                        T["columnReferences"] extends UsedReferencesT ?
                            (
                                SelectBuilder<{
                                    columnReferences : T["columnReferences"],
                                    joinReferences : T["joinReferences"],
                                    typeNarrowedColumns : T["typeNarrowedColumns"],
                                    typeWidenedColumns : T["typeWidenedColumns"],
                                    selectReferences : T["selectReferences"],
                                    selectTuple : T["selectTuple"],
                                    distinct : T["distinct"],
                                    groupByReferences : T["groupByReferences"],
                                    orderBy : T["orderBy"],
                                    limit : T["limit"],
                                    union : T["union"],
                                    unionOrderBy : T["unionOrderBy"],
                                    unionLimit : T["unionLimit"],

                                    allowed : {
                                        join : false,
                                        where : T["allowed"]["where"],
                                        select : T["allowed"]["select"],
                                        distinct : T["allowed"]["distinct"],
                                        groupBy : T["allowed"]["groupBy"],
                                        having : T["allowed"]["having"],
                                        orderBy : T["allowed"]["orderBy"],
                                        limit : T["allowed"]["limit"],
                                        offset : T["allowed"]["offset"],
                                        widen : T["allowed"]["widen"],
                                        union : T["allowed"]["union"],
                                    }
                                }>
                            ) :
                            ("UsedReferencesT has some columns not in FromBuilder's columnReferences"|void|never)
                    ) :
                    ("Invalid ExprT or could not infer UsedReferencesT"|void|never)
            ) :
            ("Invalid WhereCallbackT"|void|never)
    );
    select<
        SelectCallbackT extends SelectCallback<SelectBuilder<T>>
    > (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : any,
                where : any,
                select : true,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>,
        selectCallback : SelectCallbackT
    ):(
        SelectCallbackT extends SelectCallback<SelectBuilder<T>> ?
            (
                true extends SelectTupleHasDuplicateColumn<ReturnType<SelectCallbackT>> ?
                    (
                        "Duplicate columns found in SELECT, consider aliasing"|void|never
                    ) :
                    SelectBuilder<{
                        columnReferences : T["columnReferences"],
                        joinReferences : T["joinReferences"],
                        typeNarrowedColumns : T["typeNarrowedColumns"],
                        typeWidenedColumns : T["typeWidenedColumns"],
                        selectReferences : SelectTupleToReference<ReturnType<SelectCallbackT>>,
                        selectTuple : ReturnType<SelectCallbackT>,
                        distinct : T["distinct"],
                        groupByReferences : T["groupByReferences"],
                        orderBy : T["orderBy"],
                        limit : T["limit"],
                        union : T["union"],
                        unionOrderBy : T["unionOrderBy"],
                        unionLimit : T["unionLimit"],

                        allowed : {
                            join : false,
                            where : false,
                            select : false,
                            distinct : true,
                            groupBy : true,
                            having : true,
                            orderBy : true,
                            limit : true,
                            offset : T["allowed"]["offset"],
                            widen : true,
                            union : {
                                union : true,
                                orderBy : T["allowed"]["union"]["orderBy"],
                                limit : T["allowed"]["union"]["limit"],
                                offset : T["allowed"]["union"]["offset"],
                            }
                        }
                    }>
            ) :
            ("Invalid SelectCallbackT"|void|never)
    );
    distinct (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : any,
                where : any,
                select : any,
                distinct : true,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>
    ) : (
        SelectBuilder<{
            columnReferences : T["columnReferences"],
            joinReferences : T["joinReferences"],
            typeNarrowedColumns : T["typeNarrowedColumns"],
            typeWidenedColumns : T["typeWidenedColumns"],
            selectReferences : T["selectReferences"],
            selectTuple : T["selectTuple"],
            distinct : true,
            groupByReferences : T["groupByReferences"],
            orderBy : T["orderBy"],
            limit : T["limit"],
            union : T["union"],
            unionOrderBy : T["unionOrderBy"],
            unionLimit : T["unionLimit"],

            allowed : {
                join : false,
                where : false,
                select : false,
                distinct : false,
                groupBy : T["allowed"]["groupBy"],
                having : T["allowed"]["having"],
                orderBy : T["allowed"]["orderBy"],
                limit : T["allowed"]["limit"],
                offset : T["allowed"]["offset"],
                widen : T["allowed"]["widen"],
                union : T["allowed"]["union"]
            }
        }>
    );
    groupBy<
        GroupByCallbackT extends GroupByCallback<SelectBuilder<T>>
    > (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : any,
                where : any,
                select : any,
                distinct : any,
                groupBy : true,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>,
        groupByCallback : GroupByCallbackT
    ):(
        GroupByCallbackT extends GroupByCallback<SelectBuilder<T>> ?
            (
                SelectBuilder<{
                    columnReferences : T["columnReferences"],
                    joinReferences : T["joinReferences"],
                    typeNarrowedColumns : T["typeNarrowedColumns"],
                    typeWidenedColumns : T["typeWidenedColumns"],
                    selectReferences : T["selectReferences"],
                    selectTuple : T["selectTuple"],
                    distinct : T["distinct"],
                    groupByReferences : GroupByTupleToReference<ReturnType<GroupByCallbackT>>,
                    orderBy : T["orderBy"],
                    limit : T["limit"],
                    union : T["union"],
                    unionOrderBy : T["unionOrderBy"],
                    unionLimit : T["unionLimit"],

                    allowed : {
                        join : false,
                        where : false,
                        select : false,
                        distinct : false,
                        groupBy : false,
                        having : T["allowed"]["having"],
                        orderBy : T["allowed"]["orderBy"],
                        limit : T["allowed"]["limit"],
                        offset : T["allowed"]["offset"],
                        widen : T["allowed"]["widen"],
                        union : T["allowed"]["union"],
                    }
                }>
            ) :
            ("Invalid SelectCallbackT"|void|never)
    );
    having<
        HavingCallbackT extends HavingCallback<SelectBuilder<T>>
    > (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : any,
                where : any,
                select : any,
                distinct : any,
                groupBy : any,
                having : true,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>,
        havingCallback : HavingCallbackT
    ):(
        HavingCallbackT extends HavingCallback<SelectBuilder<T>> ?
            (
                ReturnType<HavingCallbackT> extends Expr<infer UsedReferencesT, boolean> ?
                    (
                        T["columnReferences"] & T["selectReferences"] extends UsedReferencesT ?
                            (
                                SelectBuilder<{
                                    columnReferences : T["columnReferences"],
                                    joinReferences : T["joinReferences"],
                                    typeNarrowedColumns : T["typeNarrowedColumns"],
                                    typeWidenedColumns : T["typeWidenedColumns"],
                                    selectReferences : T["selectReferences"],
                                    selectTuple : T["selectTuple"],
                                    distinct : T["distinct"],
                                    groupByReferences : T["groupByReferences"],
                                    orderBy : T["orderBy"],
                                    limit : T["limit"],
                                    union : T["union"],
                                    unionOrderBy : T["unionOrderBy"],
                                    unionLimit : T["unionLimit"],

                                    allowed : {
                                        join : false,
                                        where : false,
                                        select : false,
                                        distinct : false,
                                        groupBy : false,
                                        having : false,
                                        orderBy : T["allowed"]["orderBy"],
                                        limit : T["allowed"]["limit"],
                                        offset : T["allowed"]["offset"],
                                        widen : T["allowed"]["widen"],
                                        union : T["allowed"]["union"],
                                    }
                                }>
                            ) :
                            ("UsedReferencesT has some columns not in FromBuilder's columnReferences and selectReferences"|void|never)
                    ) :
                    ("Invalid ExprT or could not infer UsedReferencesT"|void|never)
            ) :
            ("Invalid HavingCallbackT"|void|never)
    );
    orderBy<
        OrderByCallbackT extends OrderByCallback<SelectBuilder<T>>
    > (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : any,
                where : any,
                select : any,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : true,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>,
        orderByCallback : OrderByCallbackT
    ):(
        OrderByCallbackT extends OrderByCallback<SelectBuilder<T>> ?
            (
                SelectBuilder<{
                    columnReferences : T["columnReferences"],
                    joinReferences : T["joinReferences"],
                    typeNarrowedColumns : T["typeNarrowedColumns"],
                    typeWidenedColumns : T["typeWidenedColumns"],
                    selectReferences : T["selectReferences"],
                    selectTuple : T["selectTuple"],
                    distinct : T["distinct"],
                    groupByReferences : T["groupByReferences"],
                    orderBy : ReturnType<OrderByCallbackT>,
                    limit : T["limit"],
                    union : T["union"],
                    unionOrderBy : T["unionOrderBy"],
                    unionLimit : T["unionLimit"],

                    allowed : {
                        join : false,
                        where : false,
                        select : false,
                        distinct : false,
                        groupBy : false,
                        having : false,
                        orderBy : false,
                        limit : T["allowed"]["limit"],
                        offset : T["allowed"]["offset"],
                        widen : T["allowed"]["widen"],
                        union : T["allowed"]["union"],
                    }
                }>
            ) :
            ("Invalid OrderByCallbackT"|void|never)
    );
    limit<RowCountT extends number> (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : any,
                where : any,
                select : any,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : true,
                offset : any,
                widen : any,
                union : any,
            }
        }>,
        rowCount : RowCountT
    ):(
        SelectBuilder<{
            columnReferences : T["columnReferences"],
            joinReferences : T["joinReferences"],
            typeNarrowedColumns : T["typeNarrowedColumns"],
            typeWidenedColumns : T["typeWidenedColumns"],
            selectReferences : T["selectReferences"],
            selectTuple : T["selectTuple"],
            distinct : T["distinct"],
            groupByReferences : T["groupByReferences"],
            orderBy : T["orderBy"],
            limit : {
                rowCount : RowCountT,
                offset : 0,
            },
            union : T["union"],
            unionOrderBy : T["unionOrderBy"],
            unionLimit : T["unionLimit"],

            allowed : {
                join : false,
                where : false,
                select : false,
                distinct : false,
                groupBy : false,
                having : false,
                orderBy : false,
                limit : false,
                //OFFSET is allowed after LIMIT
                offset : true,
                widen : T["allowed"]["widen"],
                union : T["allowed"]["union"],
            }
        }>
    );
    offset<OffsetT extends number> (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : {
                rowCount : any,
                offset : any,
            },
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : any,
                where : any,
                select : any,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : true,
                widen : any,
                union : any,
            }
        }>,
        offset : OffsetT
    ):(
        T["limit"] extends { rowCount : number } ?
            SelectBuilder<{
                columnReferences : T["columnReferences"],
                joinReferences : T["joinReferences"],
                typeNarrowedColumns : T["typeNarrowedColumns"],
                typeWidenedColumns : T["typeWidenedColumns"],
                selectReferences : T["selectReferences"],
                selectTuple : T["selectTuple"],
                distinct : T["distinct"],
                groupByReferences : T["groupByReferences"],
                orderBy : T["orderBy"],
                limit : {
                    rowCount : T["limit"]["rowCount"],
                    offset : OffsetT,
                },
                union : T["union"],
                unionOrderBy : T["unionOrderBy"],
                unionLimit : T["unionLimit"],

                allowed : {
                    join : false,
                    where : false,
                    select : false,
                    distinct : false,
                    groupBy : false,
                    having : false,
                    orderBy : false,
                    limit : false,
                    offset : false,
                    widen : T["allowed"]["widen"],
                    union : T["allowed"]["union"],
                }
            }> :
            never
    );
    widen<
        TypeWidenCallbackT extends TypeWidenCallback<SelectBuilder<T>>,
        WidenT
    > (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : any,
                where : any,
                select : any,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : true,
                union : any,
            }
        }>,
        typeWidenCallback : TypeWidenCallbackT,
        assertWidened : sd.AssertDelegate<WidenT>
    ) : (
        ReturnType<TypeWidenCallbackT> extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ?
            (
                T["columnReferences"] extends d.ColumnToReference<ReturnType<TypeWidenCallbackT>> ?
                    (
                        SelectBuilder<{
                            columnReferences : T["columnReferences"],
                            joinReferences : T["joinReferences"],
                            typeNarrowedColumns : T["typeNarrowedColumns"],
                            typeWidenedColumns : (
                                T["typeWidenedColumns"] &
                                {
                                    [table in TableNameT] : {
                                        [column in NameT] : d.IColumn<TableNameT, NameT, TypeT|WidenT>
                                    }
                                }
                            ),
                            selectReferences : (
                                {
                                    [table in keyof T["selectReferences"]] : {
                                        [column in keyof T["selectReferences"][table]] : (
                                            table extends TableNameT ?
                                                (
                                                    column extends NameT ?
                                                        (
                                                            Column<TableNameT, NameT, TypeT|WidenT>
                                                        ) :
                                                        (T["selectReferences"][table][column])
                                                ) :
                                                (T["selectReferences"][table][column])
                                        )
                                    }
                                }
                            ),
                            selectTuple : (
                                T["selectTuple"] extends Tuple<any> ?
                                    SelectTupleReplaceColumn<
                                        T["selectTuple"],
                                        TableNameT,
                                        NameT,
                                        TypeT|WidenT
                                    > :
                                    T["selectTuple"]
                                ),
                            distinct : T["distinct"],
                            groupByReferences : T["groupByReferences"],
                            orderBy : T["orderBy"],
                            limit : T["limit"],
                            union : T["union"],
                            unionOrderBy : T["unionOrderBy"],
                            unionLimit : T["unionLimit"],

                            allowed : {
                                join : false,
                                where : false,
                                select : false,
                                distinct : false,
                                groupBy : false,
                                having : false,
                                orderBy : false,
                                limit : false,
                                offset : false,
                                widen : T["allowed"]["widen"],
                                union : T["allowed"]["union"],
                            }
                        }>
                    ) :
                    ("ColumnT is not in d.ColumnReferences"|void|never)
            ) :
            ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
    union<
        FromBuilderT extends SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : false,
                where : false,
                select : false,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>
    > (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : any,
                where : any,
                select : any,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : {
                    union : true,
                    orderBy : any,
                    limit : any,
                    offset : any,
                },
            }
        }>,
        fromBuilder : FromBuilderT
    ) : (
        FromBuilderT extends SelectBuilder<infer DataT> ?
            (
                DataT["selectTuple"] extends Tuple<any> ?
                    (
                        T["selectTuple"] extends Tuple<any> ?
                            (
                                SelectTupleToType<DataT["selectTuple"]> extends SelectTupleToType<T["selectTuple"]> ?
                                    (
                                        SelectBuilder<{
                                            columnReferences : T["columnReferences"],
                                            joinReferences : T["joinReferences"],
                                            typeNarrowedColumns : T["typeNarrowedColumns"],
                                            typeWidenedColumns : T["typeWidenedColumns"],
                                            selectReferences : T["selectReferences"],
                                            selectTuple : T["selectTuple"],
                                            distinct : T["distinct"],
                                            groupByReferences : T["groupByReferences"],
                                            orderBy : T["orderBy"],
                                            limit : T["limit"],
                                            union : T["union"] extends Tuple<any> ?
                                                TuplePush<T["union"], SelectBuilder<DataT>>:
                                                [SelectBuilder<DataT>],
                                            unionOrderBy : T["unionOrderBy"],
                                            unionLimit : T["unionLimit"],

                                            allowed : {
                                                join : false,
                                                where : false,
                                                select : false,
                                                distinct : false,
                                                groupBy : false,
                                                having : false,
                                                orderBy : false,
                                                limit : false,
                                                offset : false,
                                                widen : false,
                                                union : {
                                                    union : T["allowed"]["union"]["union"],
                                                    orderBy : true,
                                                    limit : true,
                                                    offset : T["allowed"]["union"]["offset"],
                                                },
                                            }
                                        }>
                                    ) :
                                    ("ColumnT is not in d.ColumnReferences"|void|never)
                            ) :
                            ("Invalid selectTuple"|void|never)
                    ) :
                    ("FromBuilderT has invalid selectTuple"|void|never)
            ) :
            ("Invalid FromBuilderT or cannot infer DataT"|void|never)
    );
    orderBy<
        OrderByCallbackT extends OrderByCallback<SelectBuilder<T>>
    > (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : any,
                where : any,
                select : any,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : false,
                limit : any,
                offset : any,
                widen : any,
                union : {
                    union : any,
                    orderBy : true,
                    limit : any,
                    offset : any,
                },
            }
        }>,
        orderByCallback : OrderByCallbackT
    ):(
        OrderByCallbackT extends OrderByCallback<SelectBuilder<T>> ?
            (
                SelectBuilder<{
                    columnReferences : T["columnReferences"],
                    joinReferences : T["joinReferences"],
                    typeNarrowedColumns : T["typeNarrowedColumns"],
                    typeWidenedColumns : T["typeWidenedColumns"],
                    selectReferences : T["selectReferences"],
                    selectTuple : T["selectTuple"],
                    distinct : T["distinct"],
                    groupByReferences : T["groupByReferences"],
                    orderBy : T["orderBy"],
                    limit : T["limit"],
                    union : T["union"],
                    unionOrderBy : ReturnType<OrderByCallbackT>,
                    unionLimit : T["unionLimit"],

                    allowed : {
                        join : false,
                        where : false,
                        select : false,
                        distinct : false,
                        groupBy : false,
                        having : false,
                        orderBy : false,
                        limit : false,
                        offset : false,
                        widen : false,
                        union : {
                            union : false,
                            orderBy : false,
                            limit : T["allowed"]["union"]["limit"],
                            offset : T["allowed"]["union"]["offset"],
                        },
                    }
                }>
            ) :
            ("Invalid OrderByCallbackT"|void|never)
    );
    limit<RowCountT extends number> (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : any,
                where : any,
                select : any,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : false,
                offset : any,
                widen : any,
                union : {
                    union : any,
                    orderBy : any,
                    limit : true,
                    offset : any,
                },
            }
        }>,
        rowCount : RowCountT
    ):(
        SelectBuilder<{
            columnReferences : T["columnReferences"],
            joinReferences : T["joinReferences"],
            typeNarrowedColumns : T["typeNarrowedColumns"],
            typeWidenedColumns : T["typeWidenedColumns"],
            selectReferences : T["selectReferences"],
            selectTuple : T["selectTuple"],
            distinct : T["distinct"],
            groupByReferences : T["groupByReferences"],
            orderBy : T["orderBy"],
            limit : T["limit"],
            union : T["union"],
            unionOrderBy : T["unionOrderBy"],
            unionLimit : {
                rowCount : RowCountT,
                offset : 0,
            },

            allowed : {
                join : false,
                where : false,
                select : false,
                distinct : false,
                groupBy : false,
                having : false,
                orderBy : false,
                limit : false,
                offset : false,
                widen : false,
                union : {
                    union : false,
                    orderBy : false,
                    limit : false,
                    offset : true,
                },
            }
        }>
    );
    offset<OffsetT extends number> (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : {
                rowCount : any,
                offset : any,
            },

            allowed : {
                join : any,
                where : any,
                select : any,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : false,
                widen : any,
                union : {
                    union : any,
                    orderBy : any,
                    limit : any,
                    offset : true,
                },
            }
        }>,
        offset : OffsetT
    ):(
        T["unionLimit"] extends { rowCount : number } ?
            SelectBuilder<{
                columnReferences : T["columnReferences"],
                joinReferences : T["joinReferences"],
                typeNarrowedColumns : T["typeNarrowedColumns"],
                typeWidenedColumns : T["typeWidenedColumns"],
                selectReferences : T["selectReferences"],
                selectTuple : T["selectTuple"],
                distinct : T["distinct"],
                groupByReferences : T["groupByReferences"],
                orderBy : T["orderBy"],
                limit : T["limit"],
                union : T["union"],
                unionOrderBy : T["unionOrderBy"],
                unionLimit : {
                    rowCount : T["unionLimit"]["rowCount"],
                    offset : OffsetT,
                },

                allowed : {
                    join : false,
                    where : false,
                    select : false,
                    distinct : false,
                    groupBy : false,
                    having : false,
                    orderBy : false,
                    limit : false,
                    offset : false,
                    widen : false,
                    union : {
                        union : false,
                        orderBy : false,
                        limit : false,
                        offset : false,
                    },
                }
            }> :
            never
    );
    as<AliasT extends string> (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : false,
                where : false,
                select : false,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>,
        alias : AliasT
    ) : (
        T["selectTuple"] extends Tuple<JoinableSelectTupleElement<T["columnReferences"]>> ?
            AliasedTable<AliasT, AliasT, JoinableSelectTupleToRawColumnCollection<T["selectTuple"]>> :
            "Cannot use tables in SELECT clause when aliasing"|void|never
    );
    fetchAll (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : false,
                where : false,
                select : false,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>
    ) : Promise<T["selectReferences"][]>;
    fetchOne (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : false,
                where : false,
                select : false,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>
    ) : Promise<T["selectReferences"]>;
    fetchZeroOrOne (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : false,
                where : false,
                select : false,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>
    ) : Promise<T["selectReferences"]|undefined>;
    fetchValue (
        this : AnySelectBuilderValueQuery
    ) : (
        T["selectTuple"] extends (
            Tuple<JoinableSelectTupleElement<any>> &
            { length : 1 }
        ) ?
            Promise<SelectTupleElementType<T["selectTuple"][0]>> :
            never
    );
    fetchValueOrUndefined (
        this : AnySelectBuilderValueQuery
    ) : (
        T["selectTuple"] extends (
            Tuple<JoinableSelectTupleElement<any>> &
            { length : 1 }
        ) ?
            Promise<SelectTupleElementType<T["selectTuple"][0]>|undefined> :
            never
    );
    fetchValueArray (
        this : AnySelectBuilderValueQuery
    ) : (
        T["selectTuple"] extends (
            Tuple<JoinableSelectTupleElement<any>> &
            { length : 1 }
        ) ?
            Promise<SelectTupleElementType<T["selectTuple"][0]>[]> :
            never
    );
    //May not always work if GROUP BY, HAVING clauses use a select-expression,
    //May not work as intended with UNION selects
    count () : Promise<number>;

    //Uses count() internally, same restrictions apply
    paginate (paginationArgs? : RawPaginationArgs) : Promise<PaginateResult<T["selectReferences"]>>;

    /*insert<
        TableT extends Table<any, any, {
            autoIncrement : any,
            hasServerDefaultValue : any,
        }>,
        InsertCallbackT extends InsertCallback<TableT>
    > (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : false,
                where : false,
                select : false,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>,
        table: TableT,
        insertCallback : InsertCallbackT
    ) : (
        ReturnType<InsertCallbackT>
        T["selectTuple"] extends Tuple<JoinableSelectTupleElement<T["columnReferences"]>> ?
            AliasedTable<AliasT, AliasT, JoinableSelectTupleToRawColumnCollection<T["selectTuple"]>> :
            "Cannot use tables in SELECT clause when aliasing"|void|never
    );*/
}

export declare function from<
    TableT extends AnyAliasedTable
> (
    table : TableT
) : (
    SelectBuilder<{
        columnReferences : TableReference<TableT>,
        joinReferences : [JoinReference<TableReference<TableT>, false>],
        typeNarrowedColumns : {},
        selectReferences : {},
        selectTuple : undefined,
        distinct : false,
        groupByReferences : {},
        orderBy : undefined,
        limit : undefined,
        typeWidenedColumns : {},
        union : undefined,
        unionOrderBy : undefined,
        unionLimit : undefined,

        allowed : {
            join : true,
            where : true,
            select : true,
            //Only allow the below clauses after the SELECT clause
            distinct : false,
            groupBy : false,
            having : false,
            orderBy : false,
            limit : false,
            //OFFSET only allowed after LIMIT
            offset : false,
            widen : false,

            union : {
                union : false,
                orderBy : false,
                limit : false,
                offset : false,
            }
        }
    }>
);

let preF = from(app)
    .join(appKey, [app.columns.appId, app.columns.appId, app.columns.appId, app.columns.appId, app.columns.appId], [appKey.columns.appId, appKey.columns.appId, appKey.columns.appId, appKey.columns.appId, appKey.columns.appId])
    .leftJoin(ssoClient, [app.columns.ssoClientId], [ssoClient.columns.ssoClientId])

let f = preF

    .rightJoin(user, [app.columns.appId], [user.columns.appId]);

f.data.columnReferences.app.appId
f.data.joinReferences[0].columnReferences.app.appId
f.data.joinReferences[0].nullable
f.data.columnReferences.appKey.appId
f.data.joinReferences[1].columnReferences.appKey.appId
f.data.joinReferences[1].nullable
f.data.columnReferences.ssoClient.ssoClientId
f.data.joinReferences[2].columnReferences.ssoClient.ssoClientId
f.data.joinReferences[2].nullable
f.data.columnReferences.user.appId
f.data.joinReferences[3].columnReferences.user.appId
f.data.joinReferences[3].nullable

/*
    Expressions can be,

    + Constants (e.g. 1, 2, true, false, null, "hello, world!", new Date())
    + Columns
    + Other Expr<> instances
*/
type SelectBuilderValueQuery<TypeT> = SelectBuilder<{
    columnReferences : any,
    joinReferences : any,
    typeNarrowedColumns : any,
    selectReferences : any,
    selectTuple : Tuple<JoinableSelectTupleElement<any>> & {
        length : 1
    } & { "0": (SelectColumnExpr<
        any,
        TypeT,
        "__expr",
        any
    >)|
    Column<any, any, TypeT>},
    distinct : any,
    groupByReferences : any,
    orderBy : any,
    limit : any,
    typeWidenedColumns : any,
    union : any,
    unionOrderBy : any,
    unionLimit : any,

    allowed : {
        join : false,
        where : false,
        select : false,
        //Only allow the below clauses after the SELECT clause
        distinct : any,
        groupBy : any,
        having : any,
        orderBy : any,
        limit : any,
        //OFFSET only allowed after LIMIT
        offset : any,
        widen : any,

        union : any,
    }
}>;
type AnySelectBuilderValueQuery = SelectBuilder<{
    columnReferences : any,
    joinReferences : any,
    typeNarrowedColumns : any,
    selectReferences : any,
    selectTuple : Tuple<JoinableSelectTupleElement<any>> & {
        length : 1
    },
    distinct : any,
    groupByReferences : any,
    orderBy : any,
    limit : any,
    typeWidenedColumns : any,
    union : any,
    unionOrderBy : any,
    unionLimit : any,

    allowed : {
        join : false,
        where : false,
        select : false,
        //Only allow the below clauses after the SELECT clause
        distinct : any,
        groupBy : any,
        having : any,
        orderBy : any,
        limit : any,
        //OFFSET only allowed after LIMIT
        offset : any,
        widen : any,

        union : any,
    }
}>;

type AllowedExprConstants = number|string|boolean|Date|null|undefined;
export type RawExpr<TypeT> = (
    (
        //TODO `undefined` constant should be mapped to `null`
        TypeT extends AllowedExprConstants ?
            TypeT :
            never
    )|
    Expr<any, TypeT>|
    Column<any, any, TypeT>|
    SelectBuilderValueQuery<TypeT>
);
export type RawExprNoUsedRef<TypeT> = (
    (
        //TODO `undefined` constant should be mapped to `null`
        TypeT extends AllowedExprConstants ?
            TypeT :
            never
    )|
    Expr<{}, TypeT>|
    Column<any, any, TypeT>|
    SelectBuilderValueQuery<TypeT>
);
type ExprUsedColumns<RawExprT extends RawExpr<any>> = (
    RawExprT extends SelectBuilder<any> ?
    {} :
    RawExprT extends AllowedExprConstants ?
    {} :
    RawExprT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ?
    {
        [table in TableNameT] : {
            [name in NameT] : d.IColumn<TableNameT, NameT, TypeT>
        }
    } :
    RawExprT extends Expr<infer UsedColumnsT, any> ?
    UsedColumnsT :
    never//("Invalid RawExprT or could not infer used columns"|void|never)
);
type ExprType<RawExprT extends RawExpr<any>> = (
    RawExprT extends AllowedExprConstants ?
    RawExprT :
    RawExprT extends d.IColumn<any, any, infer TypeT> ?
    TypeT :
    RawExprT extends Expr<any, infer TypeT> ?
    TypeT :
    RawExprT extends SelectBuilder<infer DataT> ?
        (
            DataT["selectTuple"] extends (
                Tuple<JoinableSelectTupleElement<any>> &
                { length : 1 }
            ) ?
                SelectTupleElementType<DataT["selectTuple"][0]> :
                ("Invalid selectTuple; must have 1 element, and not be a table"|void|never)
        )
     :
    ("Invalid RawExprT or could not infer TypeT/DataT"|void|never)
);

declare class Expressions {
    true () : Expr<{}, true>;
    eq<
        LeftT extends RawExpr<any>,
        RightT extends RawExpr<ExprType<LeftT>|null>
    > (left : LeftT, right : RightT) : Expr<
        ExprUsedColumns<LeftT> & ExprUsedColumns<RightT>,
        boolean
    >;
    identity<
        ExprT extends RawExpr<any>
    > (expr : ExprT) : Expr<
        ExprUsedColumns<ExprT>,
        ExprType<ExprT>
    >;
}
declare const e : Expressions;

const w = f
    .whereIsNotNull(c => c.app.appId)
    .whereIsEqual(3, c => c.app.appId)
    //.whereIsNull(c => c.app.columns.appId)
    .where((c) => {
        return e.eq(1,c.app.appId);
        //return e.eq(1, c.app.columns.appId);
        //const x : typeof test2;
        //return test2;
        //return e.true();
    })
w.data.columnReferences
/*
WHERE clause can modify type of columnReferences,
Examples

    column IS NULL : T -> null
    column IS NOT NULL : T|null -> T
    column = 5 : number -> 5
    //TODO Figure out how to handle '1' = 1, 1 = '1' because it evaluates to true on MySQL
    //TODO Maybe avoid allowing such comparisons on the client side?
    //FOR NOW, non-goal
*/

//declare function tuple<TupleT extends Tuple<any>>(t : TupleT) : TupleT;

type HasDuplicateColumn<TupleT extends Tuple<d.AnyColumn>> = {
    [index in TupleKeys<TupleT>]: (
        //Only one element? No duplicate
        Exclude<TupleKeys<TupleT>, index> extends never ?
            (never) :
            (
                //Is a column?
                TupleT[index] extends d.IColumn<infer TableNameT, infer NameT, any> ?
                    (
                        {
                            [other in Exclude<TupleKeys<TupleT>, index>] : (
                                TupleT[other] extends d.IColumn<infer OtherTableNameT, infer OtherNameT, any> ?
                                    (
                                        Extract<TupleT[index], TupleT[other]> extends never ?
                                            never :
                                            true
                                    ) :
                                    (never)
                            )
                        }[Exclude<TupleKeys<TupleT>, index>]
                    ) :
                    (never)
            )
    )
}[TupleKeys<TupleT>];
declare const dup : [typeof app.columns.appId, typeof app.columns.appId];
declare const dup2 : [typeof app.columns.appId, typeof app.columns.ssoApiKey, typeof app.columns.appId];
declare const dup3 : [typeof app.columns.appId|typeof app.columns.ssoApiKey, typeof app.columns.appId|typeof app.columns.webhookKey];
declare const dup4 : [typeof app.columns.appId|typeof app.columns.ssoApiKey, typeof app.columns.appId];
declare const noDup : [typeof app.columns.appId];

declare const mustFindDup : HasDuplicateColumn<typeof dup>;
declare const mustFindDup2 : HasDuplicateColumn<typeof dup2>;
declare const mustFindDup3 : HasDuplicateColumn<typeof dup3>;
declare const mustFindDup4 : HasDuplicateColumn<typeof dup4>;
declare const mustNotFindDup : HasDuplicateColumn<typeof noDup>;


function foo () {
    const subE = e.identity(from(app).select(c => [app.columns.name]));
    const f = from(app)
        .join(
            appKey,
            c => [c.app.appId],
            t => [t.appId]
        )
        .leftJoin(
            ssoClient,
            c => [c.app.ssoClientId],
            t => [t.ssoClientId])
        .join(
            from(app)
                .select(c => [
                    c.app.webhookKey,
                    e.true().as("subexpr")
                ])
                .as("subqueryTable"),
            c => [c.app.webhookKey],
            t => [t.webhookKey]
        )
        .whereIsNotNull(c => c.app.ssoApiKey)
        .where(c => {
            c.subqueryTable.subexpr
            return e.eq(c.app.appId, 5);
        })
        .select((c) => {
            return [
                //c.app.columns.ssoApiKey.as("aliased"),
                c.app,
                c.ssoClient.name,
                e.true().as("something"),
                //e.eq(c.app.columns.ssoApiKey,"2").as("eq"),
                //c.ssoClient.columns.initializeAfterAuthenticationEndpoint
            ]
        })
        .distinct()
        .groupBy((s) => {
            return [
                s.ssoClient.initializeAfterAuthenticationEndpoint
            ];
        })
        .having((s) => {
            return e.eq(s.__expr.something, true);
        })
        .orderBy((s) => {
            return [
                //s.__expr.columns.aliased,
                [s.app.name, true],
                [s.ssoClient.authenticationEndpoint, false],
                e.eq(s.app.appId, 1),
                [e.eq(s.app.appId, 1), true]
            ]
        })
        .limit(5)
        .offset(4)
        .widen(s => s.app.ssoApiKey, sd.nil())
        .widen(s => s.ssoClient.name, sd.number())
        .union(
            from(app)
                .select((s) => {
                    return [
                        s.app,
                        s.app.appId.as("w"),
                        e.true().as("test")
                    ]
                })
        )
        .union(
            from(app)
                .select((s) => {
                    return [
                        s.app,
                        s.app.appId.as("b"),
                        e.true().as("test3")
                    ]
                })
        )
        .orderBy(() => {
            return [e.true()]
        })
        .limit(30)
        .offset(56);
        //.execute() : Promise<SelectReferences>
    f.paginate()
        .then((result) => {
            result
        });
    from(app)
        .select(c => [c.app.name])
        .paginate()
        .then((result) => {
            result
        })
    f.data
}
foo();
