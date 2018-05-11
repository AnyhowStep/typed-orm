import * as sd from "schema-decorator";
import {Simplify, Tuple, TupleKeys, TupleLength, TuplePush} from "./Tuple";

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


const ssoClient = new Table(
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

const app = new Table(
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

const appKey = new Table(
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
const appKeyType = new Table(
    "appKeyType",
    {
        appKeyTypeId : sd.string(),
        internalName : sd.string(),
    }/*,
    ["appKeyTypeId"],
    "appKeyTypeId"*/
);

const user = new Table(
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
        ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
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

type TableReference<TableT extends Table<any, {}>|AnyAliasedTable> = (
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
    } & { length : TupleLength<FromColumnsT> } & AnyColumn[]
);

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

export type AnyFromBuilderData = {
    columnReferences : ColumnReferences,
    joinReferences : JoinReferences,

    hasWhereClause : boolean,
    typeNarrowedColumns : ColumnReferences,
}

interface SelectColumnExpr<
    UsedReferencesT extends PartialColumnReferences,
    TypeT,

    TableNameT extends string,
    NameT extends string
> extends Expr<UsedReferencesT, TypeT>, Column<TableNameT, NameT, TypeT> {

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
    FromBuilderT extends FromBuilder<any>
> = (
    FromBuilderT extends FromBuilder<infer DataT> ?
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

export type TypeNarrowCallback<
    FromBuilderT extends FromBuilder<any>
> = (
    FromBuilderT extends FromBuilder<infer DataT> ?
        (
            columnReferences : DataT["columnReferences"]
        ) => (
            AnyColumn
        ):
        never
);

export declare class FromBuilder<T extends AnyFromBuilderData> {
    data : T;
    join<
        ToTableT extends AliasedTable<any, any, {}>,
        FromColumnsT extends ColumnReferenceTuple<T["columnReferences"]>,
        ToColumnsT extends ToColumnTuple<ToTableT, FromColumnsT>
    > (
        this : FromBuilder<{
            columnReferences : any,
            joinReferences : any,
            hasWhereClause : false,
            typeNarrowedColumns : any,
        }>,
        toTable : ToTableT,
        from : FromColumnsT,
        to : ToColumnsT
    ) : (
        TableAlias<ToTableT> extends keyof T["columnReferences"] ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                FromColumnsT extends IsFromColumnTuple<T["columnReferences"], FromColumnsT> ?
                    (
                        FromBuilder<{
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
                            hasWhereClause : T["hasWhereClause"],
                            typeNarrowedColumns : T["typeNarrowedColumns"]
                        }>
                    ) :
                    (IsFromColumnTuple<T["columnReferences"], FromColumnsT>|void)
            )
    );
    test<
        FromColumnsT extends FromColumnsCallback<T["columnReferences"], Tuple<AnyColumn>>
    > (f : FromColumnsT) : (
        FromColumnsInCallback<FromColumnsT>
    );
    rightJoin<
        ToTableT extends AliasedTable<any, any, {}>,
        FromColumnsT extends FromColumnsCallback<T["columnReferences"], Tuple<AnyColumn>>,// ColumnReferenceTuple<T["columnReferences"]>,
        ToColumnsT extends ToColumnTuple<ToTableT, Tuple<AnyColumn>>
    > (
        this : FromBuilder<{
            columnReferences : any,
            joinReferences : any,
            hasWhereClause : false,
            typeNarrowedColumns : any,
        }>,
        toTable : ToTableT,
        from : FromColumnsT,
        to : ToColumnsT
    ) : (
        TableAlias<ToTableT> extends keyof T["columnReferences"] ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                FromColumnsInCallback<FromColumnsT> extends IsFromColumnTuple<T["columnReferences"], FromColumnsInCallback<FromColumnsT>> ?
                    (
                        FromBuilder<{
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
                            hasWhereClause : T["hasWhereClause"],
                            typeNarrowedColumns : T["typeNarrowedColumns"]
                        }>
                    ) :
                    (IsFromColumnTuple<T["columnReferences"], FromColumnsInCallback<FromColumnsT>>|void|never)
            )
    );
    leftJoin<
        ToTableT extends AliasedTable<any, any, {}>,
        FromColumnsT extends ColumnReferenceTuple<T["columnReferences"]>,
        ToColumnsT extends ToColumnTuple<ToTableT, FromColumnsT>
    > (
        this : FromBuilder<{
            columnReferences : any,
            joinReferences : any,
            hasWhereClause : false,
            typeNarrowedColumns : any,
        }>,
        toTable : ToTableT,
        from : FromColumnsT,
        to : ToColumnsT
    ) : (
        TableAlias<ToTableT> extends keyof T["columnReferences"] ?
            ("Duplicate alias" | TableAlias<ToTableT> | void) :
            (
                FromColumnsT extends IsFromColumnTuple<T["columnReferences"], FromColumnsT> ?
                    (
                        FromBuilder<{
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
                            hasWhereClause : T["hasWhereClause"],
                            typeNarrowedColumns : T["typeNarrowedColumns"]
                        }>
                    ) :
                    (IsFromColumnTuple<T["columnReferences"], FromColumnsT>|void)
            )
    );
    whereIsNotNull<
        TypeNarrowCallbackT extends TypeNarrowCallback<FromBuilder<T>>
    > (
        typeNarrowCallback : TypeNarrowCallbackT
    ) : (
        ReturnType<TypeNarrowCallbackT> extends Column<infer TableNameT, infer NameT, infer TypeT> ?
            (
                T["columnReferences"] extends ColumnToReference<ReturnType<TypeNarrowCallbackT>> ?
                    (
                        FromBuilder<{
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
                            hasWhereClause : true,
                            typeNarrowedColumns : (
                                T["typeNarrowedColumns"] &
                                {
                                    [table in TableNameT] : {
                                        columns : {
                                            [column in NameT] : Column<TableNameT, NameT, Exclude<TypeT, null|undefined>>
                                        }
                                    }
                                }
                            )
                        }>
                    ) :
                    ("ColumnT is not in ColumnReferences"|void|never)
            ) :
            ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
    whereIsNull<
        TypeNarrowCallbackT extends TypeNarrowCallback<FromBuilder<T>>
    > (
        typeNarrowCallback : TypeNarrowCallbackT
    ) : (
        ReturnType<TypeNarrowCallbackT> extends Column<infer TableNameT, infer NameT, infer TypeT> ?
            (
                T["columnReferences"] extends ColumnToReference<ReturnType<TypeNarrowCallbackT>> ?
                    (
                        FromBuilder<{
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
                            hasWhereClause : true,
                            typeNarrowedColumns : (
                                T["typeNarrowedColumns"] &
                                {
                                    [table in TableNameT] : {
                                        columns : {
                                            [column in NameT] : Column<TableNameT, NameT, null>
                                        }
                                    }
                                }
                            )
                        }>
                    ) :
                    ("ColumnT is not in ColumnReferences"|void|never)
            ) :
            ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
    whereIsEqual<
        TypeNarrowCallbackT extends TypeNarrowCallback<FromBuilder<T>>,
        ConstT extends number|string|null
    > (
        value : ConstT,
        typeNarrowCallback : TypeNarrowCallbackT
    ) : (
        ReturnType<TypeNarrowCallbackT> extends Column<infer TableNameT, infer NameT, infer TypeT> ?
            (
                T["columnReferences"] extends ColumnToReference<ReturnType<TypeNarrowCallbackT>> ?
                    (
                        FromBuilder<{
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
                            hasWhereClause : true,
                            typeNarrowedColumns : (
                                T["typeNarrowedColumns"] &
                                {
                                    [table in TableNameT] : {
                                        columns : {
                                            [column in NameT] : Column<TableNameT, NameT, ConstT>
                                        }
                                    }
                                }
                            )
                        }>
                    ) :
                    ("ColumnT is not in ColumnReferences"|void|never)
            ) :
            ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
    );
    where<
        WhereCallbackT extends WhereCallback<FromBuilder<T>>
    > (
        whereCallback : WhereCallbackT
    ):(
        WhereCallbackT extends WhereCallback<FromBuilder<T>> ?
            (
                ReturnType<WhereCallbackT> extends Expr<infer UsedReferencesT, boolean> ?
                    (
                        T["columnReferences"] extends UsedReferencesT ?
                            (
                                FromBuilder<T>
                            ) :
                            ("UsedReferencesT has some columns not in FromBuilder's columnReferences"|void|never)
                    ) :
                    ("Invalid ExprT or could not infer UsedReferencesT"|void|never)
            ) :
            ("Invalid WhereCallbackT"|void|never)
    );
}

declare function from<
    TableT extends AnyAliasedTable
> (
    table : TableT
) : (
    FromBuilder<{
        columnReferences : TableReference<TableT>,
        joinReferences : [JoinReference<TableReference<TableT>, false>],
        hasWhereClause : false,
        typeNarrowedColumns : {},
    }>
);

let preF = from(app)
    .join(appKey, [app.columns.appId, app.columns.appId, app.columns.appId, app.columns.appId, app.columns.appId], [appKey.columns.appId, appKey.columns.appId, appKey.columns.appId, appKey.columns.appId, appKey.columns.appId])
    .leftJoin(ssoClient, [app.columns.ssoClientId], [ssoClient.columns.ssoClientId])

const tr = preF.test(c => [c.app.columns.ssoApiKey, c.app.columns.appId])
const tr2 = preF.test([app.columns.ssoApiKey, app.columns.appId])

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
    Column<any, any, TypeT>
);
type ExprUsedColumns<RawExprT extends RawExpr<any>> = (
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
    ("Invalid RawExprT or could not infer used columns"|void|never)
);
type ExprType<RawExprT extends RawExpr<any>> = (
    RawExprT extends AllowedExprConstants ?
    RawExprT :
    RawExprT extends Column<any, any, infer TypeT> ?
    TypeT :
    RawExprT extends Expr<any, infer TypeT> ?
    TypeT :
    ("Invalid RawExprT or could not infer TypeT"|void|never)
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
}
declare const e : Expressions;

const w = f
    .whereIsNotNull(c => c.app.columns.appId)
    .whereIsEqual(3, c => c.app.columns.appId)
    //.whereIsNull(c => c.app.columns.appId)
    .where((c) => {
        enum E {
            A,
            B
        }
        c.ssoClient.columns.ssoClientId
        const test = e.eq(app.columns.appId, E.A);
        const test2 = e.eq(1, app.columns.appId);
        const test3 = e.eq(1, app.columns.appId);
        test.usedReferences
        return e.eq(1,c.app.columns.appId);
        //return e.eq(1, c.app.columns.appId);
        //const x : typeof test2;
        //return test2;
        //return e.true();
    })

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
