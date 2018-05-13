import * as sd from "schema-decorator";
import {Tuple, TupleKeys, TupleLength, TuplePush} from "./Tuple";

export interface Column<TableNameT extends string, NameT extends string, TypeT> {
    table : TableNameT;
    name  : NameT;
    assertDelegate : sd.AssertDelegate<TypeT>;

    as<AliasT extends string>(alias : AliasT) : SelectColumnExpr<
        ColumnToReference<this>,
        TypeT,

        "__expr",
        AliasT
    >;
}
export type AnyColumn = Column<any, any, any>;

export type RawColumn = sd.AssertFunc<any>|Column<any, any, any>;
export declare type RawColumnCollection = {
    [name: string]: RawColumn;
};
export declare type TypeOf<RawColumnT extends RawColumn> = (
    RawColumnT extends sd.AssertFunc<infer T> ?
    T :
    RawColumnT extends Column<any, any, infer T> ?
    T :
    never
)
export type ColumnCollection<AliasT extends string, RawColumnsT extends RawColumnCollection> = {
    [name in keyof RawColumnsT] : Column<AliasT, name, TypeOf<RawColumnsT[name]>>
};

export declare function toColumns<AliasT extends string, RawColumnCollectionT extends RawColumnCollection> (
    alias  : string,
    columns : RawColumnCollectionT
) : ColumnCollection<AliasT, RawColumnCollectionT>;

export type AliasedTable<AliasT extends string, NameT extends string, RawColumnCollectionT extends RawColumnCollection> = {
    alias : AliasT;
    name  : NameT;
    columns : {
        [name in keyof RawColumnCollectionT] : Column<AliasT, name, TypeOf<RawColumnCollectionT[name]>>
    };
};
export type AnyAliasedTable = AliasedTable<any, any, {}>;


export type Pk<RawColumnCollectionT extends RawColumnCollection> = (
    (keyof RawColumnCollectionT)[] & { "0" : keyof RawColumnCollectionT }
);

export class Table<
    NameT extends string,
    RawColumnCollectionT extends RawColumnCollection,
    //PkT extends Pk<RawColumnCollectionT>,
    //AutoIncrementT extends undefined|(PkT extends Array<infer E> ? E : never)
> implements AliasedTable<NameT, NameT, RawColumnCollectionT> {
    public readonly alias  : NameT;
    public readonly name   : NameT;
    public readonly columns : {
        [name in keyof RawColumnCollectionT] : Column<NameT, name, TypeOf<RawColumnCollectionT[name]>>
    };
    //public readonly pk : PkT;
    //public readonly autoIncrement : AutoIncrementT;
    public constructor (name : NameT, columns : RawColumnCollectionT/*, pk : PkT, autoIncrement : AutoIncrementT*/) {
        this.alias = name;
        this.name  = name;
        this.columns = toColumns(name, columns);
        //this.pk = pk;
        //this.autoIncrement = autoIncrement;
    }
    public as<NewAliasT extends string> (alias : NewAliasT) : AliasedTable<NewAliasT, NameT, RawColumnCollectionT> {
        return {
            alias : alias,
            name : this.name,
            columns : toColumns(alias, this.columns),
        };
    }
}


/////////////////////////////////


export const ssoClient = new Table(
    "ssoClient",
    {
        ssoClientId : sd.stringToNumber(),
        name : sd.string(),
        authenticationEndpoint : sd.string(),
        initializeAfterAuthenticationEndpoint : sd.nullable(sd.string()),
    }/*,
    ["ssoClientId"],
    "ssoClientId"*/
);

export const app = new Table(
    "app",
    {
        appId : sd.stringToNumber(),
        name : sd.string(),
        ssoClientId : ssoClient.columns.ssoClientId,
        ssoApiKey : sd.nullable(sd.string()),
        webhookKey : sd.nullable(sd.string())
    }/*,
    ["appId"],
    "appId"*/
);

export const appKey = new Table(
    "appKey",
    {
        appId : sd.stringToNumber(),
        appKeyId : sd.string(),
        appKeyTypeId : sd.number(),
        key : sd.string(),
    },
    /*["appKeyId"],
    "appKeyId"*/
);
export const appKeyType = new Table(
    "appKeyType",
    {
        appKeyTypeId : sd.string(),
        internalName : sd.string(),
    }/*,
    ["appKeyTypeId"],
    "appKeyTypeId"*/
);

