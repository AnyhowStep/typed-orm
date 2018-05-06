import * as sd from "schema-decorator";
import {Table, Column, ColumnCollection, AnyColumn, AliasedTable, AnyAliasedTable, TypeOf} from "./Table";
import {AnyTable} from "./AnyTable";



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
type TableFields<TableT extends AnyAliasedTable> = (
    TableT extends Table<any, infer Fields, any, any> ?
    Fields :
    TableT extends AliasedTable<any, any, infer Fields> ?
    Fields :
    never
);
declare function alias<TableT extends AnyTable, AliasT extends string> (
    table : TableT,
    alias : AliasT
) : AliasedTable<AliasT, TableName<TableT>, TableFields<TableT>>;

type Select = {

}
type AnySelect = {
    [alias : string] : AliasedTable<any, any, any>
};

declare function selectFrom<TableT extends AliasedTable<any, any, {}>> (
    table : TableT
) : {
    [alias in TableAlias<TableT>] : AliasedTable<alias, TableName<TableT>, TableFields<TableT>>
};

type FromColumn<SelectT extends AnySelect, ColumnT extends Column<keyof SelectT, any, any>> = (
    ColumnT extends Column<infer AliasT, any, any> ?
        ColumnT extends Column<any, infer NameT, any> ?
            ColumnT extends Column<any, any, infer TypeT> ?
                AliasT extends keyof SelectT ?
                    NameT extends keyof SelectT[AliasT]["columns"] ?
                        TypeT extends sd.TypeOf<SelectT[AliasT]["columns"][NameT]["assertDelegate"]> ?
                            sd.TypeOf<SelectT[AliasT]["columns"][NameT]["assertDelegate"]> extends TypeT ?
                                ColumnT
                            : "assertDelegate TypeT mismatch"|TypeT|void
                        : "column TypeT mismatch"|TypeT|void
                    : "NameT mismatch"|NameT|void
                : "AliasT mismatch"|AliasT|void
            : "Missing TypeT"|void
        : "Missing NameT"|void
    : "Missing AliasT"|void
);

type FromColumns<SelectT extends AnySelect, ColumnsT extends AnyColumn[] & { "0" : AnyColumn }> = (
    ColumnsT extends { "1" : AnyColumn } ?
        (ColumnsT extends [FromColumn<SelectT, ColumnsT[0]>, FromColumn<SelectT, ColumnsT[1]>] ?
            ColumnsT :
            FromColumn<SelectT, ColumnsT[0]>|FromColumn<SelectT, ColumnsT[1]>)
    : ColumnsT extends { "0" : AnyColumn } ?
        (ColumnsT extends [FromColumn<SelectT, ColumnsT[0]>] ?
            ColumnsT :
            FromColumn<SelectT, ColumnsT[0]>)
    : "Invalid ColumnsT"|void
);

type ColumnType<ColumnT extends AnyColumn> = (
    ColumnT extends Column<any, any, infer T> ?
    T :
    never
);

type ColumnWithType <TableT extends AnyTable|AnyAliasedTable, T> = (
    Column<TableAlias<TableT>, keyof TableFields<TableT>, T>
);

type ToColumns<TableT extends AnyTable|AnyAliasedTable, FromColumnsT extends AnyColumn[] & { "0" : AnyColumn }> = (
    FromColumnsT extends { "1" : AnyColumn } ?
    [ColumnWithType<TableT, ColumnType<FromColumnsT[0]>>, ColumnWithType<TableT, ColumnType<FromColumnsT[1]>>] :
    FromColumnsT extends { "0" : AnyColumn } ?
    [ColumnWithType<TableT, ColumnType<FromColumnsT[0]>>] :
    never
);

declare function join<
    SelectT extends {
        [alias : string] : AliasedTable<any, any, {}>
    },
    TableT extends AnyTable|AnyAliasedTable,
    ColumnsT extends AnyColumn[] & { "0" : AnyColumn },
    ToColumnsT extends ToColumns<TableT, ColumnsT>
