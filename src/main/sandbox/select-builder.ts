import * as d from "../definition";
import * as sd from "schema-decorator";
import * as mysql from "typed-mysql";

const ssoClient = d.table(
    "ssoClient",
    {
        ssoClientId : sd.stringToNumber(),
        name : sd.string(),
        authenticationEndpoint : sd.string(),
        initializeAfterAuthenticationEndpoint : sd.nullable(sd.string()),
    }
).autoIncrement(c => c.ssoClientId);
const app = d.table(
    "app",
    {
        appId : sd.stringToNumber(),
        name : sd.string(),
        ssoClientId : ssoClient.columns.ssoClientId,
        ssoApiKey : sd.nullable(sd.string()),
        webhookKey : sd.nullable(sd.string())
    }
).autoIncrement(c => c.appId);

const appKey = d.table(
    "appKey",
    {
        appId : sd.stringToNumber(),
        appKeyId : sd.string(),
        appKeyTypeId : sd.number(),
        key : sd.string(),
    },
).autoIncrement(c => c.appKeyId);
/*
const appKeyType = d.table(
    "appKeyType",
    {
        appKeyTypeId : sd.string(),
        internalName : sd.string(),
    }
).autoIncrement(c => c.appKeyTypeId);

const user = d.table(
    "user",
    {
        appId : sd.naturalNumber(),
        externalUserId : sd.string(),
        createdAt : sd.date(),
    }
);

console.log(appKeyType.querify())
console.log(user.querify())

const b = d.from(app)
    .join(appKey, c => [c.app.appId], t => [t.appId])
    .whereIsEqual(3, c => c.app.ssoApiKey)
    .select(c => [c.app.appId])
    .select(c => [c.app.appId.as("e")]);
console.log(b.querify());
*/
async function foo () {
    /*const test = d.from(app)
        .select((s) => {
            return [
                s.app,
                s.app.appId.as("w"),
                d.TRUE.as("test")
            ]
        });
    console.log(test.querify());*/

    const mysqlUsername = "payment-admin";
    const mysqlPassword = "Y9dIMNcoXwaMRyxk";

    const db = new mysql.Database({
        host     : "localhost",
        database : "payment-prototype-00",
        user     : mysqlUsername,
        password : mysqlPassword,
    });
    await db.connect();
    await db.utcOnly();


    const f = d.from(app)
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
            d.from(app)
                .select(c => [
                    c.app.appId,
                    c.app.webhookKey,
                    d.toExpr("Hello, world, SELECT * FROM app; TEST 'new string' \\\'").as("hello"),
                    d.TRUE.as("something")
                ])
                .as("subqueryTable"),
            c => [c.app.webhookKey],
            t => [t.webhookKey]
        )
        .whereIsNotNull(c => c.app.ssoApiKey)
        .where(c => {

            return d.and(
                d.eq(c.app.appId, 5),
                c.subqueryTable.something
            );
        })
        .select((c) => {
            return [
                //c.app.columns.ssoApiKey.as("aliased"),
                c.app,
                c.ssoClient.name,
                d.TRUE.as("appId"),
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
            return d.eq(s.__expr.appId, true);
        })
        .orderBy((s) => {
            return [
                //s.__expr.columns.aliased,
                [s.app.name, true],
                [s.ssoClient.authenticationEndpoint, false],
                d.eq(s.app.appId, 1),
                [d.eq(s.app.appId, 1), true]
            ]
        })
        .limit(5)
        .offset(4)
        .widen(s => s.app.ssoApiKey, sd.nil())
        .widen(s => s.ssoClient.name, sd.number())
        .union(
            d.from(app)
                .select((s) => {
                    return [
                        s.app,
                        s.app.appId.as("w"),
                        d.TRUE.as("appId")
                    ]
                })
        )
        .union(
            d.from(app)
                .select((s) => {
                    return [
                        s.app,
                        s.app.appId.as("b"),
                        d.TRUE.as("appId")
                    ]
                })
        )
        .orderBy(() => {
            return [d.TRUE]
        })
        .limit(30)
        .offset(56);//*/
        //.execute() : Promise<SelectReferences>
    /*f.paginate()
        .then((result) => {
            result
        });*/
    /*from(app)
        .select(c => [c.app.name])
        .paginate()
        .then((result) => {
            result
        })
    f.data*/
    d.from(app)
        .join(
            d.from(appKey)
                .select(c => [c.appKey.key, c.appKey.appId, d.TRUE.as("a")])
                .as("other"),
            c => [c.app.appId],
            t => [t.appId]
        )
        .having((_s) => {
            return d.lt(1, 100);
        })
    console.log("---");
    console.log(f.querify())

    /*db.selectAny(f.querify()).then((result) => {
        console.log(result)
    })*/

    /*db.getRawConnection().query(
        {
            sql : f.querify(),
            nestTables : "---",
        },
        (error, results, fields) => {
            console.log(error, results, fields);
        }
    );*/
}
foo().catch((err) => {
    console.error(err);
    process.exit(1);
});