export const user = new Table(
    "user",
    {
        appId : sd.naturalNumber(),
        externalUserId : sd.string(),
        createdAt : sd.date(),
    }/*,
    ["appId", "externalUserId"],
    undefined*/
);

///////////////////////////////////

export type ColumnType<ColumnT extends AnyColumn> = (
    ColumnT extends Column<any, any, infer T> ?
    T :
    never
);

export type TableAlias<TableT extends AnyAliasedTable> = (
    TableT extends Table<infer Name, any> ?
    Name :
    TableT extends AliasedTable<infer Alias, any, {}> ?
    Alias :
    never
);
export type TableName<TableT extends AnyAliasedTable> = (
    TableT extends Table<infer Name, any> ?
    Name :
    TableT extends AliasedTable<any, infer Name, any> ?
    Name :
    never
);
export type TableColumns<TableT extends AnyAliasedTable> = (
    TableT extends Table<any, infer Columns> ?
    Columns :
    TableT extends AliasedTable<any, any, infer Columns> ?
    Columns :
    never
);

///////////////////////////////////

export type ColumnReferences = {
    [table : string] : {
        columns : {
            [column : string] : AnyColumn
        }
    }
};
export type Union<T> = (T[keyof T]);
export type ColumnReferenceElementInner<ColumnReferencesT extends ColumnReferences> = ({
    data: {
        [k in keyof ColumnReferencesT] : (
            Union<ColumnReferencesT[k]["columns"]>
        )
    }
});
export type ColumnReferenceElement<ColumnReferencesT extends ColumnReferences> = (
    {
        data : {
            [k in keyof ColumnReferenceElementInner<ColumnReferencesT>] : (
                Union<ColumnReferenceElementInner<ColumnReferencesT>[k]>
            )
        }
    }["data"]["data"]
);
export type ColumnReferenceTuple<ColumnReferencesT extends ColumnReferences> = (
    Tuple<ColumnReferenceElement<ColumnReferencesT>>
);

export type ColumnToReference<ColumnT extends AnyColumn> = (
    ColumnT extends Column<infer TableNameT, infer NameT, infer TypeT> ?
        (
            {
                [table in TableNameT] : {
                    columns : {
                        [name in NameT] : Column<TableNameT, NameT, TypeT>
                    }
                }
            }
        ) :
        never//("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
);
export type PartialColumnReferences = {
    [table : string] : {
        columns : {
            [column : string] : AnyColumn|undefined
        }
    }|undefined
};
export type ToPartialColumnReferences<ColumnReferencesT extends ColumnReferences> = {
    [table in keyof ColumnReferencesT]+? : {
        columns : {
            [column in keyof ColumnReferencesT[table]["columns"]]+? : ColumnReferencesT[table]["columns"][column]
        }
    }
};


type NullableColumnReference<ColumnReferencesT extends ColumnReferences> = (
    {
        [table in keyof ColumnReferencesT] : {
            columns : {
                [column in keyof ColumnReferencesT[table]["columns"]] : (
                    ColumnReferencesT[table]["columns"][column] extends Column<any, any, infer TypeT> ?
                        (
                            Column<table, column, TypeT|null>
                        ) :
                        (("Invalid ColumnT or could not infer TypeT of ColumnT"&table&column)&never&void)
                        /*(
                            //HACK
                            ColumnReferencesT[table]["columns"][column] extends AnyColumn ?
                                ColumnReferencesT[table]["columns"][column] :
                                AnyColumn
                        )*/
                )
            }
        }
    }
)

export type TableReference<TableT extends Table<any, {}>|AnyAliasedTable> = (
    TableT extends Table<any, infer ColumnsT> ?
    {
        [alias in TableAlias<TableT>] : {
            columns : {
                [name in keyof ColumnsT] : TableT["columns"][name]
            }
        }
    } :
    TableT extends AliasedTable<any, any, infer ColumnsT> ?
    {
        [alias in TableAlias<TableT>] : {
            columns : {
                [name in keyof ColumnsT] : TableT["columns"][name]
            }
        }
    } :
    never
);

type JoinReference<
    ColumnReferencesT extends ColumnReferences,
    NullableT extends boolean,
> = {
    columnReferences : ColumnReferencesT,
    nullable : NullableT,
};
type JoinReferences = Tuple<JoinReference<{}, boolean>>;

