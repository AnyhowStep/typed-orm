import * as sd from "schema-decorator";

export type Tuple<T> = T[] & { "0" : T };
export type IsSingletonTuple<TupleT extends Tuple<any>> = (
    TupleT extends {"1":any} ?
        false :
        true
);

export interface Column<TableNameT extends string, NameT extends string, TypeT> {
    table : TableNameT;
    name  : NameT;
    assertDelegate : sd.AssertDelegate<TypeT>;
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


export type Pk<RawColumnCollectionT extends RawColumnCollection> = (
    (keyof RawColumnCollectionT)[] & { "0" : keyof RawColumnCollectionT }
);

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


export class Table<
    NameT extends string,
    RawColumnCollectionT extends RawColumnCollection,
    PkT extends Pk<RawColumnCollectionT>,
    AutoIncrementT extends undefined|(PkT extends Array<infer E> ? E : never)
> implements AliasedTable<NameT, NameT, RawColumnCollectionT> {
    public readonly alias  : NameT;
    public readonly name   : NameT;
    public readonly columns : {
        [name in keyof RawColumnCollectionT] : Column<NameT, name, TypeOf<RawColumnCollectionT[name]>>
    };
    public readonly pk : PkT;
    public readonly autoIncrement : AutoIncrementT;
    public constructor (name : NameT, columns : RawColumnCollectionT, pk : PkT, autoIncrement : AutoIncrementT) {
        this.alias = name;
        this.name  = name;
        this.columns = toColumns(name, columns);
        this.pk = pk;
        this.autoIncrement = autoIncrement;
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


const ssoClient = new Table(
    "ssoClient",
    {
        ssoClientId : sd.stringToNumber(),
        name : sd.string(),
        authenticationEndpoint : sd.string(),
        initializeAfterAuthenticationEndpoint : sd.nullable(sd.string()),
    },
    ["ssoClientId"],
    "ssoClientId"
);

const app = new Table(
    "app",
    {
        appId : sd.stringToNumber(),
        name : sd.string(),
        ssoClientId : ssoClient.columns.ssoClientId,
        ssoApiKey : sd.nullable(sd.string()),
        webhookKey : sd.nullable(sd.string())
    },
    ["appId"],
    "appId"
);

const appKey = new Table(
    "appKey",
    {
        appId : sd.stringToNumber(),
        appKeyId : sd.string(),
        appKeyTypeId : sd.number(),
        key : sd.string(),
    },
    ["appKeyId"],
    "appKeyId"
);
const appKeyType = new Table(
    "appKeyType",
    {
        appKeyTypeId : sd.string(),
        internalName : sd.string(),
    },
    ["appKeyTypeId"],
    "appKeyTypeId"
);

const user = new Table(
    "user",
    {
        appId : sd.naturalNumber(),
        externalUserId : sd.string(),
        createdAt : sd.date(),
    },
    ["appId", "externalUserId"],
    undefined
);
///////////////////////////////////

type ColumnType<ColumnT extends AnyColumn> = (
    ColumnT extends Column<any, any, infer T> ?
    T :
    never
);

type TableAlias<TableT extends AnyAliasedTable> = (
    TableT extends Table<infer Name, any, any, any> ?
    Name :
    TableT extends AliasedTable<infer Alias, any, {}> ?
    Alias :
    never
);
type TableName<TableT extends AnyAliasedTable> = (
    TableT extends Table<infer Name, any, any, any> ?
    Name :
    TableT extends AliasedTable<any, infer Name, any> ?
    Name :
    never
);
type TableColumns<TableT extends AnyAliasedTable> = (
    TableT extends Table<any, infer Columns, any, any> ?
    Columns :
    TableT extends AliasedTable<any, any, infer Columns> ?
    Columns :
    never
);

///////////////////////////////////

type TableReferences = {
    //[table : string] : AliasedTable<any, any, {}>
    [table : string] : {
        columns : {
            [column : string] : AnyColumn
        }
    }
};
type TableReferencesIndexable = {
    //[table : string] : AliasedTable<any, any, any>
    [table : string] : {
        columns : {
            [column : string] : AnyColumn
        }
    }
};
type ColumnReferences = {
    [table : string] : {
        columns : {
            [column : string] : AnyColumn
        }
    }
};

type IsFromColumn<
    TableReferencesT extends TableReferencesIndexable,
    ColumnT extends AnyColumn
> = (
    ColumnT extends Column<infer AliasT, infer NameT, infer TypeT> ?
        (
            AliasT extends keyof TableReferencesT ?
                (
                    NameT extends keyof TableReferencesT[AliasT]["columns"] ?
                        (
                            TypeT extends sd.TypeOf<TableReferencesT[AliasT]["columns"][NameT]["assertDelegate"]> ?
                                (
                                    sd.TypeOf<TableReferencesT[AliasT]["columns"][NameT]["assertDelegate"]> extends TypeT ?
                                        (ColumnT) :
                                        ("TypeT mismatch B"|sd.TypeOf<TableReferencesT[AliasT]["columns"][NameT]["assertDelegate"]>|void)
                                ) :
                                ("TypeT mismatch A"|TypeT|void)
                        ) :
                        ("NameT is not a column"|NameT|void)
                ) :
                ("AliasT is not a table reference"|AliasT|void)
        ) :
        ("Could not infer alias, name, or type from ColumnT"|ColumnT|void)
);
type IsFromColumnTuple<
    TableReferencesT extends TableReferences,
    FromColumnsT extends Tuple<AnyColumn>
> = (
    FromColumnsT extends {"1":AnyColumn} ?
    [IsFromColumn<TableReferencesT, FromColumnsT[0]>, IsFromColumn<TableReferencesT, FromColumnsT[1]>] :
    FromColumnsT extends {"0":AnyColumn} ?
    [IsFromColumn<TableReferencesT, FromColumnsT[0]>] :
    never
);

type ToColumn<
    TableT extends AliasedTable<any, any, {}>,
    FromColumnT extends AnyColumn
> = (
    Column<TableAlias<TableT>, keyof TableColumns<TableT>, ColumnType<FromColumnT>>
);
type ToColumnTuple<
    TableT extends AliasedTable<any, any, {}>,
    FromColumnsT extends Tuple<AnyColumn>
> = (
    FromColumnsT extends {"1":AnyColumn} ?
    [ToColumn<TableT, FromColumnsT[0]>, ToColumn<TableT, FromColumnsT[1]>] :
    FromColumnsT extends {"0":AnyColumn} ?
    [ToColumn<TableT, FromColumnsT[0]>] :
    never
);

type ImplicitToColumn<
    TableT extends AliasedTable<any, any, {}>,
    FromColumnT extends AnyColumn
> = (
    Column<any, keyof TableColumns<TableT>, ColumnType<FromColumnT>>
);
type ImplicitToColumnTuple<
    TableT extends AliasedTable<any, any, {}>,
    FromColumnsT extends Tuple<AnyColumn>
> = (
    FromColumnsT extends {"1":AnyColumn} ?
    [ImplicitToColumn<TableT, FromColumnsT[0]>, ImplicitToColumn<TableT, FromColumnsT[1]>] :
    FromColumnsT extends {"0":AnyColumn} ?
    [ImplicitToColumn<TableT, FromColumnsT[0]>] :
    never
);

type TableReferencesBuilder<
    TableReferencesT extends TableReferences
> = {
    data : TableReferencesT,
    join<
        ToTableT extends AliasedTable<any, any, {}>,
        FromColumnsT extends Tuple<AnyColumn>,
        ToColumnsT extends ToColumnTuple<ToTableT, FromColumnsT>
    > (
        toTable : ToTableT,
        from : FromColumnsT,
        to : ToColumnsT
    ) : (
        TableAlias<ToTableT> extends keyof TableReferencesT ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                FromColumnsT extends IsFromColumnTuple<TableReferencesT, FromColumnsT> ?
                    (
                        TableReferencesBuilder<
                            TableReferencesT &
                            {
                                [alias in TableAlias<ToTableT>] : AliasedTable<
                                    alias,
                                    TableName<ToTableT>,
                                    TableColumns<ToTableT>
                                >
                            }
                        >
                    ) :
                    (IsFromColumnTuple<TableReferencesT, FromColumnsT>|void)
            )
    ),
    join<
        ToTableT extends AliasedTable<any, any, {}>,
        FromColumnsT extends Tuple<AnyColumn>
    > (
        toTable : ToTableT,
        from : FromColumnsT
    ) : (
        TableAlias<ToTableT> extends keyof TableReferencesT ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                FromColumnsT extends IsFromColumnTuple<TableReferencesT, FromColumnsT> ?
                    (
                        FromColumnsT extends ImplicitToColumnTuple<ToTableT, FromColumnsT> ?
                            (
                                TableReferencesBuilder<
                                    TableReferencesT &
                                    {
                                        [alias in TableAlias<ToTableT>] : AliasedTable<
                                            alias,
                                            TableName<ToTableT>,
                                            TableColumns<ToTableT>
                                        >
                                    }
                                >
                            ) :
                            ("ToTableT does not have columns of FromColumnsT"|void)
                    ) :
                    (IsFromColumnTuple<TableReferencesT, FromColumnsT>|void)
            )
    )
};


interface SelectColumnExpr<
    ColumnReferencesT extends ColumnReferences,
    TypeT,
    ExtraInfoT extends ExprExtraInfo,

