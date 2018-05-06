/*import * as sd from "schema-decorator";
import {Table} from "./Table";
import {AnyTable, AnyTableArray} from "./AnyTable";
import {TableCollection} from "./TableCollection";
import {Fk} from "./Fk";*/
/*
    Desired usage,

    const tableA = new Table(
        "tableA",
        {
            field0 : assertion0,
            field1 : assertion1,
            field2 : assertion2,
            field3 : assertion3,
        },
        [
            "field0"
        ],
        {
            autoIncrement : "field0"
        }
    );
    const tableB = new Table(
        "tableB",
        {
            field0 : assertion0,
            field1 : assertion1,
            field2 : assertion2,
            field3 : assertion3,
        }
    );
    const tableC = new Table(
        "tableC",
        {
            field0 : assertion0,
            field1 : assertion1,
            field2 : assertion2,
            field3 : assertion3,
        }
    );
    const database = new DatabaseBuilder()
        .table(tableA)
        .table(tableB)
        .table(tableC)
        .fk(
            "aFkb",
            [
                tableA.field0,
                tableA.field1
            ],
            [
                tableB.field0,
                tableB.field1
            ]
        )
        .fk(
            "aFka",
            [
                tableA.field2
            ],
            [
                tableA.field3 //FK to same table is valid
            ]
        )
        .build();

    const s = database.select()
        .from(tableA);

    const result = s
        .where(
            [
                s.field0, db.gt, 4
            ]
        )
        .columns(
            s.field0,
            s.field1,
            s.field2,
        )
        .execute();

    const s = database.select()
        .from(tableA)
        .join(
            tableB,
            s.aFkb
        );

    const result = s
        .columns(

        )
        .execute();
*/
/*
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
        ssoClientId : ssoClient.fields.ssoClientId,
        ssoApiKey : sd.nullable(sd.string()),
        webhookKey : sd.nullable(sd.string())
    },
    ["appId"],
    "appId"
);


const appToSsoClient = new Fk(
    "app_SsoClient",
    app,
    ssoClient,
    ["ssoClientId"],
    ["ssoClientId"]
);



export function toTableCollection<TablesT extends AnyTableArray> (
    table : TablesT
) : TableCollection<TablesT> {
    return null as any;
}
const x0 = toTableCollection([app]);
x0.app
const x1 = toTableCollection([ssoClient]);
x1.ssoClient.name
const x2 = toTableCollection([app, ssoClient]);
x2.app.name
*/
/*
SELECT
    *
FROM
    planInformation
WHERE
    planId = :planId
ORDER BY
    logId DESC
LIMIT 1

f = db.from(plan, "a")
    .join(
        planInformation,
        db.fks.
    )

w = f.where(

)


s = w.select(
        ["a", "pl"]
    )

g = s.groupBy()

h = g.having()

    .orderBy(
        "a", "planId", false
    )
    .limit(1)
*/
/*
export interface QualifiedField<AliasT extends string, NameT extends string, TypeT> {

}
export declare type QualifiedFieldCollection<RawFieldCollectionT extends sd.RawFieldCollection> = {
    [name in keyof RawFieldCollectionT]: QualifiedField<string, name, sd.TypeOf<RawFieldCollectionT[name]>>;
};
declare function toQualifiedFields<RawFieldCollectionT extends sd.RawFieldCollection> (f : RawFieldCollectionT) : QualifiedFieldCollection<RawFieldCollectionT>;
export type S<AliasT extends string, RawColumnsT extends sd.RawFieldCollection> = {
    name : AliasT,
    fields : QualifiedFieldCollection<RawColumnsT>,
};

export type Joined = (
    [S<any, any>]|
    [S<any, any>, S<any, any>]|
    [S<any, any>, S<any, any>, S<any, any>]
);
export type JoinFromT<JoinedT extends Joined> = (
    JoinedT extends [S<infer A0, any>] ?
    A0 :
    JoinedT extends [S<infer A0, any>, S<infer A1, any>] ?
    A0|A1 :
    JoinedT extends [S<infer A0, any>, S<infer A1, any>, S<infer A2, any>] ?
    A0|A1|A2 :
    never
);
export type NewJoinT<JoinedT extends Joined, NewS extends S<any, any>> = (
    JoinedT extends [S<any, any>] ?
    [JoinedT[0], NewS] :
    JoinedT extends [S<any, any>, S<any, any>] ?
    [JoinedT[0], JoinedT[1], NewS] :
    JoinedT extends [S<any, any>, S<any, any>, S<any, any>] ?
    [JoinedT[0], JoinedT[1], JoinedT[2], NewS] :
    never
);
export type SInJoined<JoinedT extends Joined, AliasT extends string> = (
    AliasT extends JoinedT[0]["name"] ?
    JoinedT[0] :
    AliasT extends JoinedT[1]["name"] ?
    JoinedT[1] :
    never
);
export type JoinFromColumns<ST extends S<any, any>> = (
    [keyof ST["fields"]]|
    [keyof ST["fields"], keyof ST["fields"]]|
    [keyof ST["fields"], keyof ST["fields"], keyof ST["fields"]]
);
export type JoinToColumns<ToT extends S<any, any>, JoinFromColumnsT extends JoinFromColumns<any>> = (
    JoinFromColumnsT extends [string] ?
    [keyof ToT["fields"]] :
    JoinFromColumnsT extends [string, string] ?
    [keyof ToT["fields"], keyof ToT["fields"]] :
    JoinFromColumnsT extends [string, string, string] ?
    [keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
    never
);
export type ValidNewSName<JoinedT extends Joined, NewNameT extends string> = (
    JoinFromT<JoinedT> extends NewNameT ?
        never :
        NewNameT
);
export function join<JoinedT extends Joined, FromT extends JoinFromT<JoinedT>, NewS extends S<any, any>, JoinFromColumnsT extends JoinFromColumns<SInJoined<JoinedT, FromT>>> (
    joined : JoinedT,
    from : FromT,
    to : NewS,
    fromColumns : JoinFromColumnsT,
    toColumns : JoinToColumns<NewS, JoinFromColumnsT>
) : NewJoinT<JoinedT, NewS> {

}
const x : [S<
    "app",
    {
        ssoClientId : () => number,
        name : () => string,
    }
>] = [
    {
        name : "app",
        fields : toQualifiedFields(sd.fields({
            ssoClientId : sd.naturalNumber(),
            name : sd.string()
        })),
    }
];
const k : ValidNewSName<typeof x, "app"> = "app";
const y = join(
    x,
    "app",
    {
        name : "ssoClient",
        fields : sd.fields({
            ssoClientId : sd.naturalNumber(),
            name : sd.string()
        })
    },
    ["ssoClientId"],
    ["ssoClientId"]
);
const z = join(
    y,
    "ssoClient",
    {
        name : "ssoClient2",
        fields : sd.fields({
            ssoClientId : sd.naturalNumber(),
            name : sd.string()
        })
    },
    ["name"],
    ["name"]
)

type W<T> = (
    {
        assertResult : () => T
    }|
    T|
    QualifiedField<any, any, number>
);

declare function lessThan (a : W<number>, b : W<number>) : W<boolean>;
const w0 = lessThan(z[0].fields.ssoClientId, 3);
export class Select<JoinFromT extends AnyTable> {
    public constructor (from : JoinFromT) {

    }
    public joinTable<JoinToT extends AnyTable> (
        to : JoinToT,
        fk : Fk<any, JoinFromT, JoinToT, any, any>|Fk<any, JoinToT, JoinFromT, any, any>
    ) : Select<JoinFromT | JoinToT> {
        return null as any;
    }
    public where () {

    }
}



export class Database<TablesT extends AnyTableArray, FksT extends { [name : string] : Fk<any, any, any, any, any> }> {
    public readonly tables : TableCollection<TablesT>;
    public constructor (tables : TablesT) {

    }
    public select () {

    }
}

const s = new Select(ssoClient)
    .joinTable(
        app,
        appToSsoClient
    )
*/