//////////////////////////////

type ToColumn<
    TableT extends AliasedTable<any, any, {}>,
    FromColumnT extends AnyColumn
> = (
    Column<TableAlias<TableT>, keyof TableColumns<TableT>, ColumnType<FromColumnT>|null>
);
type ToColumnTuple<
    TableT extends AliasedTable<any, any, {}>,
    FromColumnsT extends Tuple<AnyColumn>
> = (
    {
        [k in TupleKeys<FromColumnsT>] : (
            FromColumnsT[k] extends AnyColumn ?
                ToColumn<TableT, FromColumnsT[k]> :
                never
        )
    } &
    { length : TupleLength<FromColumnsT> } &
    (
        FromColumnsT[TupleKeys<FromColumnsT>] extends AnyColumn ?
            ToColumn<TableT, FromColumnsT[TupleKeys<FromColumnsT>]> :
            never
    )[] & {
        "0" : ToColumn<TableT, FromColumnsT[0]>
    }
);

export type ToColumnsCallback<
    TableT extends AliasedTable<any, any, {}>,
    FromColumnsT extends Tuple<AnyColumn>
> = (
    ToColumnTuple<TableT, FromColumnsT> |
    (
        (t : TableT["columns"]) => ToColumnTuple<TableT, FromColumnsT>
    )
);

export type ToColumnsInCallback<
    ToColumnsCallbackT extends ToColumnsCallback<any, any>
> = (
    ToColumnsCallbackT extends Tuple<AnyColumn> ?
    ToColumnsCallbackT :
    ToColumnsCallbackT extends (...args : any[]) => infer TupleT ?
    TupleT :
    ("Invalid ToColumnsCallbackT or could not infer TupleT"|void|never)
)

type IsFromColumn<
    TableReferencesT extends ColumnReferences,
    ColumnT extends AnyColumn