> (
    select : SelectT,
    table  : TableT,
    fromColumns : ColumnsT,
    toColumns : ToColumnsT
) : (
    TableAlias<TableT> extends keyof SelectT ?
        ("Duplicate alias" & TableAlias<TableT>) :
        ColumnsT extends FromColumns<SelectT, ColumnsT> ?
            SelectT & {
                [alias in TableAlias<TableT>] : AliasedTable<alias, TableName<TableT>, TableFields<TableT>>
            } :
            FromColumns<SelectT, ColumnsT>
);

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


const app3 = alias(app, "app3");
declare const errer : TableAlias<typeof app3>;
declare const errer2 : TableAlias<typeof app>;
let s = selectFrom(app);
const ssoClientAlias = alias(ssoClient, "ssoClient");

let s1 = join(s, ssoClientAlias, [
    s.app.columns.ssoClientId
], [
    ssoClientAlias.columns.ssoClientId
]);

let s2 = join(s1, appKey, [
    app.columns.appId
], [
    appKey.columns.appId
]);

type Expr<RequiredSelectT, T> = {req : RequiredSelectT, t : T, query : string,}

declare function where<ExprT extends Expr<any, boolean>, SelectT extends {}> (
    select : SelectT,
    expr : ExprT,

) :
ExprT extends Expr<infer Required, boolean> ?
    SelectT extends Required ?
        {
            select : SelectT,
            expr : ExprT
        }
        : "Some columns in expression are not in FROM or JOIN clause"|void
    : "Invalid expression"|void;

declare function gt<ColumnT extends Column<any, any, any>> (
    a : ColumnT,
    b : number
) : Expr<{
    [table in (ColumnT extends Column<infer Table, any, any> ? Table : never)] : {
        columns : {
            [column in (ColumnT extends Column<any, infer Column, any> ? Column : never)] : ColumnT
        }

    }
}, boolean>;
const expr = gt(s2.appKey.columns.appId, 3);
const w = where(s2, expr);

type FetchColumn<ColumnT extends Column<any, any, any>|AliasedTable<any, any, {}>> = (
    ColumnT extends Column<infer TableName, infer Name, infer T> ?
    { [table in TableName] : { [name in Name] : T } } :
    ColumnT extends AliasedTable<infer AliasT, any, infer Columns> ?
    {
        [table in AliasT] : {
            [name in keyof Columns] : TypeOf<Columns[name]>
        }
    }:
    never
);
type FetchResult<ColumnsT extends (Column<any, any, any>|AliasedTable<any, any, {}>)[] & { "0": (Column<any, any, any>|AliasedTable<any, any, {}>) }> = (
    ColumnsT extends { "1": (Column<any, any, any>|AliasedTable<any, any, {}>) } ?
    FetchColumn<ColumnsT[0]> & FetchColumn<ColumnsT[1]> :
    ColumnsT extends { "0": (Column<any, any, any>|AliasedTable<any, any, {}>) } ?
    FetchColumn<ColumnsT[0]> :
    never
);
type MaxFetchResult<SelectT extends {
    [alias : string] : AliasedTable<any, any, any>
}> = (
    {
        [alias in keyof SelectT] : {
            [name in keyof SelectT[alias]["columns"]] : TypeOf<SelectT[alias]["columns"][name]>
        }
    }
);

declare function columns<
    SelectT extends {},
    ColumnsT extends (Column<any, any, any>|AliasedTable<any, any, {}>)[] & { "0": (Column<any, any, any>|AliasedTable<any, any, {}>) }
> (
    columns : ColumnsT,
    w : {
        select : SelectT,
        expr : Expr<any, boolean>
    }
) :
MaxFetchResult<SelectT> extends FetchResult<ColumnsT> ?
{
    result : FetchResult<ColumnsT>
} :
never;
const c = columns(
    [
        appKeyType.columns.internalName,//w.select.app,
        w.select.appKey
    ],
    w
)
declare function get<
    SelectT extends {},
    ColumnT extends Column<any, any, any>
> (
    column : ColumnT,
    w : {
        select : SelectT,
        expr : Expr<any, boolean>
    }
) :
MaxFetchResult<SelectT> extends FetchResult<[ColumnT]> ?
{
    result : TypeOf<ColumnT>
} :
never;
const g = get(w.select.app.columns.appId, w);
c.result.app
g.result
