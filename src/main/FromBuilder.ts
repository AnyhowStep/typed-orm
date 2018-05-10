import * as sd from "schema-decorator";

export type Tuple<T> = T[] & { "0" : T };
export type TupleKeys<TupleT extends Tuple<any>> = Exclude<keyof TupleT, keyof any[]>;
export type TupleLength<TupleT extends Tuple<any>> = (
    TupleT extends {"6":any} ? 7 :
    TupleT extends {"5":any} ? 6 :
    TupleT extends {"4":any} ? 5 :
    TupleT extends {"3":any} ? 4 :
    TupleT extends {"2":any} ? 3 :
    TupleT extends {"1":any} ? 2 :
    TupleT extends {"0":any} ? 1 :
    never
);
export type TupleNextKey<TupleT extends Tuple<any>> = (
    TupleT extends {"6":any} ? "7" :
    TupleT extends {"5":any} ? "6" :
    TupleT extends {"4":any} ? "5" :
    TupleT extends {"3":any} ? "4" :
    TupleT extends {"2":any} ? "3" :
    TupleT extends {"1":any} ? "2" :
    TupleT extends {"0":any} ? "1" :
    never
);
export type TupleNextLength<TupleT extends Tuple<any>> = (
    TupleT extends {"6":any} ? 8 :
    TupleT extends {"5":any} ? 7 :
    TupleT extends {"4":any} ? 6 :
    TupleT extends {"3":any} ? 5 :
    TupleT extends {"2":any} ? 4 :
    TupleT extends {"1":any} ? 3 :
    TupleT extends {"0":any} ? 2 :
    never
);
export type TuplePush<TupleT extends Tuple<any>, NextT> = (
    TupleT extends Tuple<infer TypeT> ?
        (
            {
                [index in TupleKeys<TupleT>] : TupleT[index]
            } &
            {
                [index in TupleNextKey<TupleT>] : NextT
            } &
            { length : TupleNextLength<TupleT> } &
            (TypeT|NextT)[] &
            {
                "0" : TupleT["0"]
            }
        ) :
        ("Invalid TupleT or could not infer TypeT"|void|never)
);

declare const a : [1,2];
declare const k : TupleKeys<typeof a>;
declare const m : {
    [key in TupleKeys<typeof a>] : "hi"
} & { length : TupleLength<typeof a> } & any[];

const b = m[0];
const c : ["hi", "hi"] = m;
/////////////////////////////

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

type ColumnType<ColumnT extends AnyColumn> = (
    ColumnT extends Column<any, any, infer T> ?
    T :
    never
);

type TableAlias<TableT extends AnyAliasedTable> = (
    TableT extends Table<infer Name, any> ?
    Name :
    TableT extends AliasedTable<infer Alias, any, {}> ?
    Alias :
    never
);
type TableName<TableT extends AnyAliasedTable> = (
    TableT extends Table<infer Name, any> ?
    Name :
    TableT extends AliasedTable<any, infer Name, any> ?
    Name :
    never
);
type TableColumns<TableT extends AnyAliasedTable> = (
    TableT extends Table<any, infer Columns> ?
    Columns :
    TableT extends AliasedTable<any, any, infer Columns> ?
    Columns :
    never
);

///////////////////////////////////