> = (
    ColumnT extends Column<infer AliasT, infer NameT, infer TypeT> ?
        (
            AliasT extends keyof TableReferencesT ?
                (
                    NameT extends keyof TableReferencesT[AliasT]["columns"] ?
                        (
                            sd.TypeOf<TableReferencesT[AliasT]["columns"][NameT]["assertDelegate"]> extends TypeT ?
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
type IsFromColumnTuple<
    TableReferencesT extends ColumnReferences,
    FromColumnsT extends Tuple<AnyColumn>
> = (
    {
        [k in TupleKeys<FromColumnsT>] : (
            FromColumnsT[k] extends AnyColumn ?
                IsFromColumn<TableReferencesT, FromColumnsT[k]> :
                never
        )
    } & { length : TupleLength<FromColumnsT> } & (FromColumnsT[0])[]
);

type NullableJoinReferences<JoinReferencesT extends JoinReferences> = (
    {
        [index in TupleKeys<JoinReferencesT>] : (
            JoinReferencesT[index] extends JoinReference<infer ColumnReferencesT, boolean> ?
                JoinReference<
                    ColumnReferencesT,
                    true
                > :
                never
        )
    } &
    { length : TupleLength<JoinReferencesT> } &
    (
        JoinReference<
            JoinReferencesT["0"]["columnReferences"],
            true
        >
    )[] &
    {
        "0" : (
            JoinReference<
                JoinReferencesT["0"]["columnReferences"],
                true
            >
        )
    }
);

export interface AnySelectBuilderData {
    //Used by WHERE clause
    columnReferences : ColumnReferences,
    //Modified by JOIN clauses
    joinReferences : JoinReferences,

    //Modified by WHERE clause
    typeNarrowedColumns : ColumnReferences,

    //Set by SELECT clause
    selectReferences : ColumnReferences,

    //Set by SELECT clause
    selectTuple : undefined|Tuple<SelectTupleElement</*this["columnReferences"]*/any>>,

    //Set by GROUP BY clause
    groupByReferences : ColumnReferences,

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
    typeWidenedColumns : ColumnReferences,

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

interface SelectColumnExpr<
    UsedReferencesT extends PartialColumnReferences,
    TypeT,

    TableNameT extends string,
    NameT extends string
> /*extends Expr<UsedReferencesT, TypeT>, Column<TableNameT, NameT, TypeT>*/ {
    usedReferences : UsedReferencesT;
    _dummyType? : TypeT;

    table : TableNameT;
    name : NameT;
};

declare class Expr<
    UsedReferencesT extends PartialColumnReferences,
    TypeT
>
    {
        usedReferences : UsedReferencesT;
        _dummyType? : TypeT;

        as<AliasT extends string>(alias : AliasT) : SelectColumnExpr<
            UsedReferencesT,
            TypeT,

            "__expr",
            AliasT
        >;
    }
;

export type FromColumnsCallback<
    ColumnReferencesT extends ColumnReferences,
    TupleT extends ColumnReferenceTuple<ColumnReferencesT>
> = (
    TupleT |
    (
        (columnReferences : ColumnReferencesT) => TupleT
    )
);

export type FromColumnsInCallback<
    FromColumnsCallbackT extends FromColumnsCallback<any, Tuple<AnyColumn>>
> = (
    FromColumnsCallbackT extends Tuple<AnyColumn> ?
    FromColumnsCallbackT :
    FromColumnsCallbackT extends (...args : any[]) => infer TupleT ?
    TupleT :
    ("Invalid FromColumnsCallbackT or could not infer TupleT"|void|never)
)

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
    SelectTupleElementT extends Column<any, any, infer TypeT> ?
    TypeT :
    SelectTupleElementT extends {
        columns : infer ColumnsT
    } ?
    {
        [name in keyof ColumnsT] : (
            ColumnsT[name] extends Column<any, any, infer TypeT> ?
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
    SelectTupleElementT extends Column<NewTableNameT, NewNameT, any> ?
    Column<NewTableNameT, NewNameT, NewTypeT> :
    SelectTupleElementT extends {
        columns : infer ColumnsT
    } ?
    {
        columns : {
            [name in keyof ColumnsT] : (
                ColumnsT[name] extends Column<NewTableNameT, NewNameT, any> ?
                    Column<NewTableNameT, NewNameT, NewTypeT> :
                    ColumnsT[name]
            )
        }
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

export type JoinableSelectTupleElement<ColumnReferencesT extends ColumnReferences> = (
    (SelectColumnExpr<
        ToPartialColumnReferences<ColumnReferencesT>,
        any,
        "__expr",
        any
    >)|
    ColumnReferenceElement<ColumnReferencesT>
);
;
export type SelectTupleElement<ColumnReferencesT extends ColumnReferences> = (
    (SelectColumnExpr<
        ToPartialColumnReferences<ColumnReferencesT>,
        any,
        "__expr",
        any
    >)|
    ColumnReferencesT[keyof ColumnReferencesT]|
    ColumnReferenceElement<ColumnReferencesT>
);
export type SelectTupleElementToReference<ElementT extends SelectTupleElement<any>> = (
    ElementT extends SelectColumnExpr<any, infer TypeT, infer TableNameT, infer NameT> ?
    ColumnToReference<Column<TableNameT, NameT, TypeT>> :
    ElementT extends AnyColumn ?
    ColumnToReference<ElementT> :
    ElementT extends {
        columns : {
            [name : string] : AnyColumn
        }
    } ?
    (
        ElementT["columns"][keyof ElementT["columns"]] extends Column<infer TableNameT, any, any> ?
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
    ElementT extends Column<any, infer NameT, infer TypeT> ?
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


export type TypeNarrowCallback<
    FromBuilderT extends SelectBuilder<any>
> = (
    FromBuilderT extends SelectBuilder<infer DataT> ?
        (
            columnReferences : DataT["columnReferences"]
        ) => (
            AnyColumn
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
            AnyColumn
        ):
        never
);


export type GroupByTupleElement<ColumnReferencesT extends ColumnReferences> = (
    ColumnReferencesT[keyof ColumnReferencesT]|
    ColumnReferenceElement<ColumnReferencesT>
);
export type GroupByTupleElementToReference<ElementT extends GroupByTupleElement<any>> = (
    ElementT extends AnyColumn ?
    ColumnToReference<ElementT> :
    ElementT extends {
        columns : {
            [name : string] : AnyColumn
        }
    } ?
    (
        ElementT["columns"][keyof ElementT["columns"]] extends Column<infer TableNameT, any, any> ?
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

export type OrderByFirstComponent<ColumnReferencesT extends ColumnReferences> = (
    (Expr<
        ToPartialColumnReferences<ColumnReferencesT>,
        any
    >)|
    ColumnReferenceElement<ColumnReferencesT>
);
export type OrderByTupleElement<ColumnReferencesT extends ColumnReferences> = (
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
    join<
        ToTableT extends AliasedTable<any, any, {}>,
        FromColumnsT extends FromColumnsCallback<T["columnReferences"], Tuple<AnyColumn>>/*,
        ToColumnsT extends ToColumnsCallback<ToTableT, FromColumnsInCallback<FromColumnsT>>*/
    > (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            selectReferences : any,
            selectTuple : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            typeWidenedColumns : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : true,
                where : any,
                select : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>,
        toTable : ToTableT,
        from : FromColumnsT,
        to : ToColumnsCallback<ToTableT, FromColumnsInCallback<FromColumnsT>>
    ) : (
        TableAlias<ToTableT> extends keyof T["columnReferences"] ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                FromColumnsInCallback<FromColumnsT> extends IsFromColumnTuple<T["columnReferences"], FromColumnsInCallback<FromColumnsT>> ?
                    (
                        SelectBuilder<{
                            columnReferences : (
                                T["columnReferences"] &
                                TableReference<ToTableT>
                            ),
                            joinReferences : (
                                TuplePush<
                                    T["joinReferences"],
                                    JoinReference<
                                        TableReference<ToTableT>,
                                        false
                                    >
                                >
                            ),
                            typeNarrowedColumns : T["typeNarrowedColumns"],
                            typeWidenedColumns : T["typeWidenedColumns"],
                            selectReferences : T["selectReferences"],
                            selectTuple : T["selectTuple"],
                            groupByReferences : T["groupByReferences"],
                            orderBy : T["orderBy"],
                            limit : T["limit"],
                            union : T["union"],
                            unionOrderBy : T["unionOrderBy"],
                            unionLimit : T["unionLimit"],

                            allowed : T["allowed"],
                        }>
                    ) :
                    (IsFromColumnTuple<T["columnReferences"], FromColumnsInCallback<FromColumnsT>>|void)
            )
    );
    rightJoin<
        ToTableT extends AliasedTable<any, any, {}>,
        FromColumnsT extends FromColumnsCallback<T["columnReferences"], Tuple<AnyColumn>>/*,
        ToColumnsT extends ToColumnsCallback<ToTableT, FromColumnsInCallback<FromColumnsT>>*/
    > (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : true,
                where : any,
                select : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>,
        toTable : ToTableT,
        from : FromColumnsT,
        to : ToColumnsCallback<ToTableT, FromColumnsInCallback<FromColumnsT>>
    ) : (
        TableAlias<ToTableT> extends keyof T["columnReferences"] ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                FromColumnsInCallback<FromColumnsT> extends IsFromColumnTuple<T["columnReferences"], FromColumnsInCallback<FromColumnsT>> ?
                    (
                        SelectBuilder<{
                            columnReferences : (
                                NullableColumnReference<T["columnReferences"]> &
                                TableReference<ToTableT>
                            ),
                            joinReferences : (
                                TuplePush<
                                    NullableJoinReferences<T["joinReferences"]>,
                                    JoinReference<
                                        TableReference<ToTableT>,
                                        false
                                    >
                                >
                            ),
                            typeNarrowedColumns : T["typeNarrowedColumns"],
                            typeWidenedColumns : T["typeWidenedColumns"],
                            selectReferences : T["selectReferences"],
                            selectTuple : T["selectTuple"],
                            groupByReferences : T["groupByReferences"],
                            orderBy : T["orderBy"],
                            limit : T["limit"],
                            union : T["union"],
                            unionOrderBy : T["unionOrderBy"],
                            unionLimit : T["unionLimit"],

                            allowed : T["allowed"],
                        }>
                    ) :
                    (IsFromColumnTuple<T["columnReferences"], FromColumnsInCallback<FromColumnsT>>|void|never)
            )
    );
    leftJoin<
        ToTableT extends AliasedTable<any, any, {}>,
        FromColumnsT extends FromColumnsCallback<T["columnReferences"], Tuple<AnyColumn>>/*,
        ToColumnsT extends ToColumnsCallback<ToTableT, FromColumnsInCallback<FromColumnsT>>*/
    > (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : true,
                where : any,
                select : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>,
        toTable : ToTableT,
        from : FromColumnsT,
        to : ToColumnsCallback<ToTableT, FromColumnsInCallback<FromColumnsT>>
    ) : (
        TableAlias<ToTableT> extends keyof T["columnReferences"] ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                FromColumnsInCallback<FromColumnsT> extends IsFromColumnTuple<T["columnReferences"], FromColumnsInCallback<FromColumnsT>> ?
                    (
                        SelectBuilder<{
                            columnReferences : (
                                T["columnReferences"] &
                                NullableColumnReference<TableReference<ToTableT>>
                            ),
                            joinReferences : (
                                TuplePush<
                                    T["joinReferences"],
                                    JoinReference<
                                        TableReference<ToTableT>,
                                        true
                                    >
                                >
                            ),
                            typeNarrowedColumns : T["typeNarrowedColumns"],
                            typeWidenedColumns : T["typeWidenedColumns"],
                            selectReferences : T["selectReferences"],
                            selectTuple : T["selectTuple"],
                            groupByReferences : T["groupByReferences"],
                            orderBy : T["orderBy"],
                            limit : T["limit"],
                            union : T["union"],
                            unionOrderBy : T["unionOrderBy"],
                            unionLimit : T["unionLimit"],

                            allowed : T["allowed"],
                        }>
                    ) :
                    (IsFromColumnTuple<T["columnReferences"], FromColumnsInCallback<FromColumnsT>>|void)
            )
    );
    whereIsNotNull<
        TypeNarrowCallbackT extends TypeNarrowCallback<SelectBuilder<T>>
    > (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
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
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>,
        typeNarrowCallback : TypeNarrowCallbackT
    ) : (
        ReturnType<TypeNarrowCallbackT> extends Column<infer TableNameT, infer NameT, infer TypeT> ?
            (
                T["columnReferences"] extends ColumnToReference<ReturnType<TypeNarrowCallbackT>> ?
                    (
                        SelectBuilder<{
                            columnReferences : (
                                {
                                    [table in keyof T["columnReferences"]] : {
                                        columns : {
                                            [column in keyof T["columnReferences"][table]["columns"]] : (
                                                table extends TableNameT ?
                                                    (
                                                        column extends NameT ?
                                                            (
                                                                Column<TableNameT, NameT, Exclude<TypeT, null|undefined>>
                                                            ) :
                                                            (T["columnReferences"][table]["columns"][column])
                                                    ) :
                                                    (T["columnReferences"][table]["columns"][column])
                                            )
                                        }
                                    }
                                }
                            ),
                            joinReferences : T["joinReferences"],
                            typeNarrowedColumns : (
                                T["typeNarrowedColumns"] &
                                {
                                    [table in TableNameT] : {
                                        columns : {
                                            [column in NameT] : Column<TableNameT, NameT, Exclude<TypeT, null|undefined>>
                                        }
                                    }
                                }
                            ),
                            typeWidenedColumns : T["typeWidenedColumns"],
                            selectReferences : T["selectReferences"],
                            selectTuple : T["selectTuple"],
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
                    ("ColumnT is not in ColumnReferences"|void|never)
            ) :
            ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
    whereIsNull<
        TypeNarrowCallbackT extends TypeNarrowCallback<SelectBuilder<T>>
    > (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
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
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>,
        typeNarrowCallback : TypeNarrowCallbackT
    ) : (
        ReturnType<TypeNarrowCallbackT> extends Column<infer TableNameT, infer NameT, infer TypeT> ?
            (
                T["columnReferences"] extends ColumnToReference<ReturnType<TypeNarrowCallbackT>> ?
                    (
                        SelectBuilder<{
                            columnReferences : (
                                {
                                    [table in keyof T["columnReferences"]] : {
                                        columns : {
                                            [column in keyof T["columnReferences"][table]["columns"]] : (
                                                table extends TableNameT ?
                                                    (
                                                        column extends NameT ?
                                                            (
                                                                Column<TableNameT, NameT, null>
                                                            ) :
                                                            (T["columnReferences"][table]["columns"][column])
                                                    ) :
                                                    (T["columnReferences"][table]["columns"][column])
                                            )
                                        }
                                    }
                                }
                            ),
                            joinReferences : T["joinReferences"],
                            typeNarrowedColumns : (
                                T["typeNarrowedColumns"] &
                                {
                                    [table in TableNameT] : {
                                        columns : {
                                            [column in NameT] : Column<TableNameT, NameT, null>
                                        }
                                    }
                                }
                            ),
                            typeWidenedColumns : T["typeWidenedColumns"],
                            selectReferences : T["selectReferences"],
                            selectTuple : T["selectTuple"],
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
                    ("ColumnT is not in ColumnReferences"|void|never)
            ) :
            ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
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
        ReturnType<TypeNarrowCallbackT> extends Column<infer TableNameT, infer NameT, infer TypeT> ?
            (
                T["columnReferences"] extends ColumnToReference<ReturnType<TypeNarrowCallbackT>> ?
                    (
                        SelectBuilder<{
                            columnReferences : (
                                {
                                    [table in keyof T["columnReferences"]] : {
                                        columns : {
                                            [column in keyof T["columnReferences"][table]["columns"]] : (
                                                table extends TableNameT ?
                                                    (
                                                        column extends NameT ?
                                                            (
                                                                Column<TableNameT, NameT, ConstT>
                                                            ) :
                                                            (T["columnReferences"][table]["columns"][column])
                                                    ) :
                                                    (T["columnReferences"][table]["columns"][column])
                                            )
                                        }
                                    }
                                }
                            ),
                            joinReferences : T["joinReferences"],
                            typeNarrowedColumns : (
                                T["typeNarrowedColumns"] &
                                {
                                    [table in TableNameT] : {
                                        columns : {
                                            [column in NameT] : Column<TableNameT, NameT, ConstT>
                                        }
                                    }
                                }
                            ),
                            typeWidenedColumns : T["typeWidenedColumns"],
                            selectReferences : T["selectReferences"],
                            selectTuple : T["selectTuple"],
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
                    ("ColumnT is not in ColumnReferences"|void|never)
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
                SelectBuilder<{
                    columnReferences : T["columnReferences"],
                    joinReferences : T["joinReferences"],
                    typeNarrowedColumns : T["typeNarrowedColumns"],
                    typeWidenedColumns : T["typeWidenedColumns"],
                    selectReferences : SelectTupleToReference<ReturnType<SelectCallbackT>>,
                    selectTuple : ReturnType<SelectCallbackT>,
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
        ReturnType<TypeWidenCallbackT> extends Column<infer TableNameT, infer NameT, infer TypeT> ?
            (
                T["columnReferences"] extends ColumnToReference<ReturnType<TypeWidenCallbackT>> ?
                    (
                        SelectBuilder<{
                            columnReferences : T["columnReferences"],
                            joinReferences : T["joinReferences"],
                            typeNarrowedColumns : T["typeNarrowedColumns"],
                            typeWidenedColumns : (
                                T["typeWidenedColumns"] &
                                {
                                    [table in TableNameT] : {
                                        columns : {
                                            [column in NameT] : Column<TableNameT, NameT, TypeT|WidenT>
                                        }
                                    }
                                }
                            ),
                            selectReferences : (
                                {
                                    [table in keyof T["selectReferences"]] : {
                                        columns : {
                                            [column in keyof T["selectReferences"][table]["columns"]] : (
                                                table extends TableNameT ?
                                                    (
                                                        column extends NameT ?
                                                            (
                                                                Column<TableNameT, NameT, TypeT|WidenT>
                                                            ) :
                                                            (T["selectReferences"][table]["columns"][column])
                                                    ) :
                                                    (T["selectReferences"][table]["columns"][column])
                                            )
                                        }
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
                    ("ColumnT is not in ColumnReferences"|void|never)
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
                                    ("ColumnT is not in ColumnReferences"|void|never)
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
            distinct : false,
            //Only allow the below clauses after the SELECT clause
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

f.data.columnReferences.app.columns.appId
f.data.joinReferences[0].columnReferences.app.columns.appId
f.data.joinReferences[0].nullable
f.data.columnReferences.appKey.columns.appId
f.data.joinReferences[1].columnReferences.appKey.columns.appId
f.data.joinReferences[1].nullable
f.data.columnReferences.ssoClient.columns.ssoClientId
f.data.joinReferences[2].columnReferences.ssoClient.columns.ssoClientId
f.data.joinReferences[2].nullable
f.data.columnReferences.user.columns.appId
f.data.joinReferences[3].columnReferences.user.columns.appId
f.data.joinReferences[3].nullable

/*
    Expressions can be,

    + Constants (e.g. 1, 2, true, false, null, "hello, world!", new Date())
    + Columns
    + Other Expr<> instances
*/
type AllowedExprConstants = number|string|boolean|Date|null|undefined;
type RawExpr<TypeT> = (
    (
        //TODO `undefined` constant should be mapped to `null`
        TypeT extends AllowedExprConstants ?
            TypeT :
            never
    )|
    Expr<any, TypeT>|
    Column<any, any, TypeT>|
    SelectBuilder<{
        columnReferences : any,
        joinReferences : any,
        typeNarrowedColumns : any,
        selectReferences : any,
        selectTuple : Tuple<JoinableSelectTupleElement<any>> & {
            length : 1
        },
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
            groupBy : any,
            having : any,
            orderBy : any,
            limit : any,
            //OFFSET only allowed after LIMIT
            offset : any,
            widen : any,

            union : any,
        }
    }>
);
type ExprUsedColumns<RawExprT extends RawExpr<any>> = (
    RawExprT extends SelectBuilder<any> ?
    {} :
    RawExprT extends AllowedExprConstants ?
    {} :
    RawExprT extends Column<infer TableNameT, infer NameT, infer TypeT> ?
    {
        [table in TableNameT] : {
            columns : {
                [name in NameT] : Column<TableNameT, NameT, TypeT>
            }
        }
    } :
    RawExprT extends Expr<infer UsedColumnsT, any> ?
    UsedColumnsT :
    never//("Invalid RawExprT or could not infer used columns"|void|never)
);
type ExprType<RawExprT extends RawExpr<any>> = (
    RawExprT extends AllowedExprConstants ?
    RawExprT :
    RawExprT extends Column<any, any, infer TypeT> ?
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
    .whereIsNotNull(c => c.app.columns.appId)
    .whereIsEqual(3, c => c.app.columns.appId)
    //.whereIsNull(c => c.app.columns.appId)
    .where((c) => {
        return e.eq(1,c.app.columns.appId);
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
function foo () {
    const subE = e.identity(from(app).select(c => [app.columns.name]));
    const f = from(app)
        .join(appKey, c => [c.app.columns.appId], t => [t.appId])
        .leftJoin(ssoClient, c => [c.app.columns.ssoClientId],  t => [t.ssoClientId])
        .join(
            from(app)
                .select(c => [c.app.columns.webhookKey, e.true().as("subexpr")])
                .as("subqueryTable"),
            c => [c.app.columns.webhookKey],
            t => [t.webhookKey]
        )
        .whereIsNotNull(c => c.app.columns.ssoApiKey)
        .where(c => {
            c.subqueryTable.columns.subexpr
            return e.eq(c.app.columns.appId, 5);
        })
        .select((c) => {
            return [
                //c.app.columns.ssoApiKey.as("aliased"),
                c.app,
                c.ssoClient.columns.name,
                e.true().as("something"),
                //e.eq(c.app.columns.ssoApiKey,"2").as("eq"),
                //c.ssoClient.columns.initializeAfterAuthenticationEndpoint
            ]
        })
        .groupBy((s) => {
            return [
                s.ssoClient.columns.initializeAfterAuthenticationEndpoint
            ];
        })
        .having((s) => {
            return e.eq(s.__expr.columns.something, true);
        })
        .orderBy((s) => {
            return [
                //s.__expr.columns.aliased,
                [s.app.columns.name, true],
                [s.ssoClient.columns.authenticationEndpoint, false],
                e.eq(s.app.columns.appId, 1),
                [e.eq(s.app.columns.appId, 1), true]
            ]
        })
        .limit(5)
        .offset(4)
        .widen(s => s.app.columns.ssoApiKey, sd.nil())
        .widen(s => s.ssoClient.columns.name, sd.number())
        .union(
            from(app)
                .select((s) => {
                    return [
                        s.app,
                        s.app.columns.appId,
                        e.true().as("test")
                    ]
                })
        )
        .union(
            from(app)
                .select((s) => {
                    return [
                        s.app,
                        s.app.columns.appId,
                        e.true().as("test3")
                    ]
                })
        )
        .orderBy((s) => {
            return [e.true()]
        })
        .limit(30)
        .offset(56);
    f.data
}
foo();