    TableNameT extends string,
    NameT extends string
> extends Expr<ColumnReferencesT, TypeT, ExtraInfoT>, Column<TableNameT, NameT, TypeT> {

};

type ExprExtraInfo = {
    isGroupFunction : boolean,
    hasGroupFunction : boolean,
}
type Expr<
    ColumnReferencesT extends ColumnReferences,
    TypeT,
    ExtraInfoT extends ExprExtraInfo
> = (
    {
        columnReferences : ColumnReferencesT,
        _dummyType? : TypeT,
        extraInfo : ExtraInfoT,

        as<AliasT extends string>(alias : AliasT) : SelectColumnExpr<
            ColumnReferencesT,
            TypeT,
            ExtraInfoT,
            "__expr",
            AliasT
        >;
    }
);


/*
    SelectColumn types
    + Column of table references
    + Aliased expressions (function calls, constants, subqueries)
        + Use table references
*/


type InSelectExpr = (
    AnyColumn|SelectColumnExpr<{}, any, any, any, any>
);

type TableReference<TableT extends Table<any, {}, any, any>|AnyAliasedTable> = (
    TableT extends Table<any, infer ColumnsT, any, any> ?
    {
        [alias in TableAlias<TableT>] : {
            columns : {
                [name in keyof ColumnsT] : TableT["columns"][name]
            }
        }
        //AliasedTable<alias, TableName<TableT>, TableColumns<TableT>>
        /*{
            columns : {
                [name in keyof TableT["columns"]] : TableT["columns"][name]
            }
        }*/
    } :
    TableT extends AliasedTable<any, any, infer ColumnsT> ?
    {
        [alias in TableAlias<TableT>] : {
            columns : {
                [name in keyof ColumnsT] : TableT["columns"][name]
            }
        }
        //AliasedTable<alias, TableName<TableT>, TableColumns<TableT>>
        /*{
            columns : {
                [name in keyof TableT["columns"]] : TableT["columns"][name]
            }
        }*/
    } :
    never
    /*{
        [alias in TableAlias<TableT>] : {
            columns : {
                [name in keyof TableT["columns"]] : TableT["columns"][name]
            }
        }
        //AliasedTable<alias, TableName<TableT>, TableColumns<TableT>>
        /*{
            columns : {
                [name in keyof TableT["columns"]] : TableT["columns"][name]
            }
        }*/
    //}
);

declare class SelectBuilder<
    RequiredColumnReferencesT extends ColumnReferences,
    OutputColumnReferencesT extends ColumnReferences,
    OutputIsSingleton extends boolean,
    OutputSingletonT,