type ColumnReferences = {
    [table : string] : {
        columns : {
            [column : string] : AnyColumn
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

type JoinReferences = Tuple<ColumnReferences>;

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
                            TypeT extends sd.TypeOf<TableReferencesT[AliasT]["columns"][NameT]["assertDelegate"]>|null ?
                                (
                                    sd.TypeOf<TableReferencesT[AliasT]["columns"][NameT]["assertDelegate"]> extends TypeT|null ?
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
    TableReferencesT extends ColumnReferences,
    FromColumnsT extends Tuple<AnyColumn>
> = (
    FromColumnsT extends {"1":AnyColumn} ?
    [IsFromColumn<TableReferencesT, FromColumnsT[0]>, IsFromColumn<TableReferencesT, FromColumnsT[1]>] :
    FromColumnsT extends {"0":AnyColumn} ?
    [IsFromColumn<TableReferencesT, FromColumnsT[0]>] :
    never
);

type NullableJoinReferences<JoinReferencesT extends JoinReferences> = (
    {
        [index in TupleKeys<JoinReferencesT>] : (
            JoinReferencesT[index] extends ColumnReferences ?
                NullableColumnReference<JoinReferencesT[index]> :
                never
        )
    } &
    { length : TupleLength<JoinReferencesT> } &
    (NullableColumnReference<JoinReferencesT["0"]>)[] &
    {
        "0" : NullableColumnReference<JoinReferencesT["0"]>
    }
);

declare class FromBuilder<T extends {
    columnReferences : ColumnReferences,
    joinReferences : JoinReferences
}> {
    data : T;
    join<
        ToTableT extends AliasedTable<any, any, {}>,
        FromColumnsT extends Tuple<AnyColumn>,
        ToColumnsT extends ToColumnTuple<ToTableT, FromColumnsT>
    > (
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
                            columnReferences : T["columnReferences"] & TableReference<ToTableT>,
                            joinReferences : TuplePush<T["joinReferences"], TableReference<ToTableT>>
                        }>
                    ) :
                    (IsFromColumnTuple<T["columnReferences"], FromColumnsT>|void)
            )
    );
    rightJoin<
        ToTableT extends AliasedTable<any, any, {}>,
        FromColumnsT extends Tuple<AnyColumn>,
        ToColumnsT extends ToColumnTuple<ToTableT, FromColumnsT>
    > (
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
                                NullableColumnReference<T["columnReferences"]> &
                                TableReference<ToTableT>
                            ),
                            joinReferences : (
                                TuplePush<
                                    /*{
                                        [index in TupleKeys<T["joinReferences"]>] : (
                                            T["joinReferences"][index] extends ColumnReferences ?
                                                NullableColumnReference<T["joinReferences"][index]> :
                                                never
                                        )
                                    } &
                                    { length : TupleLength<T["joinReferences"]> } &
                                    (TableReference<ToTableT>)[] &
                                    {
                                        "0" : NullableColumnReference<T["joinReferences"]["0"]>
                                    }*/
                                    NullableJoinReferences<T["joinReferences"]>,
                                    TableReference<ToTableT>
                                >
                            )
                        }>
                    ) :
                    (IsFromColumnTuple<T["columnReferences"], FromColumnsT>|void|never)
            )
    );
    leftJoin<
        ToTableT extends AliasedTable<any, any, {}>,
        FromColumnsT extends Tuple<AnyColumn>,
        ToColumnsT extends ToColumnTuple<ToTableT, FromColumnsT>
    > (
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
                            columnReferences : T["columnReferences"] & NullableColumnReference<TableReference<ToTableT>>,
                            joinReferences : TuplePush<T["joinReferences"], NullableColumnReference<TableReference<ToTableT>>>
                        }>
                    ) :
                    (IsFromColumnTuple<T["columnReferences"], FromColumnsT>|void)
            )
    );
}
declare function from<
    TableT extends AnyAliasedTable
> (
    table : TableT
) : (
    FromBuilder<{
        columnReferences : TableReference<TableT>,
        joinReferences : [TableReference<TableT>]
    }>
);

const f = from(app)
    .rightJoin(appKey, [app.columns.appId], [appKey.columns.appId])
    //.rightJoin(ssoClient, [app.columns.ssoClientId], [ssoClient.columns.ssoClientId])
    //.leftJoin(user, [app.columns.appId], [user.columns.appId]);

f.data.joinReferences[0].app.columns.appId
f.data.joinReferences[1].appKey.columns.appKeyId
f.data.joinReferences[2].ssoClient.columns.name
f.data.joinReferences[3].user.columns.externalUserId