    HasFromClauseT extends boolean,
    TableReferencesT extends TableReferences,
    TableReferencesFulfillsRequiredColumnReferencesT extends boolean,

    WhereT extends Expr<
        any,
        boolean,
        {
            isGroupFunction : false,
            hasGroupFunction : false,
        }
    >|undefined = undefined,
    GroupByT extends ColumnReferences|undefined = undefined,
    HavingT extends Expr<
        any,
        boolean,
        {
            isGroupFunction : boolean,
            hasGroupFunction : boolean,
        }
    >|undefined = undefined,
    OrderByT extends Tuple<[AnyColumn, boolean]>|undefined = undefined,
    LimitT extends {
        start : number,
        count? : number,
    }|undefined = undefined
> {
    data : {
        requiredColumnReferences : RequiredColumnReferencesT,
        outputColumnReferences : OutputColumnReferencesT,
        outputIsSingleton : OutputIsSingleton,
        outputSingleton : OutputSingletonT,

        hasFromClause : HasFromClauseT,
        tableReferences : TableReferencesT,
        tableReferencesFulfillsRequiredColumnReferences : TableReferencesFulfillsRequiredColumnReferencesT,

        where : WhereT,

        groupBy : GroupByT,
        having : HavingT,
        orderBy : OrderByT,

        limit : LimitT
    };
    from<TableT extends AliasedTable<any, any, {}>> (
        this : SelectBuilder<
            any,
            any,
            boolean,
            any,

            false,
            any,
            boolean
        >,
        table : TableT
    ) : (
        SelectBuilder<
            RequiredColumnReferencesT,
            OutputColumnReferencesT,
            OutputIsSingleton,
            OutputSingletonT,

            true,
            TableReferencesT & TableReference<TableT>,
            ((TableReferencesT & TableReference<TableT>) extends RequiredColumnReferencesT ? true : "wtf"&false)
        >
    );
    join<
        ToTableT extends AliasedTable<any, any, {}>,
        FromColumnsT extends Tuple<AnyColumn>
    > (
        this : SelectBuilder<
            any,
            any,
            boolean,
            any,

            true,
            any,
            boolean
        >,
        toTable : ToTableT,
        from : FromColumnsT
    ) : (
        TableAlias<ToTableT> extends keyof TableReferencesT ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                FromColumnsT extends IsFromColumnTuple<TableReferencesT, FromColumnsT> ?
                    (
                        FromColumnsT extends ImplicitToColumnTuple<ToTableT, FromColumnsT> ?
                            (
                                SelectBuilder<
                                    RequiredColumnReferencesT,
                                    OutputColumnReferencesT,
                                    OutputIsSingleton,
                                    OutputSingletonT,

                                    HasFromClauseT,
                                    TableReferencesT & TableReference<ToTableT>,
                                    ((TableReferencesT & TableReference<ToTableT>) extends RequiredColumnReferencesT ? true : false)
                                >
                            ) :
                            ("ToTableT does not have columns of FromColumnsT"|void)
                    ) :
                    (IsFromColumnTuple<TableReferencesT, FromColumnsT>|void)
            )
    );
    join<
        ToTableT extends AliasedTable<any, any, {}>,
        FromColumnsT extends Tuple<AnyColumn>,
        ToColumnsT extends ToColumnTuple<ToTableT, FromColumnsT>
    > (
        this : SelectBuilder<
            any,
            any,
            boolean,
            any,

            true,
            any,
            boolean
        >,
        toTable : ToTableT,
        from : FromColumnsT,
        to : ToColumnsT
    ) : (
        TableAlias<ToTableT> extends keyof TableReferencesT ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                FromColumnsT extends IsFromColumnTuple<TableReferencesT, FromColumnsT> ?
                    (
                        SelectBuilder<
                            RequiredColumnReferencesT,
                            OutputColumnReferencesT,
                            OutputIsSingleton,
                            OutputSingletonT,

                            HasFromClauseT,
                            TableReferencesT & TableReference<ToTableT>,
                            ((TableReferencesT & TableReference<ToTableT>) extends RequiredColumnReferencesT ? true : false)
                        >
                    ) :
                    (IsFromColumnTuple<TableReferencesT, FromColumnsT>|void)
            )
    );
    where<
        WhereCallbackT extends WhereCallback<
            SelectBuilder<
                {},
                {},
                boolean,
                any,

                true,
                TableReferencesT,
                true
            >,
            any
        >
    > (
        this : SelectBuilder<
            any,
            any,
            boolean,
            any,

            true,
            any,
            true
        >,
        whereCallback : WhereCallbackT
    ) : (
        WhereCallbackT extends WhereCallback<any, infer ExprT> ?
            (
                TableReferencesT extends ExprRequiredColumns<ExprT> ?
                    (
                        SelectBuilder<
                            RequiredColumnReferencesT & ExprRequiredColumns<ExprT>,
                            OutputColumnReferencesT,
                            OutputIsSingleton,
                            OutputSingletonT,

                            HasFromClauseT,
                            TableReferencesT,
                            TableReferencesFulfillsRequiredColumnReferencesT,

                            Expr<
                                ExprRequiredColumns<ExprT>,
                                boolean,
                                {
                                    isGroupFunction : false,
                                    hasGroupFunction : false,
                                }
                            >
                        >
                    ) :
                    ("WHERE clause uses columns not in TableReferencesT"|ExprRequiredColumns<ExprT>|void)
            ) :
            ("Invalid WHERE clause; or could not infer ExprT"|void)
    );
    select<
        SelectExprListT extends Tuple<InSelectExpr>,
    > (
        selectExprList : SelectExprListT
    ) : (
        SelectBuilder<
            RequiredColumnReferences<SelectExprListT>,
            OutputColumnReferences<SelectExprListT>,
            IsSingletonTuple<SelectExprListT>,
            (
                SelectExprListT extends {"1":any} ?
                never :
                SelectExprListT[0] extends Column<any, any, infer TypeT> ?
                TypeT :
                SelectExprListT[0] extends SelectColumnExpr<any, infer TypeT, any, any, any> ?
                TypeT :
                never
            ),

            false,
            TableReferencesT,
            (TableReferencesT extends RequiredColumnReferences<SelectExprListT> ? true : false)
        >
    );
};

type ExprRequiredColumns<ExprT extends Expr<{}, any, any>> = (
    ExprT extends Expr<infer RequiredT, any, any> ?
    RequiredT :
    ExprT extends Expr<any, any, any> ?
    {} :
    //HACK This should be the correct result but I've seen that {} ends up not getting inferred...
    //("Could not infer required columns"|void) :
    "Invalid ExprT"|void
);

type WhereCallback<
    SelectBuilderT extends SelectBuilder<
        any,
        any,
        boolean,
        any,

        true,
        any,
        true
    >,
    ExprT extends Expr<
        {},
        boolean,
        {
            isGroupFunction : false,
            hasGroupFunction : false,
        }
    >
> = (
    (selectBuilder : SelectBuilderT) => ExprT
);

type RequiredColumnReference<
    SelectExprT extends InSelectExpr
> = (
    SelectExprT extends SelectColumnExpr<infer ColumnReferencesT, any, any, any, any> ?
    ColumnReferencesT :
    SelectExprT extends Column<infer TableNameT, infer NameT, infer TypeT> ?
    {
        [table in TableNameT] : {
            columns : {
                [name in NameT] : SelectExprT
            }
        }
    } :
    "Invalid SelectExprT"|void|never
);
type RequiredColumnReferences<
    SelectExprListT extends Tuple<InSelectExpr>
> = (
    (SelectExprListT extends {"1":InSelectExpr} ? RequiredColumnReference<SelectExprListT["1"]> : {}) &
    (SelectExprListT extends {"0":InSelectExpr} ? RequiredColumnReference<SelectExprListT["0"]> : {})
);
type OutputColumnReference<
    SelectExprT extends InSelectExpr
> = (
    SelectExprT extends SelectColumnExpr<any, infer TypeT, any, infer TableNameT, infer NameT> ?
    {
        [table in TableNameT] : {
            columns : {
                [name in NameT] : Column<TableNameT, NameT, TypeT>
            }
        }
    } :
    SelectExprT extends Column<infer TableNameT, infer NameT, infer TypeT> ?
    {
        [table in TableNameT] : {
            columns : {
                [name in NameT] : SelectExprT
            }
        }
    } :
    "Invalid SelectExprT"|void|never
);
type OutputColumnReferences<
    SelectExprListT extends Tuple<InSelectExpr>
> = (
    (SelectExprListT extends {"1":InSelectExpr} ? OutputColumnReference<SelectExprListT["1"]> : {}) &
    (SelectExprListT extends {"0":InSelectExpr} ? OutputColumnReference<SelectExprListT["0"]> : {})
);
export type Db = {
    from<TableT extends AliasedTable<any, any, {}>> (
        table : TableT
    ) : TableReferencesBuilder<{
        [alias in TableAlias<TableT>] : AliasedTable<
            alias,
            TableName<TableT>,
            TableColumns<TableT>
        >
    }>,
    select<
        SelectExprListT extends Tuple<InSelectExpr>,
    > (
        selectExprList : SelectExprListT
    ) : (
        SelectBuilder<
            RequiredColumnReferences<SelectExprListT>,
            OutputColumnReferences<SelectExprListT>,
            IsSingletonTuple<SelectExprListT>,
            (
                SelectExprListT extends {"1":any} ?
                never :
                SelectExprListT[0] extends Column<any, any, infer TypeT> ?
                TypeT :
                SelectExprListT[0] extends SelectColumnExpr<any, infer TypeT, any, any, any> ?
                TypeT :
                never
            ),

            false,
            {},
            ({} extends RequiredColumnReferences<SelectExprListT> ? true : false)
        >
    );
    /*selectQwerty<
        ColumnsT extends Tuple<AnyColumn>,
        TableReferencesT extends TableReferences,
        WhereCallbackT extends WhereCallback<{}, TableReferencesT>
    > (
        columns : ColumnsT,
        tableReferences : TableReferencesBuilder<TableReferencesT>,
        whereCallback : WhereCallbackT
    ) : (
        WhereCallbackT extends WhereCallback<infer ColumnReferencesT, any> ?
            (
                TableReferencesT extends ColumnReferencesT ?
                    (
                        SelectBuilder<

                        >
                    ) :
                    ("WhereCallbackT uses columns not in TableReferencesT"|void)
            ) :
            ("Invalid WhereCallbackT"|void)
    )*/
};

declare function constTrue () : Expr<{}, true, { isGroupFunction:false, hasGroupFunction:false }>;
declare function constNum (x : number) : Expr<{}, number, { isGroupFunction:false, hasGroupFunction:false }>;
declare function constStr (x : string) : Expr<{}, string, { isGroupFunction:false, hasGroupFunction:false }>;
declare function columnExpr<
    ColumnT extends AnyColumn
> (
    column : ColumnT
) : (
    ColumnT extends Column<infer TableName, infer Name, infer TypeT> ?
        Expr<
            RequiredColumnReferences<[ColumnT]>,
            TypeT,
            { isGroupFunction:false, hasGroupFunction:false }
        > :
        "Invalid ColumnT"|void
);
declare function gt<
    LeftT extends Expr<{}, number, { isGroupFunction : boolean, hasGroupFunction : boolean }>,
    RightT extends Expr<{}, number, { isGroupFunction : boolean, hasGroupFunction : boolean }>
> (
    left : LeftT,
    right : RightT
) : (
    LeftT extends Expr<infer LeftRequired, any, infer LeftInfo> ?
        (
            RightT extends Expr<infer RightRequired, any, infer RightInfo> ?
                (
                    Expr<
                        LeftRequired & RightRequired,
                        boolean,
                        {
                            isGroupFunction:false,
                            hasGroupFunction: (
                                LeftInfo["isGroupFunction"] extends true ?
                                true :
                                LeftInfo["hasGroupFunction"] extends true ?
                                true :
                                RightInfo["isGroupFunction"] extends true ?
                                true :
                                RightInfo["hasGroupFunction"] extends true ?
                                true :
                                false
                            )
                        }
                    >
                ) :
                ("Invalid right expression"|void)
        ) :
        ("Invalid left expression"|void)
);
declare function eq<
    TypeT,
    LeftT extends Expr<ColumnReferences, TypeT, { isGroupFunction : boolean, hasGroupFunction : boolean }>,
    RightT extends Expr<ColumnReferences, TypeT, { isGroupFunction : boolean, hasGroupFunction : boolean }>
> (
    left : LeftT,
    right : RightT
) : (
    LeftT extends Expr<infer LeftRequired, any, infer LeftInfo> ?
        (
            RightT extends Expr<infer RightRequired, any, infer RightInfo> ?
                (
                    Expr<
                        LeftRequired & RightRequired,
                        boolean,
                        {
                            isGroupFunction:false,
                            hasGroupFunction: (
                                LeftInfo["isGroupFunction"] extends true ?
                                true :
                                LeftInfo["hasGroupFunction"] extends true ?
                                true :
                                RightInfo["isGroupFunction"] extends true ?
                                true :
                                RightInfo["hasGroupFunction"] extends true ?
                                true :
                                false
                            )
                        }
                    >
                ) :
                ("Invalid right expression"|void)
        ) :
        ("Invalid left expression"|void)
);
declare function selectExpr<
    SelectBuilderT extends SelectBuilder<
        any,
        any,
        true,
        any,

        boolean,
        any,
        true,

        any,
        any,
        any,
        any,
        any
    >
> (
    selectBuilder : SelectBuilderT
) : (
    SelectBuilderT extends SelectBuilder<
        any,
        any,
        true,
        infer TypeT,

        boolean,
        any,
        true,

        any,
        any,
        any,
        any,
        any
    > ?
        (
            Expr<
                {},
                boolean,//TypeT,
                {
                    isGroupFunction:false,
                    hasGroupFunction: false
                }
            >
        ) :
        ("Could not infer TypeT of SELECT statement"|never)
);
declare const db : Db;

const f = db.from(app)
    .join(
        appKey,
        [app.columns.appId]
    )

const result = db.select([
    app.columns.appId,//constTrue().as("test"),
]).from(app)
//.join(appKey, [app.columns.appId])
.where((s) => {
    /*
        WHERE
            (SELECT name FROM ssoClient WHERE ssoClient.ssoClientId = app.ssoClient) = 'test'
        -------
        s.select([
            ssoClient.columns.ssoClientId
        ]).from(ssoClient)
        .where(() => {
            return eq(ssoClient.columns.ssoClientId, app.columns.ssoClientId)
        })
    */
    //return constTrue();
    return eq(
        selectExpr(s.select([ssoClient.columns.name])
            .from(ssoClient)
            .where((_s) => {
                return eq(columnExpr(ssoClient.columns.name), columnExpr(app.columns.name));
            })),
        constStr("teset")
    );
    //return gt(columnExpr(app.columns.ssoClientId), constNum(2));
})
//.join(ssoClient, [app.columns.name], [ssoClient.columns.authenticationEndpoint]);
